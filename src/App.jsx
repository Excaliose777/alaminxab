import "./App.css";

import { useLayoutEffect, useState } from "react";
// import Lenis from 'lenis'
import { gsap } from "gsap";

import Header from "./components/Header/Header";
import Preloader from "./components/Preloader/Preloader";
import ImageBG from "./components/ImageBG/Index";

import Cursor from "./utils/Cursor/Cursor";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import Experience from "./pages/Experience/Experience";
import Technology from "./pages/Technology/Technology";
import Contact from "./pages/Contact/Contact";
import Footer from "./pages/Footer/Footer";
import Menu from "./components/Menu/Menu";

// const Header = lazy(() => import('./components/Header/Header'));
// const Preloader = lazy(() => import('./components/Preloader/Preloader'));
// const ImageBG = lazy(() => import('./components/ImageBG/Index'));
// const Home = lazy(() => import('./pages/Home/Home'));
// const About = lazy(() => import('./pages/About/About'));
// const Services = lazy(() => import('./pages/Services/Services'));
// const Experience = lazy(() => import('./pages/Experience/Experience'));
// const Technology = lazy(() => import('./pages/Technology/Technology'));
// const Contact = lazy(() => import('./pages/Contact/Contact'));
// const Footer = lazy(() => import('./pages/Footer/Footer'));
// const Menu = lazy(() => import('./components/Menu/Menu'));

// import useGSAPTimeline from './utils/Hooks/useGsap'
import useLenis from "./utils/Hooks/useLenis";
import Canvas from "./Canvas/Canvas3D";

function App() {
  // const {timeline, loading} = useGSAPTimeline()
  useLenis();
  const [menuOpen, setMenuOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });

      setTimeline(tl);
    });

    return () => context.revert();
  }, []);

  // useEffect(() => {
  //   const lenis = new Lenis()
  //   function raf(time){
  //     lenis.raf(time)
  //     requestAnimationFrame(raf)
  //   }
  //   requestAnimationFrame(raf)
  // },[])

  return (
    <>
      {loading ? (
        <Preloader timeline={timeline} />
      ) : (
        <div className="main">
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          {/* <Cursor/> */}
          <Canvas />
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
      )}
    </>
  );
}

export default App;
