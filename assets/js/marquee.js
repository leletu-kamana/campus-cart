/* ==========================================================
   CAMPUS-CART — HOMEPAGE MARQUEE MOTION
   requestAnimationFrame-driven, responsive and always running.
   ========================================================== */
(() => {
    "use strict";

    const initialiseMarquees = () => {
        const selectors = [
            ".cc-trust-marquee",
            ".cc-brand-marquee"
        ];

        document.querySelectorAll(selectors.join(",")).forEach((marquee) => {
            const track = marquee.querySelector(
                ".cc-marquee-track, .cc-brand-marquee-track"
            );
            const viewport = marquee.querySelector(
                ".cc-marquee-viewport"
            );
            const originalGroup = track?.querySelector(
                ".cc-marquee-group, .cc-brand-marquee-group"
            );

            if (!track || !viewport || !originalGroup) return;
            if (track.dataset.marqueeInitialised === "true") return;

            track.dataset.marqueeInitialised = "true";

            const speed = Math.max(
                0,
                Number.parseFloat(track.dataset.speed || marquee.dataset.speed) || 0.75
            );
            const directionValue =
                track.dataset.direction || marquee.dataset.direction || "left";
            const direction = directionValue === "right" ? "right" : "left";
            /* This homepage marquee is intentionally always-on. */

            let cycleDistance = 0;
            let position = 0;
            let previousTimestamp = 0;
            let animationFrame = null;

            const measure = () => {
                const groupWidth = originalGroup.getBoundingClientRect().width;
                const trackStyle = window.getComputedStyle(track);
                const gap = Number.parseFloat(trackStyle.columnGap) || 0;

                cycleDistance = groupWidth + gap;

                if (!cycleDistance || !Number.isFinite(cycleDistance)) return;

                position = direction === "right" ? -cycleDistance : 0;
                track.style.transform = `translate3d(${position}px, 0, 0)`;
            };

            const animate = (timestamp) => {
                if (!previousTimestamp) previousTimestamp = timestamp;

                const elapsed = Math.min(timestamp - previousTimestamp, 50);
                previousTimestamp = timestamp;

                if (cycleDistance > 0) {
                    /* data-speed is measured in pixels per 60Hz frame. */
                    const frameScale = elapsed / (1000 / 60);
                    const distance = speed * frameScale;

                    if (direction === "left") {
                        position -= distance;
                        if (position <= -cycleDistance) {
                            position += cycleDistance;
                        }
                    } else {
                        position += distance;
                        if (position >= 0) {
                            position -= cycleDistance;
                        }
                    }

                    track.style.transform =
                        `translate3d(${position}px, 0, 0)`;
                }

                animationFrame = window.requestAnimationFrame(animate);
            };

            const start = () => {
                if (animationFrame !== null) return;
                previousTimestamp = 0;
                animationFrame = window.requestAnimationFrame(animate);
            };

            const resizeObserver = new ResizeObserver(measure);
            resizeObserver.observe(viewport);
            resizeObserver.observe(originalGroup);

            if (document.fonts?.ready) {
                document.fonts.ready.then(measure);
            }

            measure();
            start();
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialiseMarquees, {
            once: true
        });
    } else {
        initialiseMarquees();
    }
})();
