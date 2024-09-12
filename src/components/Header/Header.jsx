import "./Header.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import TimeDisplay from "../../utils/Time/TimeDisplay";
import { useEffect, useState } from "react";

gsap.registerPlugin(useGSAP);

const Header = ({ menuOpen, setMenuOpen }) => {
  // const [openMenu, setOpenMenu] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".header__logoText", {
      y: 40,
      duration: 1.5,
      opacity: 0,
      delay: 1.5,
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
      gsap.to(".header__logoText, .header__title, .header__location", {
        delay: 0.25,
        opacity: 1,
      });
    }
  }, [menuOpen]);

  // const currTime = new Date().toLocaleTimeString()
  return (
    <div className="header">
      <div className="header__logo">
        <p
          className="header__logoText"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ALAMINXAB
        </p>
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
        <p className="topText">Currently in Lagos</p>

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
