"use client";
import "./Home.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const Home = () => {
  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 1.0 });

      // Set correct baselines (no conflict with CSS)
      gsap.set(".hero", { transformOrigin: "bottom center" });
      gsap.set(".hero__imageOverlay", {
        transformOrigin: "bottom center",
        clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
      });

      gsap.set(".image", { scale: 1.5 });

      gsap.set(".hero__image", {
        opacity: 0,
        // scale: 0,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      });

      tl.from(".hero__titleText", {
        y: "-50vh",
        duration: 2,
        ease: "power3.inOut",
      })
        .to(".hero__image", {
          opacity: 1,
          duration: 1.2,
          // scale: 1,
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
          ease: "power3.inOut",
        })
        .to(
          ".hero__imageOverlay",
          {
            scaleY: 0,
            duration: 2,
            ease: "power3.inOut",
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          },
          "-=0.8"
        )
        .to(
          ".image",
          {
            scale: 1.1,
            duration: 2,
            ease: "power3.inOut",
          },
          "<"
        );
    },
    { dependencies: [] }
  );

  return (
    <div className="hero" id="home">
      <div className="hero__imageCover">
        <div className="hero__image">
          <div className="hero__imageOverlay"></div>
          <div className="textTest">One day at a time</div>
          <Image
            fill
            className="image"
            style={{ filter: "grayscale(100%)" }}
            src="/images/HOPH3867.JPG"
            alt=""
          />
        </div>
      </div>

      <div className="hero__title">
        <div className="hero__titleText">
          <p>AL&apos;AMIN ABUBAKAR</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
