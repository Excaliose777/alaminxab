import "./ImageBG.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const ImageBG = ({ image }) => {
  // useGSAP(() => {
  //   gsap.to('.imageMain__container', {
  //     y:'-25%',
  //     ease:'none',
  //     scrollTrigger:{
  //       trigger:'.imageMain',
  //       start:'top 50%',
  //       end:'bottom 50%',
  //       scrub:true,
  //       // markers:true
  //     }
  //   })
  // },[])

  return (
    <div className="imageMain">
      <div
        className="imageMain__container"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </div>
  );
};

export default ImageBG;
