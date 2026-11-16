"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import "./Experience.scss";

const data = [
  {
    date: "Now",
    company: "[Pending...]",
    position: "Creative Frontend Developer",
  },
  { date: "2024", company: "Flutterwave", position: "Frontend Engineer" },
  { date: "2023", company: "Livingstone IT", position: "Blockchain Developer" },
  {
    date: "2022",
    company: "Encode/LearnWeb3",
    position: "Blockchain Dev || Student",
  },
];

const Experience = () => {
  const experienceRef = useRef(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 0.5,
          },
        })
        .fromTo(
          ".experience__experience",
          { color: "gray", opacity: 0, yPercent: 50 },
          { color: "white", opacity: 1, duration: 1, stagger: 1, yPercent: 0 }
        );
    },
    { scope: experienceRef }
  );

  return (
    <section className="experience" id="experience" ref={experienceRef}>
      <div className="experience__main">
        <div className="experience__header">
          History &#8623;
          <div className="bar"></div>
        </div>
        <div className="experience__experienceCover">
          {data.map((work) => (
            <div key={work.date} className="experience__experience">
              <div className="experience__date">{work.date}</div>
              <div style={{ textAlign: "right" }}>
                <div className="experience__company">{work.company}</div>
                <p style={{ color: "gray" }}>{work.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{ position: "absolute", bottom: 0, right: 0, fontSize: "1vw" }}
      >
        No Awwwards or Certificates just yet, but soon.
      </div>
    </section>
  );
};

export default Experience;
