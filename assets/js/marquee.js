/* ==========================================================
   CAMPUS-CART — HOMEPAGE MARQUEE MOTION
   This module measures the trust and brand marquee content, then moves
   each track continuously with requestAnimationFrame without user input.
   ========================================================== */
(() => {
    /* Enable strict JavaScript parsing so undeclared variables and other
       unsafe language patterns are reported instead of silently accepted. */
    "use strict";

    /* Register the marquee setup routine so each matching homepage marquee
       receives its own measurements, animation state and resize handling. */
    const initialiseMarquees = () => {
        /* List the two supported marquee containers; the combined selector
           lets one initialisation pass handle both designs consistently. */
        const selectors = [
            ".cc-trust-marquee",
            ".cc-brand-marquee"
        ];

        /* Find every trust or brand marquee and initialise them separately
           so one missing or differently sized marquee cannot affect another. */
        document.querySelectorAll(selectors.join(",")).forEach((marquee) => {
            /* Locate the moving track that contains the duplicated marquee
               groups; either class is accepted for the two supported layouts. */
            const track = marquee.querySelector(
                ".cc-marquee-track, .cc-brand-marquee-track"
            );

            /* Locate the visible clipping viewport that defines the area
               through which the moving track is displayed. */
            const viewport = marquee.querySelector(
                ".cc-marquee-viewport, .cc-brand-marquee-viewport"
            );

            /* Find the original content group used to calculate one complete
               movement cycle before any duplicated groups are traversed. */
            const originalGroup = track?.querySelector(
                ".cc-marquee-group, .cc-brand-marquee-group"
            );

            /* Stop this marquee when its required track, viewport or content
               group is missing, preventing invalid measurements and errors. */
            if (!track || !viewport || !originalGroup) return;

            /* Prevent duplicate animation loops if this setup routine is
               called again after the same marquee has already been prepared. */
            if (track.dataset.marqueeInitialised === "true") return;

            /* Mark this track as prepared so later setup calls can identify it
               without creating another observer or animation frame loop. */
            track.dataset.marqueeInitialised = "true";

            /* Read the visitor's motion preference so the automatic marquee
               can become manually scrollable when reduced motion is requested. */
            const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

            /* Switch between automatic movement and manual horizontal scrolling
               without hiding the marquee content from visitors who reduce motion. */
            const setReducedMotionLayout = (reduced) => {
                if (reduced) {
                    track.style.removeProperty("transform");
                    track.style.willChange = "auto";
                    viewport.style.overflowX = "auto";
                    viewport.style.overflowY = "hidden";
                    viewport.setAttribute("tabindex", "0");
                    viewport.setAttribute("role", "group");
                    viewport.setAttribute("aria-label", (marquee.getAttribute("aria-label") || "Scrolling content") + " (scrollable)");
                } else {
                    track.style.removeProperty("will-change");
                    viewport.style.removeProperty("overflow-x");
                    viewport.style.removeProperty("overflow-y");
                    viewport.removeAttribute("tabindex");
                    viewport.removeAttribute("role");
                    viewport.removeAttribute("aria-label");
                }
            };

            /* Read the configured speed from the track first, then its parent;
               use 0.75 pixels per 60Hz frame when no valid value is provided. */
            const speed = Math.max(
                0,
                Number.parseFloat(track.dataset.speed || marquee.dataset.speed) || 0.75
            );

            /* Read the requested direction from the track or parent and use
               left as the default direction when no direction is specified. */
            const directionValue =
                track.dataset.direction || marquee.dataset.direction || "left";

            /* Restrict direction to the two supported values so unexpected
               data attributes cannot create an undefined movement behaviour. */
            const direction = directionValue === "right" ? "right" : "left";

            /* Store the measured width of one complete content cycle; this
               value determines when the animation can safely wrap around. */
            let cycleDistance = 0;

            /* Store the current horizontal translation applied to the track;
               the animation updates this position on each animation frame. */
            let position = 0;

            /* Store the previous animation timestamp so movement is based on
               elapsed time rather than the speed of the user's display alone. */
            let previousTimestamp = 0;

            /* Keep the active animation-frame identifier so the start routine
               can avoid scheduling duplicate animation loops. */
            let animationFrame = null;

            /* Measure the original content group and its CSS gap to calculate
               the distance required for one seamless marquee movement cycle. */
            const measure = () => {
                /* Do not apply a transform when reduced motion is enabled;
                   the visitor can scroll the complete track manually instead. */
                if (motionPreference.matches) {
                    setReducedMotionLayout(true);
                    return;
                }

                /* Read the rendered width of the original group, including
                   current responsive sizing applied by the stylesheet. */
                const groupWidth = originalGroup.getBoundingClientRect().width;

                /* Read computed track styles so the measurement uses the
                   browser's resolved layout values rather than raw CSS text. */
                const trackStyle = window.getComputedStyle(track);

                /* Include the horizontal column gap between duplicated groups;
                   treat an absent or non-numeric gap as zero pixels. */
                const gap = Number.parseFloat(trackStyle.columnGap) || 0;

                /* Combine the group width and inter-group gap into one cycle
                   distance used by both left-moving and right-moving tracks. */
                cycleDistance = groupWidth + gap;

                /* Do not apply a transform when the measured distance is zero,
                   infinite or otherwise unsuitable for animation calculations. */
                if (!cycleDistance || !Number.isFinite(cycleDistance)) return;

                /* Place left-moving tracks at the start and right-moving tracks
                   one cycle to the left so both directions begin seamlessly. */
                position = direction === "right" ? -cycleDistance : 0;

                /* Apply the initial horizontal translation immediately and mark
                   it important to retain control against competing track rules. */
                track.style.setProperty("transform", `translate3d(${position}px, 0, 0)`, "important");
            };

            /* Advance the marquee using the browser timestamp supplied by
               requestAnimationFrame so movement remains consistent over time. */
            const animate = (timestamp) => {
                /* Stop the frame loop immediately if the visitor enables reduced
                   motion while the marquee is already moving. */
                if (motionPreference.matches) {
                    animationFrame = null;
                    setReducedMotionLayout(true);
                    return;
                }

                /* Initialise the timestamp on the first frame to avoid a large
                   movement calculation before the animation has begun. */
                if (!previousTimestamp) previousTimestamp = timestamp;

                /* Calculate elapsed milliseconds and cap long pauses at 50ms;
                   this prevents a large jump when a tab resumes from inactivity. */
                const elapsed = Math.min(timestamp - previousTimestamp, 50);

                /* Save the current frame timestamp for the next elapsed-time
                   calculation in the animation loop. */
                previousTimestamp = timestamp;

                /* Move the track only after a valid positive cycle distance has
                   been measured from the rendered marquee content. */
                if (cycleDistance > 0) {
                    /* Convert elapsed time into a scale relative to a standard
                       60Hz frame so configured speed behaves consistently. */
                    const frameScale = elapsed / (1000 / 60);

                    /* Calculate the number of pixels to move during this frame
                       using the configured speed and elapsed-time scale. */
                    const distance = speed * frameScale;

                    /* Move left by subtracting the frame distance and wrap the
                       track forward by one cycle after it leaves the viewport. */
                    if (direction === "left") {
                        position -= distance;
                        if (position <= -cycleDistance) {
                            position += cycleDistance;
                        }
                    } else {
                        /* Move right by adding the frame distance and wrap the
                           track back by one cycle when it reaches its start. */
                        position += distance;
                        if (position >= 0) {
                            position -= cycleDistance;
                        }
                    }

                    /* Update the moving track with a GPU-friendly 3D transform
                       while preserving its vertical position at zero pixels. */
                    track.style.transform =
                        `translate3d(${position}px, 0, 0)`;
                }

                /* Schedule the next animation frame to keep the marquee moving
                   automatically until the page or component is unloaded. */
                animationFrame = window.requestAnimationFrame(animate);
            };

            /* Start the animation only when no frame loop is already active;
               reset the timestamp so the first new frame starts smoothly. */
            const start = () => {
                if (motionPreference.matches) {
                    setReducedMotionLayout(true);
                    return;
                }
                if (animationFrame !== null) return;
                previousTimestamp = 0;
                animationFrame = window.requestAnimationFrame(animate);
            };

            /* Apply preference changes immediately, including changes made
               while the page remains open in the browser. */
            const handleMotionPreferenceChange = (event) => {
                if (event.matches) {
                    if (animationFrame !== null) {
                        window.cancelAnimationFrame(animationFrame);
                    }
                    animationFrame = null;
                    setReducedMotionLayout(true);
                    return;
                }

                setReducedMotionLayout(false);
                measure();
                start();
            };

            if (typeof motionPreference.addEventListener === "function") {
                motionPreference.addEventListener("change", handleMotionPreferenceChange);
            } else if (typeof motionPreference.addListener === "function") {
                motionPreference.addListener(handleMotionPreferenceChange);
            }

            /* Prefer ResizeObserver so changes to the viewport or original
               content group trigger a fresh cycle measurement automatically. */
            if ("ResizeObserver" in window) {
                /* Create an observer that recalculates the track distance when
                   responsive layout changes alter either observed element. */
                const resizeObserver = new ResizeObserver(measure);

                /* Observe the visible viewport because its dimensions can change
                   when the browser window or device orientation changes. */
                resizeObserver.observe(viewport);

                /* Observe the original group because text, fonts or images can
                   change its rendered width after initial page loading. */
                resizeObserver.observe(originalGroup);
            } else {
                /* Use the browser resize event as a compatibility fallback on
                   browsers that do not implement ResizeObserver. */
                window.addEventListener("resize", measure);
            }

            /* Wait for the document's web fonts when the Font Loading API exists;
               measuring after fonts load prevents incorrect text-width estimates. */
            if (document.fonts?.ready) {
                document.fonts.ready.then(measure);
            }

            /* Defer the first measurement until the browser can complete layout,
               then start the continuous animation with the measured distance. */
            window.requestAnimationFrame(() => {
                measure();
                start();
            });
        });
    };

    /* If the HTML is still loading, wait until the DOM is ready before querying
       for marquee elements; the once option prevents repeated initialisation. */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialiseMarquees, {
            /* Remove this listener after the first DOMContentLoaded event so
               the marquee initialisation routine cannot run more than once. */
            once: true
        });
    } else {
        /* Initialise immediately when this script is loaded after the DOM
           has already been parsed and its marquee elements are available. */
        initialiseMarquees();
    }
})();
