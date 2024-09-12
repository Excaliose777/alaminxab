import "./Home.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const Home = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    // gsap.set('.hero', {
    //   scale:0
    // })
    gsap.set(".image", {
      scale: 1.5,
    });

    gsap.set(".hero__image", {
      opacity: 0,
      scale: 0,
    });
    tl.from(".hero", {
      y: "-100vh",
      // scale:1,
      duration: 2,
      // opacity:0,
      ease: "power3.inOut",
    })
      .from(".hero__titleText", {
        y: "-50vh",
        duration: 2,
        // opacity:0,
        ease: "power3.inOut",
      })
      .to(".hero__image", {
        opacity: 1,
        duration: 1,
        scale: 0.5,
      })
      .to(
        ".hero__imageOverlay",
        {
          scaleY: 0,
          duration: 1,
          ease: "power3.inOut",
        },
        "-=0.8"
      )
      .to(
        ".image",
        {
          scale: 1.1,
          duration: 2,
          ease: "power3.inOut",
        },
        "<"
      );
  });

  return (
    <>
      <div className="hero" id="home">
        <div className="hero__imageCover">
          <div className="hero__image">
            <div className="hero__imageOverlay"></div>
            <div className="textTest">One day at a time</div>
            <img
              className="image"
              style={{ filter: "grayscale(100%)" }}
              src="/images/HOPH3867.JPG"
            />
          </div>
        </div>
        <div className="hero__title">
          <div className="hero__titleText">
            <p>AL&apos;AMIN ABUBAKAR</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
