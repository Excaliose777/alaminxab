"use client";
import React, { useEffect, useRef, useState } from "react";
import "./works.scss";
import { Slideshow } from "./slideshow";
import Image from "next/image";

const slidesData = [
  {
    image: "/images/Works/KateLovejoy.png",
    mobile: "/images/Works/KateLovejoy-Mobile.png",
    title: "Kate Lovejoy Interiors",
    description:
      "A modern interior design experience built with a WordPress CMS, ReactJS frontend, and elegant GSAP motion.",
    tags: ["Elementor", "Wordpress", "ReactJs", "GSAP"],
    link: "https://katelovejoy.com/",
    linkLabel: "Visit Site",
  },
  {
    image: "/images/Works/Nimbus.png",
    mobile: "/images/Works/Nimbus-Mobile.png",
    title: "Nimbus Keyboards",
    description:
      "A dynamic keyboard showcase powered by Prismic CMS, React, GSAP animations, and immersive Three.js visuals.",
    tags: ["ScrollTrigger", "Lenis", "Three.js", "React Three Fiber", "GSAP"],
    link: "https://threejs-nimbus-keyboard.vercel.app/",
    linkLabel: "Visit Site",
  },
  {
    image: "/images/Works/Engravelle.png",
    mobile: "/images/Works/Engravelle-Mobile.png",
    title: "Engravelle",
    description:
      "A clean, responsive WordPress + Elementor build designed to highlight the precision of laser engraving craftsmanship.",
    tags: ["Wordpress", "Elementor"],
    link: "https://engravelle.com/",
    linkLabel: "Visit Site",
  },
  {
    image: "/images/Works/TheVCollective.png",
    mobile: "/images/Works/TheVCollective-Mobile.png",
    title: "The V-Collective",
    description:
      "A high-end interior design collective experience using a headless WordPress backend, a ReactJS interface, and elegant GSAP transitions.",
    tags: ["Wordpress", "ReactJs", "GSAP", "Smooth Scrolling"],
    link: "https://thevcollective.com/",
    linkLabel: "Visit Site",
  },
];

const Page = () => {
  const slidesRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const slideshowRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 900 : false
  );
  useEffect(() => {
    if (!slidesRef.current) return;

    // Initialize slideshow
    const slideshow = new Slideshow(slidesRef.current);
    slideshowRef.current = slideshow;

    // Set up navigation button event listeners
    const prevButton = prevButtonRef.current;
    const nextButton = nextButtonRef.current;

    const handlePrev = () => slideshow.prev();
    const handleNext = () => slideshow.next();

    if (prevButton) {
      prevButton.addEventListener("click", handlePrev);
    }
    if (nextButton) {
      nextButton.addEventListener("click", handleNext);
    }

    // Initialize wheel and touch event listeners for navigation
    const slidesContainer = slidesRef.current;
    let lastWheelTime = 0;

    const wheelHandler = (e) => {
      const now = Date.now();
      if (now - lastWheelTime < 100) return; // Throttle
      lastWheelTime = now;

      // Invert: scroll down = next, scroll up = prev
      if (e.deltaY > 0) {
        slideshow.next();
      } else {
        slideshow.prev();
      }
    };

    let touchStartY = 0;
    const touchStartHandler = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const touchEndHandler = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        // Swipe down = next, swipe up = prev
        if (diff > 0) {
          slideshow.next();
        } else {
          slideshow.prev();
        }
      }
    };

    // Add event listeners to the slides container
    if (slidesContainer) {
      slidesContainer.addEventListener("wheel", wheelHandler, {
        passive: true,
      });
      slidesContainer.addEventListener("touchstart", touchStartHandler, {
        passive: true,
      });
      slidesContainer.addEventListener("touchend", touchEndHandler, {
        passive: true,
      });
    }

    // Store cleanup function
    const cleanupEvents = () => {
      if (slidesContainer) {
        slidesContainer.removeEventListener("wheel", wheelHandler);
        slidesContainer.removeEventListener("touchstart", touchStartHandler);
        slidesContainer.removeEventListener("touchend", touchEndHandler);
      }
    };

    // Cleanup
    return () => {
      if (prevButton) {
        prevButton.removeEventListener("click", handlePrev);
      }
      if (nextButton) {
        nextButton.removeEventListener("click", handleNext);
      }
      cleanupEvents();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className="frame">
        <nav className="slides-nav">
          <button
            ref={prevButtonRef}
            className="slides-nav__item slides-nav__item--prev"
          >
            &larr;
          </button>
          <button
            ref={nextButtonRef}
            className="slides-nav__item slides-nav__item--next"
          >
            &rarr;
          </button>
        </nav>
      </div>
      <div className="slides" ref={slidesRef}>
        {slidesData.map((slide, index) => (
          <div
            className={`slide${index === 0 ? " slide--current" : ""}`}
            key={index}
          >
            <Image
              fill
              className="slide__img"
              src={isMobile ? slide.mobile : slide.image}
              alt={slide.title}
            />
            <div className="slide__overlay">
              <h1 className="slide__title">{slide.title}</h1>
              <p className="slide__description">{slide.description}</p>
              {slide.tags?.length ? (
                <div className="slide__tags">
                  {slide.tags.map((tag) => (
                    <span className="slide__tag" key={tag}>
                      {tag},
                    </span>
                  ))}
                </div>
              ) : null}
              <a
                className="slide__cta"
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {slide.linkLabel}
              </a>
            </div>
          </div>
        ))}
        <div className="deco"></div>
      </div>
    </div>
  );
};

export default Page;
