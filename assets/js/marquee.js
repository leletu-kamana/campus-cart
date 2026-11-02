/* ==========================================================
   CAMPUS-CART — HOMEPAGE MARQUEE MOTION
   requestAnimationFrame-driven, responsive and always running.
   ========================================================== */
// JavaScript statement/expression: (() => {
(() => {
    // JavaScript statement/expression: "use strict";
    "use strict";

    // JavaScript statement/expression: const initialiseMarquees = () => {
    const initialiseMarquees = () => {
        // JavaScript statement/expression: const selectors = [
        const selectors = [
            // JavaScript statement/expression: ".cc-trust-marquee",
            ".cc-trust-marquee",
            // JavaScript statement/expression: ".cc-brand-marquee"
            ".cc-brand-marquee"
        // JavaScript statement/expression: ];
        ];

        // JavaScript statement/expression: document.querySelectorAll(selectors.join(",")).forEach((marquee) => {
        document.querySelectorAll(selectors.join(",")).forEach((marquee) => {
            // JavaScript statement/expression: const track = marquee.querySelector(
            const track = marquee.querySelector(
                // JavaScript statement/expression: ".cc-marquee-track, .cc-brand-marquee-track"
                ".cc-marquee-track, .cc-brand-marquee-track"
            // JavaScript statement/expression: );
            );
            // JavaScript statement/expression: const viewport = marquee.querySelector(
            const viewport = marquee.querySelector(
                // JavaScript statement/expression: ".cc-marquee-viewport"
                ".cc-marquee-viewport"
            // JavaScript statement/expression: );
            );
            // JavaScript statement/expression: const originalGroup = track?.querySelector(
            const originalGroup = track?.querySelector(
                // JavaScript statement/expression: ".cc-marquee-group, .cc-brand-marquee-group"
                ".cc-marquee-group, .cc-brand-marquee-group"
            // JavaScript statement/expression: );
            );

            // JavaScript statement/expression: if (!track || !viewport || !originalGroup) return;
            if (!track || !viewport || !originalGroup) return;
            // JavaScript statement/expression: if (track.dataset.marqueeInitialised === "true") return;
            if (track.dataset.marqueeInitialised === "true") return;

            // JavaScript statement/expression: track.dataset.marqueeInitialised = "true";
            track.dataset.marqueeInitialised = "true";

            // JavaScript statement/expression: const speed = Math.max(
            const speed = Math.max(
                // JavaScript statement/expression: 0,
                0,
                // JavaScript statement/expression: Number.parseFloat(track.dataset.speed || marquee.dataset.speed) || 0.75
                Number.parseFloat(track.dataset.speed || marquee.dataset.speed) || 0.75
            // JavaScript statement/expression: );
            );
            // JavaScript statement/expression: const directionValue =
            const directionValue =
                // JavaScript statement/expression: track.dataset.direction || marquee.dataset.direction || "left";
                track.dataset.direction || marquee.dataset.direction || "left";
            // JavaScript statement/expression: const direction = directionValue === "right" ? "right" : "left";
            const direction = directionValue === "right" ? "right" : "left";
            /* This homepage marquee is intentionally always-on. */

            // JavaScript statement/expression: let cycleDistance = 0;
            let cycleDistance = 0;
            // JavaScript statement/expression: let position = 0;
            let position = 0;
            // JavaScript statement/expression: let previousTimestamp = 0;
            let previousTimestamp = 0;
            // JavaScript statement/expression: let animationFrame = null;
            let animationFrame = null;

            // JavaScript statement/expression: const measure = () => {
            const measure = () => {
                // JavaScript statement/expression: const groupWidth = originalGroup.getBoundingClientRect().width;
                const groupWidth = originalGroup.getBoundingClientRect().width;
                // JavaScript statement/expression: const trackStyle = window.getComputedStyle(track);
                const trackStyle = window.getComputedStyle(track);
                // JavaScript statement/expression: const gap = Number.parseFloat(trackStyle.columnGap) || 0;
                const gap = Number.parseFloat(trackStyle.columnGap) || 0;

                // JavaScript statement/expression: cycleDistance = groupWidth + gap;
                cycleDistance = groupWidth + gap;

                // JavaScript statement/expression: if (!cycleDistance || !Number.isFinite(cycleDistance)) return;
                if (!cycleDistance || !Number.isFinite(cycleDistance)) return;

                // JavaScript statement/expression: position = direction === "right" ? -cycleDistance : 0;
                position = direction === "right" ? -cycleDistance : 0;
                // JavaScript statement/expression: track.style.setProperty("transform", `translate3d(${position}px, 0, 0)`, "important");
                track.style.setProperty("transform", `translate3d(${position}px, 0, 0)`, "important");
            // JavaScript statement/expression: };
            };

            // JavaScript statement/expression: const animate = (timestamp) => {
            const animate = (timestamp) => {
                // JavaScript statement/expression: if (!previousTimestamp) previousTimestamp = timestamp;
                if (!previousTimestamp) previousTimestamp = timestamp;

                // JavaScript statement/expression: const elapsed = Math.min(timestamp - previousTimestamp, 50);
                const elapsed = Math.min(timestamp - previousTimestamp, 50);
                // JavaScript statement/expression: previousTimestamp = timestamp;
                previousTimestamp = timestamp;

                // JavaScript statement/expression: if (cycleDistance > 0) {
                if (cycleDistance > 0) {
                    /* data-speed is measured in pixels per 60Hz frame. */
                    // JavaScript statement/expression: const frameScale = elapsed / (1000 / 60);
                    const frameScale = elapsed / (1000 / 60);
                    // JavaScript statement/expression: const distance = speed * frameScale;
                    const distance = speed * frameScale;

                    // JavaScript statement/expression: if (direction === "left") {
                    if (direction === "left") {
                        // JavaScript statement/expression: position -= distance;
                        position -= distance;
                        // JavaScript statement/expression: if (position <= -cycleDistance) {
                        if (position <= -cycleDistance) {
                            // JavaScript statement/expression: position += cycleDistance;
                            position += cycleDistance;
                        // JavaScript statement/expression: }
                        }
                    // JavaScript statement/expression: } else {
                    } else {
                        // JavaScript statement/expression: position += distance;
                        position += distance;
                        // JavaScript statement/expression: if (position >= 0) {
                        if (position >= 0) {
                            // JavaScript statement/expression: position -= cycleDistance;
                            position -= cycleDistance;
                        // JavaScript statement/expression: }
                        }
                    // JavaScript statement/expression: }
                    }

                    // JavaScript statement/expression: track.style.transform =
                    track.style.transform =
                        // JavaScript statement/expression: `translate3d(${position}px, 0, 0)`;
                        `translate3d(${position}px, 0, 0)`;
                // JavaScript statement/expression: }
                }

                // JavaScript statement/expression: animationFrame = window.requestAnimationFrame(animate);
                animationFrame = window.requestAnimationFrame(animate);
            // JavaScript statement/expression: };
            };

            // JavaScript statement/expression: const start = () => {
            const start = () => {
                // JavaScript statement/expression: if (animationFrame !== null) return;
                if (animationFrame !== null) return;
                // JavaScript statement/expression: previousTimestamp = 0;
                previousTimestamp = 0;
                // JavaScript statement/expression: animationFrame = window.requestAnimationFrame(animate);
                animationFrame = window.requestAnimationFrame(animate);
            // JavaScript statement/expression: };
            };

            // JavaScript statement/expression: if ("ResizeObserver" in window) {
            if ("ResizeObserver" in window) {
                // JavaScript statement/expression: const resizeObserver = new ResizeObserver(measure);
                const resizeObserver = new ResizeObserver(measure);
                // JavaScript statement/expression: resizeObserver.observe(viewport);
                resizeObserver.observe(viewport);
                // JavaScript statement/expression: resizeObserver.observe(originalGroup);
                resizeObserver.observe(originalGroup);
            // JavaScript statement/expression: } else {
            } else {
                // JavaScript statement/expression: window.addEventListener("resize", measure);
                window.addEventListener("resize", measure);
            // JavaScript statement/expression: }
            }

            // JavaScript statement/expression: if (document.fonts?.ready) {
            if (document.fonts?.ready) {
                // JavaScript statement/expression: document.fonts.ready.then(measure);
                document.fonts.ready.then(measure);
            // JavaScript statement/expression: }
            }

            // JavaScript statement/expression: window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                // JavaScript statement/expression: measure();
                measure();
                // JavaScript statement/expression: start();
                start();
            // JavaScript statement/expression: });
            });
        // JavaScript statement/expression: });
        });
    // JavaScript statement/expression: };
    };

    // JavaScript statement/expression: if (document.readyState === "loading") {
    if (document.readyState === "loading") {
        // JavaScript statement/expression: document.addEventListener("DOMContentLoaded", initialiseMarquees, {
        document.addEventListener("DOMContentLoaded", initialiseMarquees, {
            // JavaScript statement/expression: once: true
            once: true
        // JavaScript statement/expression: });
        });
    // JavaScript statement/expression: } else {
    } else {
        // JavaScript statement/expression: initialiseMarquees();
        initialiseMarquees();
    // JavaScript statement/expression: }
    }
// JavaScript statement/expression: })();
})();
