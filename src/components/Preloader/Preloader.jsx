import "./Preloader.scss";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

import { useRef } from "react";
gsap.registerPlugin(useGSAP);

const Preloader = ({ timeline }) => {
  const percentageRef = useRef(null);

  const loading = () => {
    const tl = gsap.timeline();
    tl.to(".preloader__loadingBar", {
      scaleX: 1,
      duration: 5,
      delay: 1,
    }).to(
      percentageRef.current,
      {
        textContent: "100%",
        duration: 5,
        roundProps: "textContent",
      },
      "<"
    );

    return tl;
  };

  const open = () => {
    const tl = gsap.timeline({ paused: false });
    tl.to(".preloader__topSection, .preloader__bottomSection", {
      height: "40%",
      duration: 1.5,
      delay: 0.2,
      ease: "power3.inOut",
    })
      .to(".preloader__topSection, .preloader__bottomSection", {
        height: "0%",
        duration: 2,
        ease: "power3.inOut",
      })
      .to(".preloader__nameText", {
        y: 40,
        // opacity:0,
        duration: 2,
        ease: "power3.inOut",
      });

    // .to('.preloader__name', {
    //   xPercent: 50,
    //   yPercent: 50,
    //   x: -innerWidth / 2,
    //   y: -innerHeight / 2,
    //   duration:2,
    //   ease:'power3.inOut'
    // })

    return tl;
  };
  useGSAP(() => {
    timeline && timeline.add(loading()).add(open());
  }, [timeline]);

  return (
    <>
      <div className="preloader">
        <section className="preloader__topSection">
          <h1 className="split-textTop">AlaminxAB</h1>
        </section>
        <section className="preloader__bottomSection">
          <h1 className="split-textBottom">AlaminxAB</h1>
          <h4 style={{ color: "white" }}>Loading</h4>
          <h2
            style={{ color: "white" }}
            className="preloader__percentage"
            ref={percentageRef}
          >
            0
          </h2>
          <div className="preloader__loadingBar"></div>
        </section>
        <div className="preloader__name">
          <h3 className="preloader__nameText">ALAMINXAB</h3>
        </div>
      </div>
    </>
  );
};

export default Preloader;
