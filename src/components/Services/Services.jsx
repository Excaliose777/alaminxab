"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import "./Services.scss";

const data = [
  { service: "3D", detail: "Integrating 3D elements and Design to code" },
  {
    service: "UI/UX Integration",
    detail: "Converting Figma designs to Frontend code",
  },
  {
    service: "API Development",
    detail: "Integrating and Developing API using NodeJs",
  },
  {
    service: "Creative Design and Development",
    detail: "Interactive user focused websites",
  },
  { service: "Front End Engineering", detail: "And More" },
];

const Services = () => {
  const servicesRef = useRef(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 50%",
            end: "bottom bottom",
            toggleActions: "play play resume reverse",
          },
        })
        .from(".bigText", { yPercent: 100, duration: 1.5, stagger: 0.5 })
        .to(
          ".serviceBar",
          { scaleX: 1, duration: 1.5, stagger: 0.5, ease: "power3.inOut" },
          "<"
        );
    },
    { scope: servicesRef }
  );

  return (
    <section className="services" id="services" ref={servicesRef}>
      <div className="services__header">
        <div>Need Help With?&#8623;:</div>
        <div className="bar"></div>
      </div>

      <div className="services__box">
        {data.map((service) => (
          <div className="services__service" key={service.service}>
            <p className="bigText">{service.service}</p>
            <p className="smallText">{service.detail}</p>
            <div className="serviceBar"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
