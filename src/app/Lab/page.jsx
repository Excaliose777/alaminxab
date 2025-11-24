"use client";
import "./lab.scss";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const Images = [
  "/images/VoyageHermes/hires-moebius-voyagehermes-1.webp",
  "/images/VoyageHermes/hires-moebius-voyagehermes-5.webp",
  "/images/VoyageHermes/hires-moebius-voyagehermes-7.webp",
  "/images/VoyageHermes/hires-moebius-voyagehermes-1.webp",
  "/images/VoyageHermes/hires-moebius-voyagehermes-5.webp",
  "/images/VoyageHermes/hires-moebius-voyagehermes-7.webp",
];
const page = () => {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const pinHeightRef = useRef(null);
  const circlesRef = useRef([]);
  useGSAP(() => {
    const root = rootRef.current;
    const container = containerRef.current;
    const pinHeight = pinHeightRef.current;
    const circles = circlesRef.current;

    // gsap.to(".scroll", {
    //   autoAlpha: 0,
    //   duration: 0.2,
    //   scrollTrigger: {
    //     trigger: ".lab__container",
    //     start: "top top",
    //     end: "top top-=1",
    //     toggleActions: "play none reverse none",
    //   },
    // });

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
    <>
      <div className="lab__container scroll">
        <h1>Lab</h1>
        <p>Scroll To View&#8623;</p>
      </div>
      <section className="lab" ref={rootRef}>
        <div className="pin-height" ref={pinHeightRef}>
          <div className="container" ref={containerRef}>
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
    </>
  );
};

export default page;
