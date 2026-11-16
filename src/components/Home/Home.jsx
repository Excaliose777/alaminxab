"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIntroDone } from "@/utils/ClientWrapper/IntroContext";
import "./Home.scss";

const Home = () => {
  const heroRef = useRef(null);
  const introDone = useIntroDone();

  useGSAP(
    () => {
      // Wait for the preloader so the intro isn't played behind it.
      if (!introDone) return;

      gsap.set(".hero__imageOverlay", {
        transformOrigin: "bottom center",
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
      });
      gsap.set(".image", { scale: 1.5 });
      gsap.set(".hero__image", {
        opacity: 0,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      });

      gsap
        .timeline({ delay: 0.3 })
        .from(".hero__titleText", {
          y: "-50vh",
          duration: 2,
          ease: "power3.inOut",
        })
        .to(
          ".hero__image",
          {
            opacity: 1,
            duration: 1.2,
            clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
            ease: "power3.inOut",
          },
          "<"
        )
        .to(
          ".hero__imageOverlay",
          {
            scaleY: 0,
            duration: 2,
            ease: "power3.inOut",
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          },
          "<"
        )
        .to(".image", { scale: 1.1, duration: 2, ease: "power3.inOut" }, "<")
        .from(
          ".textTest",
          { opacity: 0, duration: 1.5, ease: "power3.inOut" },
          "-=0.5"
        );
    },
    { dependencies: [introDone], scope: heroRef }
  );

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__imageCover">
        <div className="hero__image">
          <div className="hero__imageOverlay"></div>
          <div className="textTest">One day at a time</div>
          <Image
            fill
            priority
            sizes="(max-width: 1000px) 100vw, 45vw"
            className="image"
            style={{ filter: "grayscale(100%)" }}
            src="/images/HOPH3867.JPG"
            alt="Portrait of Al'amin Abubakar"
          />
        </div>
      </div>

      <div className="hero__title">
        <div className="hero__titleText">
          <p>AL&apos;AMIN ABUBAKAR</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
