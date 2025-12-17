"use client";

import {
  useState,
  useLayoutEffect,
  ViewTransition,
  useRef,
  startTransition,
} from "react";
import { gsap } from "gsap";
import "./ClientWrapper.scss";
import Header from "@/components/Header/Header";
import Menu from "@/components/Menu/Menu";
import Preloader from "@/components/Preloader/Preloader";
import { TransitionRouter } from "next-transition-router";

export default function ClientWrapper({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState(null);
  const firstLayer = useRef(null);
  const secondLayer = useRef(null);

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
      {/* <ViewTransition
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
      > */}
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <TransitionRouter
        auto={true}
        leave={(next) => {
          const tl = gsap
            .timeline({
              onComplete: next,
            })
            .fromTo(
              firstLayer.current,
              { clipPath: "polygon(0% 100%, 0% 100%, 100% 100%, 100% 100%)" },
              {
                clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)",
                duration: 1,
                ease: "circ.inOut",
              }
            )
            .fromTo(
              secondLayer.current,

              { clipPath: "polygon(0% 100%, 0% 100%, 100% 100%, 100% 100%)" },

              {
                clipPath: "polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)",
                duration: 1,
                ease: "circ.inOut",
              },
              "<50%"
            );

          return () => {
            tl.kill();
          };
        }}
        enter={(next) => {
          const tl = gsap
            .timeline()
            .fromTo(
              secondLayer.current,
              { clipPath: "polygon(0% 100%, 0 0, 100% 0, 100% 100%)" },
              {
                clipPath: "polygon(0% 0%, 0 0, 100% 0, 100% 0%)",
                duration: 0.8,
                ease: "circ.inOut",
              }
            )
            .fromTo(
              firstLayer.current,
              { clipPath: "polygon(0% 100%, 0 0, 100% 0, 100% 100%)" },
              {
                clipPath: "polygon(0% 0%, 0 0, 100% 0, 100% 0%)",
                duration: 0.8,
                ease: "circ.inOut",
              },
              "<50%"
            )
            .call(
              () => {
                // Defer React updates to prevent jank during animation
                requestAnimationFrame(() => {
                  startTransition(next);
                });
              },
              undefined,
              "<50%"
            );

          return () => {
            tl.kill();
          };
        }}
      >
        {children}
        <div ref={firstLayer} className="first-layer" />
        <div ref={secondLayer} className="second-layer">
          <h1>AXAB</h1>
        </div>
      </TransitionRouter>
      {/* </ViewTransition> */}
    </>
  );
}
