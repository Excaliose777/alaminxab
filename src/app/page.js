import Home from "@/components/Home/Home";
import About from "@/components/About/About";
import ImageBG from "@/components/ImageBG/ImageBG";
import Services from "@/components/Services/Services";
import Experience from "@/components/Experience/Experience";
import Technology from "@/components/Technology/Technology";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

// Server component: the sections are client islands, the page shell is rendered on the server.
export default function Main() {
  return (
    <main>
      <Home />
      <About />
      <ImageBG
        image="/images/VoyageHermes/hires-moebius-voyagehermes-5.webp"
        alt="Voyage Hermes artwork by Moebius"
      />
      <Services />
      <Experience />
      <ImageBG
        image="/images/VoyageHermes/hires-moebius-voyagehermes-7.webp"
        alt="Voyage Hermes artwork by Moebius"
      />
      <Technology />
      <Contact />
      <Footer />
    </main>
  );
}
