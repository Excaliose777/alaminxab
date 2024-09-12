import "./Footer.scss";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Footer = () => {
  const footerRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "start 50%",
        end: "bottom bottom",
        toggleActions: "play play resume reverse",
        // markers:true,
        // scrub:0.5
      },
    });

    tl.from(".title", {
      y: "100%",
      duration: 2,
      // opacity:0,
    });
  }, []);

  return (
    <div className="footer" id="footer" ref={footerRef}>
      <div className="footer__wrapper">
        <div className="footer__title">
          <p className="title">ALAMIN ABUBAKAR</p>
        </div>

        {/* <div className='footer__image'>
          <div className='footer__photo'>
          <img style={{filter:'grayscale(100%)'}} src='/public/images/HOPH3880.JPG'/>
          </div>
          <p>One day at a time</p>
        </div> */}

        <div className="footer__bottom">
          <div>
            <span>Copyright: </span>
            <span>All Rights Reserved ©2024</span>
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
    </div>
  );
};

export default Footer;
