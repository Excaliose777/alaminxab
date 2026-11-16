"use client";

import { useState, useRef, useEffect, startTransition } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { TransitionRouter } from "next-transition-router";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Header from "@/components/Header/Header";
import Menu from "@/components/Menu/Menu";
import Preloader from "@/components/Preloader/Preloader";
import { IntroContext } from "./IntroContext";
import "./ClientWrapper.scss";

const CLOSED = "polygon(0% 100%, 0% 100%, 100% 100%, 100% 100%)";
const COVERED = "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)";
const EXITED = "polygon(0% 0%, 0% 0%, 100% 0%, 100% 0%)";

// Lives inside <ReactLenis> so it receives the instance once Lenis has been created.
function LenisController({ locked }) {
  const lenis = useLenis();

  // Drive Lenis from GSAP's ticker: one RAF loop, and ScrollTrigger stays in sync.
  useEffect(() => {
    if (!lenis) return;
    const update = (time) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  // Lock scrolling while the preloader or menu is open.
  useEffect(() => {
    if (!lenis) return;
    if (locked) lenis.stop();
    else lenis.start();
  }, [lenis, locked]);

  return null;
}

export default function ClientWrapper({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [preloading, setPreloading] = useState(true);
  const [introDone, setIntroDone] = useState(false);
  const lenisRef = useRef(null);
  const firstLayer = useRef(null);
  const secondLayer = useRef(null);

  // Close the menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <ReactLenis root options={{ autoRaf: false }} ref={lenisRef}>
      <LenisController locked={preloading || menuOpen} />
      <IntroContext.Provider value={introDone}>
        {preloading && (
          <Preloader
            onReveal={() => setIntroDone(true)}
            onComplete={() => setPreloading(false)}
          />
        )}

        {introDone && (
          <>
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </>
        )}

        <TransitionRouter
          auto
          leave={(next) => {
            const tl = gsap
              .timeline({ onComplete: next })
              .fromTo(
                firstLayer.current,
                { clipPath: CLOSED },
                { clipPath: COVERED, duration: 1, ease: "circ.inOut" }
              )
              .fromTo(
                secondLayer.current,
                { clipPath: CLOSED },
                { clipPath: COVERED, duration: 1, ease: "circ.inOut" },
                "<50%"
              );

            return () => tl.kill();
          }}
          enter={(next) => {
            // New page is mounted under the cover: reset scroll and re-measure triggers.
            lenisRef.current?.lenis?.scrollTo(0, { immediate: true });
            ScrollTrigger.refresh();

            const tl = gsap
              .timeline()
              .fromTo(
                secondLayer.current,
                { clipPath: COVERED },
                { clipPath: EXITED, duration: 0.8, ease: "circ.inOut" }
              )
              .fromTo(
                firstLayer.current,
                { clipPath: COVERED },
                { clipPath: EXITED, duration: 0.8, ease: "circ.inOut" },
                "<50%"
              )
              .call(
                () => {
                  // Defer React updates to prevent jank during animation
                  requestAnimationFrame(() => startTransition(next));
                },
                undefined,
                "<50%"
              );

            return () => tl.kill();
          }}
        >
          {children}
          <div ref={firstLayer} className="first-layer" aria-hidden="true" />
          <div ref={secondLayer} className="second-layer" aria-hidden="true">
            <h1>AXAB</h1>
          </div>
        </TransitionRouter>
      </IntroContext.Provider>
    </ReactLenis>
  );
}
