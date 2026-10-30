// ==========================================================
// CAMPUS-CART
// game.js - 404 page game: "Campus Runner"
// A small endless runner. Jump over the crates for as long as you can.
// Plain JavaScript and the canvas element, no libraries.
// Runs only on a page that has the #game-canvas element.
// (Replaces the older game.js: the 404 page now shows a live score and
// a saved best score, so this version updates those two badges too.)
// ==========================================================

(function () {
  'use strict';
  const $ = (sel) => document.querySelector(sel);
  if (!$('#game-canvas')) return;

  /* ===== Campus Runner mini-game ===== */

      const canvas = $('#game-canvas');
      const ctx = canvas.getContext('2d');
      const statusEl = $('#game-status');
      const scoreEl = $('#game-score');
      const bestEl = $('#game-best');
      const startBtn = $('#game-start');

      // Game state
      const GROUND_Y = 214;          // where the floor sits on the canvas
      const GRAVITY = 0.55;
      const JUMP_VELOCITY = -11.5;
      const PLAYER_W = 32;
      const PLAYER_H = 44;
      const CRATE_W = 34;
      const CRATE_H = 34;

      let running = false;
      let over = false;
      let score = 0;
      let best = 0;
      let player = null;
      let crates = [];
      let crateTimer = 0;
      let frameId = null;
      let lastTime = 0;

      // Load best score from localStorage (cc_game_best, per the Cookie Policy)
      try {
        best = Number(localStorage.getItem('cc_game_best')) || 0;
      } catch (e) { best = 0; }
      bestEl.textContent = 'Best ' + best;

      function resetGame() {
        running = true;
        over = false;
        score = 0;
        crates = [];
        crateTimer = 0;
        player = {
          x: 70,
          y: GROUND_Y - PLAYER_H,
          w: PLAYER_W,
          h: PLAYER_H,
          vy: 0,
          grounded: true
        };
        scoreEl.textContent = 'Score 0';
        statusEl.textContent = 'Go! Press Space or tap to jump.';
      }

      function endGame() {
        running = false;
        over = true;
        statusEl.textContent = 'Crashed! Score ' + score + '. Press Start game to try again.';
        startBtn.innerHTML = 'Play again <img src="https://unpkg.com/lucide-static@1.44.0/icons/play.svg" alt="" class="h-4 w-4">';
        if (score > best) {
          best = score;
          bestEl.textContent = 'Best ' + best;
          try { localStorage.setItem('cc_game_best', String(best)); } catch (e) { /* storage blocked */ }
        }
      }

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

      function update(dt) {
        if (!running || over) return;

        // Player physics
        if (!player.grounded) {
          player.vy += GRAVITY * dt * 60;
          player.y += player.vy * dt * 60;
          if (player.y + player.h >= GROUND_Y) {
            player.y = GROUND_Y - player.h;
            player.vy = 0;
            player.grounded = true;
          }
        }

        // Spawn crates
        crateTimer -= dt;
        if (crateTimer <= 0) {
          spawnCrate();
          crateTimer = 1.1 + Math.random() * 1.1;
        }

        // Move crates + collisions
        crates.forEach((crate) => {
          crate.x -= crate.speed * dt * 60;

          // Score when a crate passes the player
          if (!crate.passed && crate.x + crate.w < player.x) {
            crate.passed = true;
            score += 1;
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

      function draw() {
        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sky gradient
        const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
        sky.addColorStop(0, '#10214d');
        sky.addColorStop(1, '#0a1533');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Faint stars
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        for (let i = 0; i < 12; i++) {
          const sx = (i * 67 + 23) % canvas.width;
          const sy = (i * 41 + 17) % 90;
          ctx.fillRect(sx, sy, 2, 2);
        }

        // Ground
        ctx.fillStyle = '#0d1b3e';
        ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);
        ctx.fillStyle = '#ffd23f';
        ctx.fillRect(0, GROUND_Y, canvas.width, 3);

        // Ground dashes scrolling with score
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        const dashOffset = (score * 24) % 40;
        for (let x = -dashOffset; x < canvas.width; x += 40) {
          ctx.fillRect(x, GROUND_Y + 12, 20, 4);
        }

        // Crates
        crates.forEach((crate) => {
          ctx.fillStyle = '#c2572f';
          roundRect(ctx, crate.x, crate.y, crate.w, crate.h, 5);
          ctx.fill();
          ctx.fillStyle = '#8f3d1f';
          ctx.fillRect(crate.x + 6, crate.y + 6, crate.w - 12, 4);
          ctx.fillRect(crate.x + 6, crate.y + 16, crate.w - 12, 4);
        });

        // Player (mini backpack)
        if (player) {
          const px = player.x;
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
          ctx.fillStyle = 'rgba(255,255,255,0.6)';
          ctx.font = '600 15px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Press Start game to begin', canvas.width / 2, 130);
        }
      }

      function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
      }

      function loop(time) {
        if (!lastTime) lastTime = time;
        const dt = Math.min((time - lastTime) / 1000, 0.05);
        lastTime = time;

        update(dt);
        draw();

        if (running && !over) {
          frameId = requestAnimationFrame(loop);
        } else {
          // One final draw so the crash frame stays visible
          draw();
          frameId = null;
        }
      }

      function startGame() {
        if (frameId) cancelAnimationFrame(frameId);
        resetGame();
        lastTime = 0;
        startBtn.innerHTML = 'Playing… <img src="https://unpkg.com/lucide-static@1.44.0/icons/play.svg" alt="" class="h-4 w-4">';
        frameId = requestAnimationFrame(loop);
      }

      startBtn.addEventListener('click', startGame);

      // Jump controls
      function tryJump() {
        if (!running || over) return;
        if (player.grounded) {
          player.vy = JUMP_VELOCITY;
          player.grounded = false;
        }
      }

      document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
          e.preventDefault();
          tryJump();
        }
      });

      // Touch / click on canvas jumps
      canvas.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (!running && !over) {
          startGame();
        } else {
          tryJump();
        }
      });

      // Initial draw
      resetGame();
      running = false;
      draw();
})();
