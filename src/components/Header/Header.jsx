"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";
import TimeDisplay from "@/utils/Time/TimeDisplay";
import "./Header.scss";

const Header = ({ menuOpen, setMenuOpen }) => {
  const headerRef = useRef(null);
  const isFirstRun = useRef(true);
  const lenis = useLenis();

  // Intro
  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".header__logoText", {
          y: 40,
          duration: 1.5,
          opacity: 0,
          ease: "power3.inOut",
        })
        .from(".topText", {
          y: 40,
          duration: 1,
          opacity: 0,
          ease: "power3.inOut",
        })
        .from(
          ".bottomText",
          { y: 40, duration: 1.5, opacity: 0, ease: "power3.inOut" },
          "-=0.5"
        );
    },
    { scope: headerRef }
  );

  // Fade header content while the menu is open (skipped on mount so it doesn't fight the intro).
  useGSAP(
    () => {
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      gsap.to(".header__logoText, .header__title, .header__location", {
        delay: 0.25,
        opacity: menuOpen ? 0 : 1,
        overwrite: "auto",
      });
    },
    { dependencies: [menuOpen], scope: headerRef, revertOnUpdate: false }
  );

  return (
    <header className="header" ref={headerRef}>
      <div className="header__logo">
        <Link
          href="/"
          className="header__logoText"
          onClick={() => lenis?.scrollTo(0)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          ALAMINXAB
        </Link>
        <div className="bar"></div>
      </div>
      <div className="header__title">
        <p className="topText">Frontend Web Developer</p>
        <p className="bottomText">
          Specialized in Creative Web Development and experience
        </p>
      </div>
      <div className="header__location">
        <p className="topText">GMT(+1)</p>
        <p className="bottomText">
          [<TimeDisplay />]
        </p>
      </div>
      <button
        type="button"
        className="button topText"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <div className={`header__nav ${menuOpen ? "burgerActive" : ""}`}></div>
      </button>
    </header>
  );
};

export default Header;
