"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import "./About.scss";

const topLines = [
  "Hey, I'm Alamin, a Frontend Developer currently based in Lagos,",
  "with years of experience in building interactive experience across different mediums.",
  "Specialized in building websites with cutting edge technologies",
  "in order to create an engaging visual experience for users.",
  "A keen eye for design and attention to detail.",
];

const bottomLines = [
  "Utilizing tools like Javascript, WebGL, Shaders and relevant tools to achieve this.",
  "Envision a web design where every choice enhances user experience.",
  "Currently looking to learn and connect on interesting projects.",
  "Working on relevant and impactful projects for users.",
  "Taking it one day at a time, one step at a time.",
  "Learning to live and Living to learn.",
  "Trying to make an impact.",
  "Always and forever.",
  "AlaminxAb.",
  "Regards.",
  "----",
];

const About = () => {
  const aboutRef = useRef(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 0.5,
          },
        })
        .from(".p", { yPercent: 100, stagger: 0.5, duration: 1.5 })
        .from(".bottom-p", { yPercent: 100, stagger: 0.5, duration: 1 });
    },
    { scope: aboutRef }
  );

  return (
    <section className="about" id="about" ref={aboutRef}>
      <div className="about__topText">
        {topLines.map((line) => (
          <span key={line}>
            <p className="p">{line}</p>
          </span>
        ))}
      </div>

      <div className="about__bottomText">
        {bottomLines.map((line, i) => (
          <span key={line} style={i === 0 ? { fontWeight: "bold" } : undefined}>
            <p className="bottom-p">{line}</p>
          </span>
        ))}
      </div>
    </section>
  );
};

export default About;
