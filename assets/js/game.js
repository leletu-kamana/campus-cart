// GAME MODULE — Implements the Campus Runner canvas mini-game shown only when the page contains its game canvas and controls. It manages the animation loop, jumping, obstacles, score and saved best score; it is a self-contained browser game rather than part of shopping or checkout.

(function () {
  'use strict';
  // Declares the state value, configuration setting or DOM reference used by this game.
  const $ = (sel) => document.querySelector(sel);
  // Checks the condition before deciding whether the following game logic should run.
  if (!$('#game-canvas')) return;

      /* ===== Campus Runner mini-game ===== */

      // Declares the state value, configuration setting or DOM reference used by this game.
      const canvas = $('#game-canvas');
      // Declares the state value, configuration setting or DOM reference used by this game.
      const ctx = canvas.getContext('2d');
      // Declares the state value, configuration setting or DOM reference used by this game.
      const statusEl = $('#game-status');
      // Declares the state value, configuration setting or DOM reference used by this game.
      const scoreEl = $('#game-score');
      // Declares the state value, configuration setting or DOM reference used by this game.
      const bestEl = $('#game-best');
      // Declares the state value, configuration setting or DOM reference used by this game.
      const startBtn = $('#game-start');

      // Game state
      const GROUND_Y = 214;          // where the floor sits on the canvas
      // Declares the state value, configuration setting or DOM reference used by this game.
      const GRAVITY = 0.55;
      // Declares the state value, configuration setting or DOM reference used by this game.
      const JUMP_VELOCITY = -11.5;
      // Declares the state value, configuration setting or DOM reference used by this game.
      const PLAYER_W = 32;
      // Declares the state value, configuration setting or DOM reference used by this game.
      const PLAYER_H = 44;
      // Declares the state value, configuration setting or DOM reference used by this game.
      const CRATE_W = 34;
      // Declares the state value, configuration setting or DOM reference used by this game.
      const CRATE_H = 34;

      // Declares the state value, configuration setting or DOM reference used by this game.
      let running = false;
      // Declares the state value, configuration setting or DOM reference used by this game.
      let over = false;
      // Declares the state value, configuration setting or DOM reference used by this game.
      let score = 0;
      // Declares the state value, configuration setting or DOM reference used by this game.
      let best = 0;
      // Declares the state value, configuration setting or DOM reference used by this game.
      let player = null;
      // Declares the state value, configuration setting or DOM reference used by this game.
      let crates = [];
      // Declares the state value, configuration setting or DOM reference used by this game.
      let crateTimer = 0;
      // Declares the state value, configuration setting or DOM reference used by this game.
      let frameId = null;
      // Declares the state value, configuration setting or DOM reference used by this game.
      let lastTime = 0;

      // Load best score from localStorage (cc_game_best, per the Cookie Policy)
      try {
        // Uses a browser API to access the page, persist game data or control the animation timing.
        best = Number(localStorage.getItem('cc_game_best')) || 0;
      } catch (e) { best = 0; }
      // Updates the corresponding on-page game display or visual state.
      bestEl.textContent = 'Best ' + best;

      // Defines a reusable game operation or event callback.
      function resetGame() {
        // Updates the game state used by the next calculation or animation frame.
        running = true;
        // Updates the game state used by the next calculation or animation frame.
        over = false;
        // Updates the game state used by the next calculation or animation frame.
        score = 0;
        // Updates the game state used by the next calculation or animation frame.
        crates = [];
        // Updates the game state used by the next calculation or animation frame.
        crateTimer = 0;
        // Updates the game state used by the next calculation or animation frame.
        player = {
          x: 70,
          y: GROUND_Y - PLAYER_H,
          w: PLAYER_W,
          h: PLAYER_H,
          vy: 0,
          grounded: true
        };
        // Updates the corresponding on-page game display or visual state.
        scoreEl.textContent = 'Score 0';
        // Updates the corresponding on-page game display or visual state.
        statusEl.textContent = 'Go! Press Space or tap to jump.';
      }

      // Defines a reusable game operation or event callback.
      function endGame() {
        // Updates the game state used by the next calculation or animation frame.
        running = false;
        // Updates the game state used by the next calculation or animation frame.
        over = true;
        // Updates the corresponding on-page game display or visual state.
        statusEl.textContent = 'Crashed! Score ' + score + '. Press Start game to try again.';
        // Updates the corresponding on-page game display or visual state.
        startBtn.innerHTML = 'Play again <img src="https://unpkg.com/lucide-static@1.44.0/icons/play.svg" alt="" class="h-4 w-4">';
        // Checks the condition before deciding whether the following game logic should run.
        if (score > best) {
          // Updates the game state used by the next calculation or animation frame.
          best = score;
          // Updates the corresponding on-page game display or visual state.
          bestEl.textContent = 'Best ' + best;
          // Uses a browser API to access the page, persist game data or control the animation timing.
          try { localStorage.setItem('cc_game_best', String(best)); } catch (e) { /* storage blocked */ }
        }
      }

      // Defines a reusable game operation or event callback.
      function spawnCrate() {
        crates.push({
          x: canvas.width + 20,
          y: GROUND_Y - CRATE_H,
          w: CRATE_W,
          h: CRATE_H,
          passed: false,
          speed: 5.2 + Math.min(score * 0.12, 4)
        });
      }

      // Defines a reusable game operation or event callback.
      function update(dt) {
        // Checks the condition before deciding whether the following game logic should run.
        if (!running || over) return;

        // Player physics
        if (!player.grounded) {
          // Updates the game state used by the next calculation or animation frame.
          player.vy += GRAVITY * dt * 60;
          // Updates the game state used by the next calculation or animation frame.
          player.y += player.vy * dt * 60;
          // Checks the condition before deciding whether the following game logic should run.
          if (player.y + player.h >= GROUND_Y) {
            // Updates the game state used by the next calculation or animation frame.
            player.y = GROUND_Y - player.h;
            // Updates the game state used by the next calculation or animation frame.
            player.vy = 0;
            // Updates the game state used by the next calculation or animation frame.
            player.grounded = true;
          }
        }

        // Spawn crates
        crateTimer -= dt;
        // Checks the condition before deciding whether the following game logic should run.
        if (crateTimer <= 0) {
          spawnCrate();
          // Updates the game state used by the next calculation or animation frame.
          crateTimer = 1.1 + Math.random() * 1.1;
        }

        // Move crates + collisions
        crates.forEach((crate) => {
          // Updates the game state used by the next calculation or animation frame.
          crate.x -= crate.speed * dt * 60;

          // Score when a crate passes the player
          if (!crate.passed && crate.x + crate.w < player.x) {
            // Updates the game state used by the next calculation or animation frame.
            crate.passed = true;
            // Updates the game state used by the next calculation or animation frame.
            score += 1;
            // Updates the corresponding on-page game display or visual state.
            scoreEl.textContent = 'Score ' + score;
          }

          // AABB collision
          if (
            player.x < crate.x + crate.w &&
            player.x + player.w > crate.x &&
            player.y < crate.y + crate.h &&
            player.y + player.h > crate.y
          ) {
            endGame();
          }
        });

        // Remove off-screen crates
        crates = crates.filter((crate) => crate.x + crate.w > -30);
      }

      // Defines a reusable game operation or event callback.
      function draw() {
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sky gradient
        const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
        sky.addColorStop(0, '#10214d');
        sky.addColorStop(1, '#0a1533');
        // Updates the game state used by the next calculation or animation frame.
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Faint stars
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        // Repeats the following game operation while the loop condition remains true.
        for (let i = 0; i < 12; i++) {
          // Declares the state value, configuration setting or DOM reference used by this game.
          const sx = (i * 67 + 23) % canvas.width;
          // Declares the state value, configuration setting or DOM reference used by this game.
          const sy = (i * 41 + 17) % 90;
          ctx.fillRect(sx, sy, 2, 2);
        }

        // Ground
        ctx.fillStyle = '#0d1b3e';
        ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
        // Updates the game state used by the next calculation or animation frame.
        ctx.fillStyle = '#ffd23f';
        ctx.fillRect(0, GROUND_Y, canvas.width, 3);

        // Ground dashes scrolling with score
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        // Declares the state value, configuration setting or DOM reference used by this game.
        const dashOffset = (score * 24) % 40;
        // Repeats the following game operation while the loop condition remains true.
        for (let x = -dashOffset; x < canvas.width; x += 40) {
          ctx.fillRect(x, GROUND_Y + 12, 20, 4);
        }

        // Crates
        crates.forEach((crate) => {
          // Updates the game state used by the next calculation or animation frame.
          ctx.fillStyle = '#c2572f';
          roundRect(ctx, crate.x, crate.y, crate.w, crate.h, 5);
          ctx.fill();
          // Updates the game state used by the next calculation or animation frame.
          ctx.fillStyle = '#8f3d1f';
          ctx.fillRect(crate.x + 6, crate.y + 6, crate.w - 12, 4);
          ctx.fillRect(crate.x + 6, crate.y + 16, crate.w - 12, 4);
        });

        // Player (mini backpack)
        if (player) {
          // Declares the state value, configuration setting or DOM reference used by this game.
          const px = player.x;
          // Declares the state value, configuration setting or DOM reference used by this game.
          const py = player.y;
          // Body
          ctx.fillStyle = '#ffd23f';
          roundRect(ctx, px, py, player.w, player.h, 9);
          ctx.fill();
          // Pocket
          ctx.fillStyle = '#e6b300';
          roundRect(ctx, px + 7, py + 10, player.w - 14, player.h - 16, 6);
          ctx.fill();
          // Straps hint
          ctx.fillStyle = '#e6b300';
          ctx.fillRect(px + 5, py + 8, 4, player.h - 14);
          ctx.fillRect(px + player.w - 9, py + 8, 4, player.h - 14);
        }

        // HUD text inside the canvas when not running
        if (!running && !over) {
          // Updates the game state used by the next calculation or animation frame.
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          // Updates the game state used by the next calculation or animation frame.
          ctx.font = '600 15px Inter, sans-serif';
          // Updates the game state used by the next calculation or animation frame.
          ctx.textAlign = 'center';
          ctx.fillText('Press Start game to begin', canvas.width / 2, 130);
        }
      }

      // Defines a reusable game operation or event callback.
      function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
      }

      // Defines a reusable game operation or event callback.
      function loop(time) {
        // Checks the condition before deciding whether the following game logic should run.
        if (!lastTime) lastTime = time;
        // Declares the state value, configuration setting or DOM reference used by this game.
        const dt = Math.min((time - lastTime) / 1000, 0.05);
        // Updates the game state used by the next calculation or animation frame.
        lastTime = time;

        update(dt);
        draw();

        // Checks the condition before deciding whether the following game logic should run.
        if (running && !over) {
          // Uses a browser API to access the page, persist game data or control the animation timing.
          frameId = requestAnimationFrame(loop);
        } else {
          // One final draw so the crash frame stays visible
          draw();
          // Updates the game state used by the next calculation or animation frame.
          frameId = null;
        }
      }

      // Defines a reusable game operation or event callback.
      function startGame() {
        // Checks the condition before deciding whether the following game logic should run.
        if (frameId) cancelAnimationFrame(frameId);
        resetGame();
        // Updates the game state used by the next calculation or animation frame.
        lastTime = 0;
        // Updates the corresponding on-page game display or visual state.
        startBtn.innerHTML = 'Playing… <img src="https://unpkg.com/lucide-static@1.44.0/icons/play.svg" alt="" class="h-4 w-4">';
        // Uses a browser API to access the page, persist game data or control the animation timing.
        frameId = requestAnimationFrame(loop);
      }

      // Registers a handler for the specified browser or player input event.
      startBtn.addEventListener('click', startGame);

      // Jump controls
      function tryJump() {
        // Checks the condition before deciding whether the following game logic should run.
        if (!running || over) return;
        // Checks the condition before deciding whether the following game logic should run.
        if (player.grounded) {
          // Updates the game state used by the next calculation or animation frame.
          player.vy = JUMP_VELOCITY;
          // Updates the game state used by the next calculation or animation frame.
          player.grounded = false;
        }
      }

      // Registers a handler for the specified browser or player input event.
      document.addEventListener('keydown', (e) => {
        // Checks the condition before deciding whether the following game logic should run.
        if (e.code === 'Space' || e.code === 'ArrowUp') {
          e.preventDefault();
          tryJump();
        }
      });

      // Touch / click on canvas jumps
      canvas.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        // Checks the condition before deciding whether the following game logic should run.
        if (!running && !over) {
          startGame();
        } else {
          tryJump();
        }
      });

      // Initial draw
      resetGame();
      // Updates the game state used by the next calculation or animation frame.
      running = false;
      draw();
})();
