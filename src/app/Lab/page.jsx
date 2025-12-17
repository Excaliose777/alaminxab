"use client";
import "./lab.scss";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

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

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const titleRef = useRef(null);
  const containerRefs = useRef([]);

  useEffect(() => {
    // const handleScroll = () => {
    //   const viewportCenter = window.innerHeight / 2;
    //   let closestIndex = 0;
    //   let minDistance = Infinity;

    //   containerRefs.current.forEach((ref, index) => {
    //     if (ref) {
    //       const rect = ref.getBoundingClientRect();
    //       const elementCenter = rect.top + rect.height / 2;
    //       const distance = Math.abs(viewportCenter - elementCenter);
    //       if (distance < minDistance) {
    //         minDistance = distance;
    //         closestIndex = index;
    //       }
    //     }
    //   });

    //   setActiveIndex(closestIndex);
    // };

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = null;
      let minDistance = Infinity;

      containerRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();

        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elementCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // useGSAP(() => {
  //   if (activeIndex === null || !titleRef.current) return;

  //   gsap.fromTo(
  //     titleRef.current,
  //     { opacity: 0, y: 20 },
  //     { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
  //   );
  // }, [activeIndex]);

  useGSAP(() => {
    gsap.utils.toArray(".list-container").forEach((container) => {
      const scaleTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      scaleTl
        .fromTo(container, { scale: 0.5 }, { scale: 2, ease: "none" })
        .to(container, { scale: 0.5, ease: "none" });
    });
  });

  return (
    <>
      <div className="lab__container scroll">
        <h1>Lab</h1>
        <p>Scroll To View&#8623;</p>
      </div>
      <main className="main-container">
        {LabData.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              containerRefs.current[index] = el;
            }}
            className="list-container"
          >
            {/* <div > */}
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
                className="image-style"
                // sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              />
              <span className="link-style">View&#8623;</span>
            </a>
            {/* </div> */}
          </div>
        ))}

        <div className="title-container">
          <div className="title-text">
            <span ref={titleRef}>{LabData[activeIndex]?.title}</span>
          </div>
        </div>
      </main>
    </>
  );
}
