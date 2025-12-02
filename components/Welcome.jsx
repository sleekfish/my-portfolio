// Welcome.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) =>
    [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
      {char === " " ? "\u00A0" : char}
    </span>
    ));

const setupTextHover = (container, type) => {
    if (!container) return () => {};

    // letters and weight bounds live in this closure
    const letters = Array.from(container.querySelectorAll("span"));
    const { min, max, default: base } = FONT_WEIGHTS[type];

    // animate one letter's weight using GSAP
    const animateLetter = (letter, weight, duration = 0.25) => {
        gsap.to(letter, {
            duration,
            ease: "power2.out",
            // use css to set fontVariationSettings
            css: { fontVariationSettings: `'wght' ${Math.round(weight)}` },
        });
    };

    // mousemove handler that uses letters, min, max (from closure)
    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            // letter center relative to container left
            const letterCenter = l - left + w / 2;
            const distance = Math.abs(mouseX - letterCenter);
            const intensity = Math.exp(-(distance ** 2) / 2000);
            const weight = min + (max - min) * intensity;
            animateLetter(letter, weight, 0.18);
        });
    };

    const handleMouseLeave = () => {
        letters.forEach((letter) => animateLetter(letter, base, 0.35));
    };

    // attach listeners
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // return cleanup function
    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        // attach hover behavior to both refs, keep cleanup functions
        const cleanupTitle = setupTextHover(titleRef.current, "title");
        const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");

        return () => {
            if (typeof cleanupTitle === "function") cleanupTitle();
            if (typeof cleanupSubtitle === "function") cleanupSubtitle();
        };
    }, []);

    return (
        <section id="welcome" style={{ padding: 40 }}>
            <p ref={subtitleRef}>
                {renderText(
                    "Hey I am Kunal !! Welcome to my",
                    "text-3xl font-georama",
                    FONT_WEIGHTS.subtitle.default
                )}
            </p>

            <h1 ref={titleRef} className="mt-7">
                {renderText(
                    "Portfolio",
                    "text-9xl italic font-georama",
                    FONT_WEIGHTS.title.default
                )}
            </h1>

            <div className="small-screen">
                <p>This portfolio is designed for desktops and tablet screens only</p>
            </div>
        </section>
    );
};

export default Welcome;
