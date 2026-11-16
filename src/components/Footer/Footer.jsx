"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import "./Footer.scss";

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 50%",
            end: "bottom bottom",
            toggleActions: "play play resume reverse",
          },
        })
        .from(".title", { yPercent: 100, duration: 1.25 });
    },
    { scope: footerRef }
  );

  return (
    <footer className="footer" id="footer" ref={footerRef}>
      <div className="footer__wrapper">
        <div className="footer__title">
          <p className="title">ALAMIN ABUBAKAR</p>
        </div>


        <div className="footer__bottom">
          <div>
            <span>Copyright: </span>
            <span>All Rights Reserved ©{new Date().getFullYear()}</span>
          </div>

          <div>
            <span>Design and Development by: </span>
            <span>AlaminxAb&trade;</span>
          </div>
          <div>
            <span>All art by: </span>
            <span>Moebius, Jean Giraud(1938 - 2012)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
