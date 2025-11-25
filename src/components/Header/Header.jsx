"use client";
import "./Header.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TimeDisplay from "../../utils/Time/TimeDisplay";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP);

const Header = ({ menuOpen, setMenuOpen }) => {
  // const [openMenu, setOpenMenu] = useState(false)
  const pathname = usePathname();
  // const isWorkPage = pathname === "/Works";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".header__logoText", {
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
        {
          y: 40,
          duration: 1.5,
          opacity: 0,
          ease: "power3.inOut",
        },
        "-=0.5"
      );
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(".header__logoText, .header__title, .header__location", {
        delay: 0.25,
        opacity: 0,
      });
    } else {
      gsap.to(".header__logoText, .header__title, .header__location, .header", {
        delay: 0.25,
        opacity: 1,
      });
    }
  }, [menuOpen]);

  return (
    <div className={`header ${/* isWorkPage ? "header--black" : "" */ ""}`}>
      <div className="header__logo">
        <Link
          href="/"
          className="header__logoText"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          ALAMINXAB
        </Link>
        <div className="bar"></div>
      </div>
      <div className="header__title">
        <p className="topText">Frontend Web Developer</p>
        <p className="bottomText">
          {" "}
          Specialized in Creative Web Development and experience
        </p>
      </div>
      <div className="header__location">
        <p className="topText">GMT(+1)</p>

        <p className="bottomText">
          [<TimeDisplay timezone="Africa/Lagos" />]
        </p>
      </div>
      <div className="button topText" onClick={() => toggleMenu()}>
        <div className={`header__nav ${menuOpen ? "burgerActive" : " "}`}></div>
      </div>
    </div>
  );
};

export default Header;
