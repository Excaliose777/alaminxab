"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import "./Preloader.scss";

const Preloader = ({ onReveal, onComplete }) => {
  const rootRef = useRef(null);
  const percentageRef = useRef(null);

  useGSAP(
    () => {
      const counter = { value: 0 };

      // Don't open until the display font is ready, so text doesn't swap mid-animation.
      const fontsReady = document.fonts?.ready ?? Promise.resolve();

      const tl = gsap.timeline({ paused: true, onComplete });

      tl.to(".preloader__loadingBar", {
        scaleX: 1,
        duration: 1.8,
        ease: "power2.inOut",
      })
        .to(
          counter,
          {
            value: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              percentageRef.current.textContent = `${Math.round(counter.value)}%`;
            },
          },
          "<"
        )
        // Slide the halves apart with transforms instead of animating height (no layout per frame).
        .to(".preloader__topSection", {
          yPercent: -20,
          duration: 0.8,
          ease: "power3.inOut",
        })
        .to(
          ".preloader__bottomSection",
          { yPercent: 20, duration: 0.8, ease: "power3.inOut" },
          "<"
        )
        .to(".preloader__topSection", {
          yPercent: -100,
          duration: 1,
          ease: "power3.inOut",
        })
        .to(
          ".preloader__bottomSection",
          { yPercent: 100, duration: 1, ease: "power3.inOut" },
          "<"
        )
        .to(
          ".preloader__nameText",
          { y: "100%", duration: 0.8, ease: "power3.inOut" },
          "-=0.3"
        )
        // Let the page mount its intro animations under the overlay, then fade it out.
        .call(() => onReveal?.())
        .to(rootRef.current, { autoAlpha: 0, duration: 0.5, ease: "power2.out" });

      let cancelled = false;
      fontsReady.then(() => !cancelled && tl.play());

      return () => {
        cancelled = true;
      };
    },
    { scope: rootRef }
  );

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <section className="preloader__topSection">
        <h1 className="split-textTop">AlaminxAB</h1>
      </section>
      <section className="preloader__bottomSection">
        <h1 className="split-textBottom">AlaminxAB</h1>
        <h4 style={{ color: "white" }}>Loading</h4>
        <h2
          style={{ color: "white" }}
          className="preloader__percentage"
          ref={percentageRef}
        >
          0%
        </h2>
        <div className="preloader__loadingBar"></div>
      </section>
      <div className="preloader__name">
        <h3 className="preloader__nameText">ALAMINXAB</h3>
      </div>
    </div>
  );
};

export default Preloader;
