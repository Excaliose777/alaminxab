"use client";
import "./lab.scss";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

// const Images = [
//   "/images/VoyageHermes/hires-moebius-voyagehermes-1.webp",
//   "/images/VoyageHermes/hires-moebius-voyagehermes-5.webp",
//   "/images/VoyageHermes/hires-moebius-voyagehermes-7.webp",
//   "/images/VoyageHermes/hires-moebius-voyagehermes-1.webp",
//   "/images/VoyageHermes/hires-moebius-voyagehermes-5.webp",
//   "/images/VoyageHermes/hires-moebius-voyagehermes-7.webp",
// ];

const LabData = [
  {
    image: "/images/Lab/Positional-Audio.png",
    title: "ThreeJs Positional Audio",
    link: "https://r3-f-positional-audio.vercel.app/",
  },
  {
    image: "/images/Lab/DepthMap.png",
    title: "Depth Map Viewer",
    link: "https://depth-map777.vercel.app/",
  },
  {
    image: "/images/Lab/CurvedImageCursor.png",
    title: "Curved Image Cursor",
    link: "https://curved-image-cursor.vercel.app/",
  },
  {
    image: "/images/VoyageHermes/hires-moebius-voyagehermes-1.webp",
    title: "Snow Flakes",
    link: "https://www.google.com",
  },
  {
    image: "/images/VoyageHermes/hires-moebius-voyagehermes-5.webp",
    title: "GSAP Flip",
    link: "https://www.google.com",
  },
  {
    image: "/images/VoyageHermes/hires-moebius-voyagehermes-7.webp",
    title: "Neon Waves",
    link: "https://www.google.com",
  },
];
const page = () => {
  const rootRef = useRef(null);
  const containerRef = useRef(null);
  const pinHeightRef = useRef(null);
  const circlesRef = useRef([]);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1000 : false
  );

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
        stagger: isMobile ? 0.1 : 0.04, // Delay between the start of each circle
        scrollTrigger: {
          trigger: pinHeight, // Listening to pinHeight
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Animation progresses with scrolling
        },
      }
    );
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
            {LabData.map((item, index) => (
              <div
                className="circle"
                key={index}
                ref={(el) => (circlesRef.current[index] = el)}
              >
                <div className="cards">
                  <div className="card">
                    <Image fill src={item.image} alt={item.title} />

                    <div className="card-content">
                      <p className="card-top">
                        <span>Lab</span> <span>{`[0${index + 1}]`}</span>
                      </p>

                      <div className="card-bottom">
                        <a
                          className="from"
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View&#8623;
                        </a>
                        <h2>{item.title}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
