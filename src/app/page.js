"use client";

import About from "@/components/About/About";
import Home from "@/components/Home/Home.jsx";
import ImageBG from "@/components/ImageBG/ImageBG";
import Services from "@/components/Services/Services";
import Experience from "@/components/Experience/Experience";
import Technology from "@/components/Technology/Technology";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

export default function Main() {
  return (
    <div>
      <Home />
      <About />
      <ImageBG
        image={"/images/VoyageHermes/hires-moebius-voyagehermes-5.webp"}
      />
      <Services />
      <Experience />
      <ImageBG
        image={"/images/VoyageHermes/hires-moebius-voyagehermes-7.webp"}
      />
      <Technology />
      <Contact />
      <Footer />
    </div>
  );
}
