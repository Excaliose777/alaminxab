import Image from "next/image";
import "./ImageBG.scss";

// Full-screen "window" onto a fixed image. The fixed layer is clipped by its section,
// which gives the old background-attachment: fixed look without repainting on every scroll.
const ImageBG = ({ image, alt = "" }) => (
  <div className="imageMain">
    <div className="imageMain__container">
      <Image src={image} alt={alt} fill sizes="100vw" className="imageMain__image" />
    </div>
  </div>
);

export default ImageBG;
