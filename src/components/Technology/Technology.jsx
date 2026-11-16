"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import "./Technology.scss";

const data = [
  "Javascript",
  "ReactJs",
  "NextJs",
  "VueJs",
  "ThreeJs",
  "React-Three-Fiber",
  "NodeJs",
  "MongoDB",
  "GSAP",
  "React-Three-Drei",
  "Framer-Motion",
  "SASS",
  "Axios",
  "Redux",
  "Solidity",
  "Blockchain",
  "and more...",
];

const Technology = () => {
  const techRef = useRef(null);

  useGSAP(
    () => {
      // One staggered tween instead of one tween per item; same sequence.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: techRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 0.2,
          },
        })
        .fromTo(
          ".technology__items",
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, color: "white", duration: 0.2, stagger: 0.2 }
        );
    },
    { scope: techRef }
  );

  return (
    <section className="technology" id="technology" ref={techRef}>
      <div className="technology__header">
        Main Tech\Tools Used &#8600;
        <div className="bar"></div>
      </div>
      <div className="technology__wrapper">
        {data.map((tech) => (
          <div className="technology__items" key={tech}>
            {tech}
          </div>
        ))}
      </div>
      <div>...if necessary.</div>
    </section>
  );
};

export default Technology;
