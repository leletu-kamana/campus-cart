/* ==========================================================
   CAMPUS-CART — HOMEPAGE MARQUEE MOTION
   requestAnimationFrame-driven, responsive and hover-pausable.
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
            const pauseOnHover =
                (track.dataset.pauseHover || marquee.dataset.pauseHover || "true") !== "false";
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

            let cycleDistance = 0;
            let position = 0;
            let previousTimestamp = 0;
            let animationFrame = null;
            let isHovered = false;
            let isVisible = true;

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

                if (
                    !isHovered &&
                    isVisible &&
                    !reducedMotion.matches &&
                    cycleDistance > 0
                ) {
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
                if (animationFrame !== null || reducedMotion.matches) return;
                previousTimestamp = 0;
                animationFrame = window.requestAnimationFrame(animate);
            };

            const stop = () => {
                if (animationFrame !== null) {
                    window.cancelAnimationFrame(animationFrame);
                    animationFrame = null;
                }
                previousTimestamp = 0;
            };

            if (pauseOnHover) {
                marquee.addEventListener("mouseenter", () => {
                    isHovered = true;
                });

                marquee.addEventListener("mouseleave", () => {
                    isHovered = false;
                });
            }

            const resizeObserver = new ResizeObserver(measure);
            resizeObserver.observe(viewport);
            resizeObserver.observe(originalGroup);

            if ("IntersectionObserver" in window) {
                const visibilityObserver = new IntersectionObserver(([entry]) => {
                    isVisible = entry.isIntersecting;
                    if (isVisible) start();
                    else stop();
                });
                visibilityObserver.observe(marquee);
            }

            reducedMotion.addEventListener("change", () => {
                if (reducedMotion.matches) {
                    stop();
                    track.style.transform = "none";
                } else {
                    measure();
                    start();
                }
            });

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
