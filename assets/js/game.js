// ==========================================================
// CAMPUS-CART
// game.js - 404 page game: "Campus Runner"
// A small endless runner. Jump over the crates for as long as you can.
// Plain JavaScript and the canvas element, no libraries.
// Runs only on a page that has the #game-canvas element.
// (Replaces the older game.js: the 404 page now shows a live score and
// a saved best score, so this version updates those two badges too.)
// ==========================================================
// INLINE COMMENTING GUIDE: Explanatory comments identify the purpose of the main logic blocks, state changes, DOM operations and event handling.

// JavaScript statement/expression: (function () {
(function () {
  // JavaScript statement/expression: 'use strict';
  'use strict';
  // JavaScript statement/expression: const $ = (sel) => document.querySelector(sel);
  const $ = (sel) => document.querySelector(sel);
  // JavaScript statement/expression: if (!$('#game-canvas')) return;
  if (!$('#game-canvas')) return;

  /* ===== Campus Runner mini-game ===== */

      // JavaScript statement/expression: const canvas = $('#game-canvas');
      const canvas = $('#game-canvas');
      // JavaScript statement/expression: const ctx = canvas.getContext('2d');
      const ctx = canvas.getContext('2d');
      // JavaScript statement/expression: const statusEl = $('#game-status');
      const statusEl = $('#game-status');
      // JavaScript statement/expression: const scoreEl = $('#game-score');
      const scoreEl = $('#game-score');
      // JavaScript statement/expression: const bestEl = $('#game-best');
      const bestEl = $('#game-best');
      // JavaScript statement/expression: const startBtn = $('#game-start');
      const startBtn = $('#game-start');

      // Game state
      // JavaScript statement/expression: const GROUND_Y = 214;          // where the floor sits on the canvas
      const GROUND_Y = 214;          // where the floor sits on the canvas
      // JavaScript statement/expression: const GRAVITY = 0.55;
      const GRAVITY = 0.55;
      // JavaScript statement/expression: const JUMP_VELOCITY = -11.5;
      const JUMP_VELOCITY = -11.5;
      // JavaScript statement/expression: const PLAYER_W = 32;
      const PLAYER_W = 32;
      // JavaScript statement/expression: const PLAYER_H = 44;
      const PLAYER_H = 44;
      // JavaScript statement/expression: const CRATE_W = 34;
      const CRATE_W = 34;
      // JavaScript statement/expression: const CRATE_H = 34;
      const CRATE_H = 34;

      // JavaScript statement/expression: let running = false;
      let running = false;
      // JavaScript statement/expression: let over = false;
      let over = false;
      // JavaScript statement/expression: let score = 0;
      let score = 0;
      // JavaScript statement/expression: let best = 0;
      let best = 0;
      // JavaScript statement/expression: let player = null;
      let player = null;
      // JavaScript statement/expression: let crates = [];
      let crates = [];
      // JavaScript statement/expression: let crateTimer = 0;
      let crateTimer = 0;
      // JavaScript statement/expression: let frameId = null;
      let frameId = null;
      // JavaScript statement/expression: let lastTime = 0;
      let lastTime = 0;

      // Load best score from localStorage (cc_game_best, per the Cookie Policy)
      // JavaScript statement/expression: try {
      try {
        // JavaScript statement/expression: best = Number(localStorage.getItem('cc_game_best')) || 0;
        best = Number(localStorage.getItem('cc_game_best')) || 0;
      // JavaScript statement/expression: } catch (e) { best = 0; }
      } catch (e) { best = 0; }
      // JavaScript statement/expression: bestEl.textContent = 'Best ' + best;
      bestEl.textContent = 'Best ' + best;

      // resetGame: handles the reset game operation used by this feature.

      // JavaScript statement/expression: function resetGame() {
      function resetGame() {
        // JavaScript statement/expression: running = true;
        running = true;
        // JavaScript statement/expression: over = false;
        over = false;
        // JavaScript statement/expression: score = 0;
        score = 0;
        // JavaScript statement/expression: crates = [];
        crates = [];
        // JavaScript statement/expression: crateTimer = 0;
        crateTimer = 0;
        // JavaScript statement/expression: player = {
        player = {
          // JavaScript statement/expression: x: 70,
          x: 70,
          // JavaScript statement/expression: y: GROUND_Y - PLAYER_H,
          y: GROUND_Y - PLAYER_H,
          // JavaScript statement/expression: w: PLAYER_W,
          w: PLAYER_W,
          // JavaScript statement/expression: h: PLAYER_H,
          h: PLAYER_H,
          // JavaScript statement/expression: vy: 0,
          vy: 0,
          // JavaScript statement/expression: grounded: true
          grounded: true
        // JavaScript statement/expression: };
        };
        // JavaScript statement/expression: scoreEl.textContent = 'Score 0';
        scoreEl.textContent = 'Score 0';
        // JavaScript statement/expression: statusEl.textContent = 'Go! Press Space or tap to jump.';
        statusEl.textContent = 'Go! Press Space or tap to jump.';
      // JavaScript statement/expression: }
      }

      // endGame: handles the end game operation used by this feature.

      // JavaScript statement/expression: function endGame() {
      function endGame() {
        // JavaScript statement/expression: running = false;
        running = false;
        // JavaScript statement/expression: over = true;
        over = true;
        // JavaScript statement/expression: statusEl.textContent = 'Crashed! Score ' + score + '. Press Start game to try again.';
        statusEl.textContent = 'Crashed! Score ' + score + '. Press Start game to try again.';
        // JavaScript statement/expression: startBtn.innerHTML = 'Play again <img src="https://unpkg.com/lucide-static@1.44.0/icons/play.svg" alt="" class
        startBtn.innerHTML = 'Play again <img src="https://unpkg.com/lucide-static@1.44.0/icons/play.svg" alt="" class="h-4 w-4">';
        // JavaScript statement/expression: if (score > best) {
        if (score > best) {
          // JavaScript statement/expression: best = score;
          best = score;
          // JavaScript statement/expression: bestEl.textContent = 'Best ' + best;
          bestEl.textContent = 'Best ' + best;
          // JavaScript statement/expression: try { localStorage.setItem('cc_game_best', String(best)); } catch (e) { /* storage blocked * / }
          try { localStorage.setItem('cc_game_best', String(best)); } catch (e) { /* storage blocked */ }
        // JavaScript statement/expression: }
        }
      // JavaScript statement/expression: }
      }

      // spawnCrate: handles the spawn crate operation used by this feature.

      // JavaScript statement/expression: function spawnCrate() {
      function spawnCrate() {
        // JavaScript statement/expression: crates.push({
        crates.push({
          // JavaScript statement/expression: x: canvas.width + 20,
          x: canvas.width + 20,
          // JavaScript statement/expression: y: GROUND_Y - CRATE_H,
          y: GROUND_Y - CRATE_H,
          // JavaScript statement/expression: w: CRATE_W,
          w: CRATE_W,
          // JavaScript statement/expression: h: CRATE_H,
          h: CRATE_H,
          // JavaScript statement/expression: passed: false,
          passed: false,
          // JavaScript statement/expression: speed: 5.2 + Math.min(score * 0.12, 4)
          speed: 5.2 + Math.min(score * 0.12, 4)
        // JavaScript statement/expression: });
        });
      // JavaScript statement/expression: }
      }

      // update: handles the update operation used by this feature.

      // JavaScript statement/expression: function update(dt) {
      function update(dt) {
        // JavaScript statement/expression: if (!running || over) return;
        if (!running || over) return;

        // Player physics
        // JavaScript statement/expression: if (!player.grounded) {
        if (!player.grounded) {
          // JavaScript statement/expression: player.vy += GRAVITY * dt * 60;
          player.vy += GRAVITY * dt * 60;
          // JavaScript statement/expression: player.y += player.vy * dt * 60;
          player.y += player.vy * dt * 60;
          // JavaScript statement/expression: if (player.y + player.h >= GROUND_Y) {
          if (player.y + player.h >= GROUND_Y) {
            // JavaScript statement/expression: player.y = GROUND_Y - player.h;
            player.y = GROUND_Y - player.h;
            // JavaScript statement/expression: player.vy = 0;
            player.vy = 0;
            // JavaScript statement/expression: player.grounded = true;
            player.grounded = true;
          // JavaScript statement/expression: }
          }
        // JavaScript statement/expression: }
        }

        // Spawn crates
        // JavaScript statement/expression: crateTimer -= dt;
        crateTimer -= dt;
        // JavaScript statement/expression: if (crateTimer <= 0) {
        if (crateTimer <= 0) {
          // JavaScript statement/expression: spawnCrate();
          spawnCrate();
          // JavaScript statement/expression: crateTimer = 1.1 + Math.random() * 1.1;
          crateTimer = 1.1 + Math.random() * 1.1;
        // JavaScript statement/expression: }
        }

        // Move crates + collisions
        // JavaScript statement/expression: crates.forEach((crate) => {
        crates.forEach((crate) => {
          // JavaScript statement/expression: crate.x -= crate.speed * dt * 60;
          crate.x -= crate.speed * dt * 60;

          // Score when a crate passes the player
          // JavaScript statement/expression: if (!crate.passed && crate.x + crate.w < player.x) {
          if (!crate.passed && crate.x + crate.w < player.x) {
            // JavaScript statement/expression: crate.passed = true;
            crate.passed = true;
            // JavaScript statement/expression: score += 1;
            score += 1;
            // JavaScript statement/expression: scoreEl.textContent = 'Score ' + score;
            scoreEl.textContent = 'Score ' + score;
          // JavaScript statement/expression: }
          }

          // AABB collision
          // JavaScript statement/expression: if (
          if (
            // JavaScript statement/expression: player.x < crate.x + crate.w &&
            player.x < crate.x + crate.w &&
            // JavaScript statement/expression: player.x + player.w > crate.x &&
            player.x + player.w > crate.x &&
            // JavaScript statement/expression: player.y < crate.y + crate.h &&
            player.y < crate.y + crate.h &&
            // JavaScript statement/expression: player.y + player.h > crate.y
            player.y + player.h > crate.y
          // JavaScript statement/expression: ) {
          ) {
            // JavaScript statement/expression: endGame();
            endGame();
          // JavaScript statement/expression: }
          }
        // JavaScript statement/expression: });
        });

        // Remove off-screen crates
        // JavaScript statement/expression: crates = crates.filter((crate) => crate.x + crate.w > -30);
        crates = crates.filter((crate) => crate.x + crate.w > -30);
      // JavaScript statement/expression: }
      }

      // draw: handles the draw operation used by this feature.

      // JavaScript statement/expression: function draw() {
      function draw() {
        // Clear
        // JavaScript statement/expression: ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sky gradient
        // JavaScript statement/expression: const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
        // JavaScript statement/expression: sky.addColorStop(0, '#10214d');
        sky.addColorStop(0, '#10214d');
        // JavaScript statement/expression: sky.addColorStop(1, '#0a1533');
        sky.addColorStop(1, '#0a1533');
        // JavaScript statement/expression: ctx.fillStyle = sky;
        ctx.fillStyle = sky;
        // JavaScript statement/expression: ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Faint stars
        // JavaScript statement/expression: ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        // JavaScript statement/expression: for (let i = 0; i < 12; i++) {
        for (let i = 0; i < 12; i++) {
          // JavaScript statement/expression: const sx = (i * 67 + 23) % canvas.width;
          const sx = (i * 67 + 23) % canvas.width;
          // JavaScript statement/expression: const sy = (i * 41 + 17) % 90;
          const sy = (i * 41 + 17) % 90;
          // JavaScript statement/expression: ctx.fillRect(sx, sy, 2, 2);
          ctx.fillRect(sx, sy, 2, 2);
        // JavaScript statement/expression: }
        }

        // Ground
        // JavaScript statement/expression: ctx.fillStyle = '#0d1b3e';
        ctx.fillStyle = '#0d1b3e';
        // JavaScript statement/expression: ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
        ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
        // JavaScript statement/expression: ctx.fillStyle = '#ffd23f';
        ctx.fillStyle = '#ffd23f';
        // JavaScript statement/expression: ctx.fillRect(0, GROUND_Y, canvas.width, 3);
        ctx.fillRect(0, GROUND_Y, canvas.width, 3);

        // Ground dashes scrolling with score
        // JavaScript statement/expression: ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        // JavaScript statement/expression: const dashOffset = (score * 24) % 40;
        const dashOffset = (score * 24) % 40;
        // JavaScript statement/expression: for (let x = -dashOffset; x < canvas.width; x += 40) {
        for (let x = -dashOffset; x < canvas.width; x += 40) {
          // JavaScript statement/expression: ctx.fillRect(x, GROUND_Y + 12, 20, 4);
          ctx.fillRect(x, GROUND_Y + 12, 20, 4);
        // JavaScript statement/expression: }
        }

        // Crates
        // JavaScript statement/expression: crates.forEach((crate) => {
        crates.forEach((crate) => {
          // JavaScript statement/expression: ctx.fillStyle = '#c2572f';
          ctx.fillStyle = '#c2572f';
          // JavaScript statement/expression: roundRect(ctx, crate.x, crate.y, crate.w, crate.h, 5);
          roundRect(ctx, crate.x, crate.y, crate.w, crate.h, 5);
          // JavaScript statement/expression: ctx.fill();
          ctx.fill();
          // JavaScript statement/expression: ctx.fillStyle = '#8f3d1f';
          ctx.fillStyle = '#8f3d1f';
          // JavaScript statement/expression: ctx.fillRect(crate.x + 6, crate.y + 6, crate.w - 12, 4);
          ctx.fillRect(crate.x + 6, crate.y + 6, crate.w - 12, 4);
          // JavaScript statement/expression: ctx.fillRect(crate.x + 6, crate.y + 16, crate.w - 12, 4);
          ctx.fillRect(crate.x + 6, crate.y + 16, crate.w - 12, 4);
        // JavaScript statement/expression: });
        });

        // Player (mini backpack)
        // JavaScript statement/expression: if (player) {
        if (player) {
          // JavaScript statement/expression: const px = player.x;
          const px = player.x;
          // JavaScript statement/expression: const py = player.y;
          const py = player.y;
          // Body
          // JavaScript statement/expression: ctx.fillStyle = '#ffd23f';
          ctx.fillStyle = '#ffd23f';
          // JavaScript statement/expression: roundRect(ctx, px, py, player.w, player.h, 9);
          roundRect(ctx, px, py, player.w, player.h, 9);
          // JavaScript statement/expression: ctx.fill();
          ctx.fill();
          // Pocket
          // JavaScript statement/expression: ctx.fillStyle = '#e6b300';
          ctx.fillStyle = '#e6b300';
          // JavaScript statement/expression: roundRect(ctx, px + 7, py + 10, player.w - 14, player.h - 16, 6);
          roundRect(ctx, px + 7, py + 10, player.w - 14, player.h - 16, 6);
          // JavaScript statement/expression: ctx.fill();
          ctx.fill();
          // Straps hint
          // JavaScript statement/expression: ctx.fillStyle = '#e6b300';
          ctx.fillStyle = '#e6b300';
          // JavaScript statement/expression: ctx.fillRect(px + 5, py + 8, 4, player.h - 14);
          ctx.fillRect(px + 5, py + 8, 4, player.h - 14);
          // JavaScript statement/expression: ctx.fillRect(px + player.w - 9, py + 8, 4, player.h - 14);
          ctx.fillRect(px + player.w - 9, py + 8, 4, player.h - 14);
        // JavaScript statement/expression: }
        }

        // HUD text inside the canvas when not running
        // JavaScript statement/expression: if (!running && !over) {
        if (!running && !over) {
          // JavaScript statement/expression: ctx.fillStyle = 'rgba(255,255,255,0.6)';
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          // JavaScript statement/expression: ctx.font = '600 15px Inter, sans-serif';
          ctx.font = '600 15px Inter, sans-serif';
          // JavaScript statement/expression: ctx.textAlign = 'center';
          ctx.textAlign = 'center';
          // JavaScript statement/expression: ctx.fillText('Press Start game to begin', canvas.width / 2, 130);
          ctx.fillText('Press Start game to begin', canvas.width / 2, 130);
        // JavaScript statement/expression: }
        }
      // JavaScript statement/expression: }
      }

      // roundRect: handles the round rect operation used by this feature.

      // JavaScript statement/expression: function roundRect(ctx, x, y, w, h, r) {
      function roundRect(ctx, x, y, w, h, r) {
        // JavaScript statement/expression: ctx.beginPath();
        ctx.beginPath();
        // JavaScript statement/expression: ctx.moveTo(x + r, y);
        ctx.moveTo(x + r, y);
        // JavaScript statement/expression: ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        // JavaScript statement/expression: ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        // JavaScript statement/expression: ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y + h, x, y, r);
        // JavaScript statement/expression: ctx.arcTo(x, y, x + w, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        // JavaScript statement/expression: ctx.closePath();
        ctx.closePath();
      // JavaScript statement/expression: }
      }

      // loop: handles the loop operation used by this feature.

      // JavaScript statement/expression: function loop(time) {
      function loop(time) {
        // JavaScript statement/expression: if (!lastTime) lastTime = time;
        if (!lastTime) lastTime = time;
        // JavaScript statement/expression: const dt = Math.min((time - lastTime) / 1000, 0.05);
        const dt = Math.min((time - lastTime) / 1000, 0.05);
        // JavaScript statement/expression: lastTime = time;
        lastTime = time;

        // JavaScript statement/expression: update(dt);
        update(dt);
        // JavaScript statement/expression: draw();
        draw();

        // JavaScript statement/expression: if (running && !over) {
        if (running && !over) {
          // JavaScript statement/expression: frameId = requestAnimationFrame(loop);
          frameId = requestAnimationFrame(loop);
        // JavaScript statement/expression: } else {
        } else {
          // One final draw so the crash frame stays visible
          // JavaScript statement/expression: draw();
          draw();
          // JavaScript statement/expression: frameId = null;
          frameId = null;
        // JavaScript statement/expression: }
        }
      // JavaScript statement/expression: }
      }

      // startGame: handles the start game operation used by this feature.

      // JavaScript statement/expression: function startGame() {
      function startGame() {
        // JavaScript statement/expression: if (frameId) cancelAnimationFrame(frameId);
        if (frameId) cancelAnimationFrame(frameId);
        // JavaScript statement/expression: resetGame();
        resetGame();
        // JavaScript statement/expression: lastTime = 0;
        lastTime = 0;
        // JavaScript statement/expression: startBtn.innerHTML = 'Playing… <img src="https://unpkg.com/lucide-static@1.44.0/icons/play.svg" alt="" class="
        startBtn.innerHTML = 'Playing… <img src="https://unpkg.com/lucide-static@1.44.0/icons/play.svg" alt="" class="h-4 w-4">';
        // JavaScript statement/expression: frameId = requestAnimationFrame(loop);
        frameId = requestAnimationFrame(loop);
      // JavaScript statement/expression: }
      }

      // JavaScript statement/expression: startBtn.addEventListener('click', startGame);
      startBtn.addEventListener('click', startGame);

      // Jump controls
      // JavaScript statement/expression: function tryJump() {
      function tryJump() {
        // JavaScript statement/expression: if (!running || over) return;
        if (!running || over) return;
        // JavaScript statement/expression: if (player.grounded) {
        if (player.grounded) {
          // JavaScript statement/expression: player.vy = JUMP_VELOCITY;
          player.vy = JUMP_VELOCITY;
          // JavaScript statement/expression: player.grounded = false;
          player.grounded = false;
        // JavaScript statement/expression: }
        }
      // JavaScript statement/expression: }
      }

      // JavaScript statement/expression: document.addEventListener('keydown', (e) => {
      document.addEventListener('keydown', (e) => {
        // JavaScript statement/expression: if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
          // JavaScript statement/expression: e.preventDefault();
          e.preventDefault();
          // JavaScript statement/expression: tryJump();
          tryJump();
        // JavaScript statement/expression: }
        }
      // JavaScript statement/expression: });
      });

      // Touch / click on canvas jumps
      // JavaScript statement/expression: canvas.addEventListener('pointerdown', (e) => {
      canvas.addEventListener('pointerdown', (e) => {
        // JavaScript statement/expression: e.preventDefault();
        e.preventDefault();
        // JavaScript statement/expression: if (!running && !over) {
        if (!running && !over) {
          // JavaScript statement/expression: startGame();
          startGame();
        // JavaScript statement/expression: } else {
        } else {
          // JavaScript statement/expression: tryJump();
          tryJump();
        // JavaScript statement/expression: }
        }
      // JavaScript statement/expression: });
      });

      // Initial draw
      // JavaScript statement/expression: resetGame();
      resetGame();
      // JavaScript statement/expression: running = false;
      running = false;
      // JavaScript statement/expression: draw();
      draw();
// JavaScript statement/expression: })();
})();
