"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import TimeDisplay from "@/utils/Time/TimeDisplay";
import "./Menu.scss";

const menuData = [
  { index: "01", name: "Home", href: "/" },
  { index: "02", name: "Works", href: "/Works" },
  { index: "03", name: "Lab", href: "/Lab" },
];

const linkData = [
  { name: "LinkedIn", link: "https://www.linkedin.com/in/alaminxab" },
  { name: "Email", link: "mailto:alaminxab@gmail.com" },
  { name: "GitHub", link: "https://www.github.com/excaliose777" },
  { name: "Twitter(X)", link: "https://www.x.com/alaminxab" },
];

const Menu = ({ menuOpen, setMenuOpen }) => {
  const menuRef = useRef(null);
  const tl = useRef(null);

  // Build the open animation once; opening/closing just plays it forwards or backwards.
  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(
          menuRef.current,
          { scale: 0, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 0.5 }
        )
        .fromTo(".menu__headerTop", { y: "200%" }, { y: "0%", duration: 0.5 })
        .fromTo(".menu__headerBottom", { y: "100%" }, { y: "0%", duration: 0.5 })
        .fromTo(
          ".index",
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.5, stagger: 0.2 },
          "<"
        )
        .fromTo(
          ".link",
          { y: "100%", opacity: 0 },
          { y: "0%", opacity: 1, duration: 0.5, stagger: 0.25 },
          "<"
        );
    },
    { scope: menuRef }
  );

  useGSAP(
    () => {
      if (!tl.current) return;
      if (menuOpen) tl.current.play();
      else tl.current.reverse();
    },
    { dependencies: [menuOpen], revertOnUpdate: false }
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="menu" ref={menuRef} aria-hidden={!menuOpen}>
      <div className="menu__container">
        <div className="menu__headerContainer">
          <div className="menu__header">
            <div className="menu__headerTop">AlaminxAb</div>
            <div className="menu__headerBottom">Frontend Developer</div>
          </div>
          <div className="menu__header">
            <div className="menu__headerTop">Location:</div>
            <div className="menu__headerBottom">
              Lagos, [<TimeDisplay />]
            </div>
          </div>
        </div>

        {menuData.map((menu) => (
          <div className="menu__menu" key={menu.href}>
            <Link
              className="index"
              onClick={closeMenu}
              href={menu.href}
              tabIndex={menuOpen ? 0 : -1}
            >
              <div>{menu.index}</div>
              <div>{menu.name}</div>
              <div>&#8623;</div>
            </Link>
            <div className="bar"></div>
          </div>
        ))}

        <div className="menu__links">
          {linkData.map((link) => (
            <div className="link" key={link.name}>
              <div>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {link.name}
                </a>
              </div>
              <div className="bar"></div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
