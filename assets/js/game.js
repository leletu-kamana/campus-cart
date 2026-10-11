// ==========================================================
// CAMPUS-CART
// 404 page game: "Campus Runner"
// A small endless runner. Jump over the crates for as long as you can.
// Plain JavaScript and the canvas element, no libraries.
// ==========================================================

(function () { // Wraps the whole game in a function so its variables stay private.
    "use strict"; // Turns on stricter error checking.

    // ---------- Setup ----------
    var canvas = document.getElementById("game-canvas"); // Finds the game canvas on the page.
    var startBtn = document.getElementById("game-start"); // Finds the start and restart button.
    var statusEl = document.getElementById("game-status"); // Finds the text that announces the game state.
    if (!canvas || !canvas.getContext || !startBtn || !statusEl) { return; } // Stops quietly if something is missing.
    var ctx = canvas.getContext("2d"); // Gets the tool used to draw on the canvas.
    var W = 640; // Width of the game world in pixels.
    var H = 220; // Height of the game world in pixels.
    var GROUND = 180; // Y position of the ground line.
    var NAVY = "#0d1b3e"; // Main brand colour.
    var YELLOW = "#ffd23f"; // Accent brand colour.
    var GREY = "#f2f3f5"; // Light background colour.
    var GRAVITY = 0.65; // How fast the runner is pulled down each frame.
    var JUMP = -12; // Upward speed given to the runner when it jumps.
    var dpr = Math.min(window.devicePixelRatio || 1, 2); // Uses a sharper canvas on high resolution screens.
    canvas.width = W * dpr; // Sets the real canvas width.
    canvas.height = H * dpr; // Sets the real canvas height.
    ctx.scale(dpr, dpr); // Lets the code below keep using the 640 by 220 world size.

    // ---------- Game state ----------
    var state = "idle"; // Current state: idle, running or over.
    var runner; // The player object, created in reset().
    var crates; // List of crates on the screen.
    var clouds; // List of background clouds.
    var speed; // Current game speed in pixels per frame.
    var distance; // Distance travelled so far.
    var score; // Score shown to the player.
    var best = 0; // Best score on this device.
    var gapLeft; // Distance left before the next crate appears.
    var steps; // Frame counter used for the leg animation.
    var lastTime; // Time of the previous frame.
    var overAt = 0; // Time the last game ended, used to stop accidental restarts.
    var rafId = 0; // ID of the running animation loop.
    var crateTypes = [ // The crate sizes the game picks from.
        { w: 26, h: 34 }, // Small single crate.
        { w: 34, h: 44 }, // Medium crate.
        { w: 26, h: 54 }, // Tall crate.
        { w: 52, h: 34 } // Wide pair of crates.
    ];

    try { // Starts error handling in case storage is blocked.
        best = Number(window.localStorage.getItem("cc_game_best")) || 0; // Loads the saved best score.
    } catch (e) { best = 0; } // Uses zero if storage is unavailable.

    // ---------- Helpers ----------
    function pad(n) { // Turns a number into five digits, like 00042.
        var s = String(n); // Converts the number to text.
        while (s.length < 5) { s = "0" + s; } // Adds zeros at the front until it has five digits.
        return s; // Returns the padded text.
    }

    function reset() { // Puts the game back to its starting values.
        runner = { x: 60, y: GROUND - 44, w: 30, h: 44, vy: 0, onGround: true }; // Creates the runner standing on the ground.
        crates = []; // Removes all crates.
        clouds = [{ x: 120, y: 40 }, { x: 380, y: 28 }, { x: 560, y: 56 }]; // Places three clouds.
        speed = 6; // Starts at a gentle speed.
        distance = 0; // Resets the distance.
        score = 0; // Resets the score.
        gapLeft = 380; // Waits a little before the first crate.
        steps = 0; // Resets the animation counter.
    }

    // ---------- Drawing ----------
    function drawCrate(c) { // Draws one crate as a navy box with a yellow frame and cross.
        var y = GROUND - c.h; // Top edge of the crate.
        ctx.fillStyle = NAVY; // Chooses navy for the box.
        ctx.fillRect(c.x, y, c.w, c.h); // Draws the box.
        ctx.strokeStyle = YELLOW; // Chooses yellow for the lines.
        ctx.lineWidth = 2; // Sets the line thickness.
        ctx.strokeRect(c.x + 3, y + 3, c.w - 6, c.h - 6); // Draws an inner frame.
        ctx.beginPath(); // Starts a new line.
        ctx.moveTo(c.x + 3, y + 3); // Moves to the top left corner of the frame.
        ctx.lineTo(c.x + c.w - 3, y + c.h - 3); // Draws a diagonal across the box.
        ctx.stroke(); // Paints the line.
    }

    function drawRunner() { // Draws the student runner.
        var x = runner.x; // Left edge of the runner.
        var y = runner.y; // Top edge of the runner.
        ctx.fillStyle = YELLOW; // Chooses yellow for the head and backpack.
        ctx.fillRect(x + 8, y, 16, 14); // Draws the head.
        ctx.fillRect(x - 4, y + 18, 10, 18); // Draws the backpack.
        ctx.fillStyle = NAVY; // Chooses navy for the body.
        ctx.fillRect(x + 6, y + 16, 20, 18); // Draws the body.
        ctx.fillRect(x + 18, y + 4, 4, 4); // Draws an eye.
        var step = runner.onGround && Math.floor(steps / 5) % 2 === 0; // Alternates the legs while running on the ground.
        ctx.fillRect(x + 8, y + 34, 6, step ? 10 : 6); // Draws the back leg.
        ctx.fillRect(x + 18, y + 34, 6, step ? 6 : 10); // Draws the front leg.
    }

    function draw() { // Draws one complete frame.
        ctx.fillStyle = GREY; // Chooses the background colour.
        ctx.fillRect(0, 0, W, H); // Fills the whole canvas.
        ctx.fillStyle = "#ffffff"; // Chooses white for the clouds.
        clouds.forEach(function (c) { // Loops through the clouds.
            ctx.fillRect(c.x, c.y, 46, 12); // Draws the flat base of a cloud.
            ctx.fillRect(c.x + 10, c.y - 8, 26, 10); // Draws the top of a cloud.
        });
        ctx.fillStyle = NAVY; // Chooses navy for the ground.
        ctx.fillRect(0, GROUND, W, 3); // Draws the ground line.
        for (var g = -(distance % 40); g < W; g += 40) { // Draws small ground marks that scroll with the distance.
            ctx.fillRect(g, GROUND + 10, 14, 2); // Draws one mark below the ground line.
        }
        crates.forEach(drawCrate); // Draws every crate.
        drawRunner(); // Draws the runner.
        ctx.fillStyle = NAVY; // Chooses navy for the text.
        ctx.font = "bold 16px 'Segoe UI', Arial, sans-serif"; // Sets the text style.
        ctx.textAlign = "right"; // Aligns the score to the right.
        ctx.fillText("Best " + pad(best) + "   Score " + pad(score), W - 14, 26); // Draws the best score and the current score.
        ctx.textAlign = "center"; // Centres the messages.
        if (state === "idle") { ctx.fillText("Press Space or tap to start", W / 2, 90); } // Shows the start message.
        if (state === "over") { ctx.fillText("Game over - press Space or tap to play again", W / 2, 90); } // Shows the game over message.
    }

    // ---------- Game logic ----------
    function hit() { // Checks whether the runner touches any crate.
        var rx = runner.x + 5; // Left edge of the runner's hit box, made a little smaller to be fair.
        var ry = runner.y + 4; // Top edge of the hit box.
        var rw = runner.w - 10; // Width of the hit box.
        var rh = runner.h - 6; // Height of the hit box.
        for (var i = 0; i < crates.length; i++) { // Loops through every crate.
            var c = crates[i]; // Gets one crate.
            var cy = GROUND - c.h; // Top edge of the crate.
            if (rx < c.x + c.w && rx + rw > c.x && ry + rh > cy) { return true; } // Detects two overlapping boxes.
        }
        return false; // No crate was touched.
    }

    function end() { // Stops the game and saves the best score.
        state = "over"; // Marks the game as finished.
        overAt = performance.now(); // Remembers when it ended.
        if (score > best) { // Checks for a new best score.
            best = score; // Stores the new best score.
            try { window.localStorage.setItem("cc_game_best", String(best)); } catch (e) { best = score; } // Saves it on this device if possible.
        }
        draw(); // Draws the final frame with the game over message.
        statusEl.textContent = "Game over. Your score was " + score + ". Best score " + best + "."; // Announces the result.
        startBtn.textContent = "Play again"; // Changes the button label.
    }

    function update(dt) { // Moves everything forward by one step.
        score = Math.floor(distance / 12); // Works out the score from the distance.
        speed = Math.min(13, 6 + score * 0.007); // Speeds up as the score grows, up to a limit.
        distance += speed * dt; // Adds the distance travelled in this step.
        steps += dt; // Advances the leg animation.
        runner.vy += GRAVITY * dt; // Pulls the runner down.
        runner.y += runner.vy * dt; // Moves the runner up or down.
        if (runner.y >= GROUND - runner.h) { // Checks whether the runner has reached the ground.
            runner.y = GROUND - runner.h; // Keeps the runner on the ground.
            runner.vy = 0; // Stops the falling.
            runner.onGround = true; // Allows another jump.
        }
        gapLeft -= speed * dt; // Counts down to the next crate.
        if (gapLeft <= 0) { // Checks whether it is time for a new crate.
            var type = crateTypes[Math.floor(Math.random() * crateTypes.length)]; // Picks a random crate size.
            crates.push({ x: W + 10, w: type.w, h: type.h }); // Adds the crate just past the right edge.
            gapLeft = type.w + speed * 38 + 140 + Math.random() * 220; // Sets a safe, random gap to the next crate.
        }
        for (var i = crates.length - 1; i >= 0; i--) { // Loops through the crates from the end.
            crates[i].x -= speed * dt; // Moves the crate to the left.
            if (crates[i].x + crates[i].w < 0) { crates.splice(i, 1); } // Removes crates that have left the screen.
        }
        clouds.forEach(function (c) { // Loops through the clouds.
            c.x -= speed * dt * 0.2; // Moves clouds slowly for a depth effect.
            if (c.x < -60) { c.x = W + 20; } // Brings a cloud back in on the right.
        });
        if (hit()) { end(); } // Ends the game after a collision.
    }

    function loop(time) { // Runs once for every screen refresh while the game is playing.
        if (state !== "running") { return; } // Stops the loop when the game is not running.
        var dt = Math.max(0, Math.min((time - lastTime) / 16.667, 3)); // Counts how many 60 fps frames passed, capped for slow devices.
        lastTime = time; // Remembers this frame's time.
        update(dt); // Moves everything.
        if (state === "running") { // Checks that the game did not just end.
            draw(); // Draws the new frame.
            rafId = requestAnimationFrame(loop); // Asks for the next frame.
        }
    }

    function start() { // Begins a new game.
        if (rafId) { cancelAnimationFrame(rafId); } // Cancels any loop that is still running.
        reset(); // Sets the starting values.
        state = "running"; // Marks the game as running.
        lastTime = performance.now(); // Remembers the starting time.
        statusEl.textContent = "Game started. Jump over the crates."; // Announces the start.
        startBtn.textContent = "Restart game"; // Changes the button label.
        canvas.focus({ preventScroll: true }); // Moves the keyboard focus to the game.
        rafId = requestAnimationFrame(loop); // Starts the loop.
    }

    function jump() { // Handles one jump or start request.
        if (state === "idle") { start(); return; } // Starts the game on the first press.
        if (state === "over") { // Checks whether the game has ended.
            if (performance.now() - overAt > 400) { start(); } // Restarts, but not instantly, so a late jump does not restart by accident.
            return; // Stops here after handling the restart.
        }
        if (runner.onGround) { // Only lets the runner jump from the ground.
            runner.vy = JUMP; // Launches the runner upwards.
            runner.onGround = false; // Marks the runner as in the air.
        }
    }

    // ---------- Controls ----------
    canvas.addEventListener("keydown", function (e) { // Listens for key presses while the game has focus.
        if (e.code === "Space" || e.key === "ArrowUp" || e.key === " ") { // Checks for the jump keys.
            e.preventDefault(); // Stops the page from scrolling.
            jump(); // Jumps or starts the game.
        }
    });
    canvas.addEventListener("pointerdown", function (e) { // Listens for a tap or click on the game.
        e.preventDefault(); // Stops the browser from selecting text or zooming.
        canvas.focus({ preventScroll: true }); // Gives the game keyboard focus.
        jump(); // Jumps or starts the game.
    });
    startBtn.addEventListener("click", start); // Starts or restarts the game from the button.

    // ---------- First frame ----------
    reset(); // Sets the starting values.
    draw(); // Draws the opening screen.
})();
