"use client";
import "./seven.scss";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Images = [
  "/images/Works/Engravelle.png",
  "/images/Works/KateLovejoy.png",
  "/images/Works/Nimbus.png",
  "/images/Works/TheVCollective.png",
  "/images/Works/Engravelle.png",
  "/images/Works/KateLovejoy.png",
  "/images/Works/Nimbus.png",
  "/images/Works/TheVCollective.png",
];
const page = () => {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const pinHeightRef = useRef(null);
  const circlesRef = useRef([]);
  useEffect(() => {
    const root = rootRef.current;
    const container = containerRef.current;
    const pinHeight = pinHeightRef.current;
    const circles = circlesRef.current;

    gsap.to(".scroll", {
      autoAlpha: 0,
      duration: 0.2,
      scrollTrigger: {
        trigger: ".mwg_effect007",
        start: "top top",
        end: "top top-=1",
        toggleActions: "play none reverse none",
      },
    });

    ScrollTrigger.create({
      trigger: pinHeight, // Listening to pin-height
      start: "top top",
      end: "bottom bottom",
      pin: container, // The pinned section
    });

    gsap.fromTo(
      circles,
      {
        rotation: 30, // Starting angle
      },
      {
        rotation: -30, // Ending angle
        ease: "power2.inOut", // Non-linear movement
        stagger: 0.06, // Delay between the start of each circle
        scrollTrigger: {
          trigger: pinHeight, // Listening to pinHeight
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Animation progresses with scrolling
        },
      }
    );
  }, []);
  return (
    <section className="mwg_effect007" ref={rootRef}>
      <p className="scroll">Scroll</p>
      <div className="pin-height" ref={pinHeightRef}>
        <div className="container" ref={containerRef}>
          <p className="header">Discover our favorite dishes of the week</p>
          {Images.map((image, index) => (
            <div
              className="circle"
              key={index}
              ref={(el) => (circlesRef.current[index] = el)}
            >
              <img className="media" src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
