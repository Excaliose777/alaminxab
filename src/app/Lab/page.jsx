"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import "./lab.scss";

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
    image: "/images/Lab/Crossy.png",
    title: "Blender + ThreeJs",
    link: "https://crossy-exp.vercel.app",
  },
  {
    image: "/images/Lab/Room.png",
    title: "Blender + ThreeJs Pt2",
    link: "https://blender-room-delta.vercel.app/",
  },
];

export default function Lab() {
  const [activeIndex, setActiveIndex] = useState(null);
  const pageRef = useRef(null);
  const containerRefs = useRef([]);

  // Show the title of the visible project closest to the viewport centre.
  // Measured at most once per frame, and the listener is attached only once.
  useEffect(() => {
    let frame = null;

    const measure = () => {
      frame = null;
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      let closestIndex = null;
      let minDistance = Infinity;

      containerRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewportHeight) return;

        const distance = Math.abs(viewportCenter - (rect.top + rect.height / 2));
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useGSAP(
    () => {
      gsap.utils.toArray(".list-container").forEach((container) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          })
          .fromTo(container, { scale: 0.5 }, { scale: 2, ease: "none" })
          .to(container, { scale: 0.5, ease: "none" });
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      <div className="lab__container scroll">
        <h1>Lab</h1>
        <p>Scroll To View&#8623;</p>
      </div>
      <main className="main-container">
        {LabData.map((project, index) => (
          <div
            key={project.link}
            ref={(el) => {
              containerRefs.current[index] = el;
            }}
            className="list-container"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="image-container"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1000px) 100vw, 30vw"
                className="image-style"
              />
              <span className="link-style">View&#8623;</span>
            </a>
          </div>
        ))}

        <div className="title-container">
          <div className="title-text">
            <span>{LabData[activeIndex]?.title}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
