"use client";

import { useState, useLayoutEffect, ViewTransition } from "react";
import { gsap } from "gsap";

import Header from "@/components/Header/Header";
import Menu from "@/components/Menu/Menu";
import Preloader from "@/components/Preloader/Preloader";

export default function ClientWrapper({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });
      setTimeline(tl);
    });

    return () => context.revert();
  }, []);

  if (loading) return <Preloader timeline={timeline} />;

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <ViewTransition
        name="page"
        onUpdate={(instance) => {
          instance.old.animate(
            {
              transform: ["scale(1)", "scale(0)"],
              opacity: [1, 0],
            },
            { duration: 1000, easing: "ease-in-out" }
          );

          instance.new.animate(
            {
              transform: ["scale(0)", "scale(1)"],
              opacity: [0, 1],
            },
            { duration: 1000, easing: "ease-in-out" }
          );
        }}
      >
        {children}
      </ViewTransition>
    </>
  );
}
