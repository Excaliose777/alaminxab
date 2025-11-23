import "./Technology.scss";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const data = [
  "Javascript",
  "ReactJs",
  "NextJs",
  "VueJs",
  "ThreeJs",
  "React-Three-Fiber",
  "NodeJs",
  "MongoDB",
  "GSAP",
  "React-Three-Drei",
  "Framer-Motion",
  "SASS",
  "Axios",
  "Redux",
  "Solidity",
  "Blockchain",
  "and more...",
];

const Technology = () => {
  const techRef = useRef();
  const itemsRef = useRef();

  // useGSAP(() => {
  //   const container = techRef.current;
  //   const items = gsap.utils.toArray(container.children)
  //   const containerRect = container.getBoundingClientRect()

  //   const viewportWidth = window.innerWidth;
  //   const viewportHeight = window.innerHeight;
  //   console.log(containerRect)

  //   // console.log(items)
  //   items.forEach(item => {
  //     const itemRect = item.getBoundingClientRect()

  //     const xRange = viewportWidth- itemRect.width;
  //     const yRange = viewportHeight - itemRect.height;

  //     gsap.set(item, {
  //       position:'absolute',
  //       x: gsap.utils.random(0, xRange),
  //       y: gsap.utils.random(0, yRange),

  //     })
  //   })

  //   // items.forEach(item => {
  //   //   gsap.fromTo(item, {
  //   //     opacity:0
  //   //   }, {
  //   //     opacity:1,
  //   //       scrollTrigger:{
  //   //         trigger: techRef.current,
  //   //         start: 'top 50%',
  //   //         end: 'bottom bottom',
  //   //         scrub: 1,
  //   //       }
  //   //   })
  //   // })

  //   // const handleResize = () => {
  //   //   const viewportWidth = window.innerWidth;
  //   //   const viewportHeight = window.innerHeight;

  //   //   items.forEach(item => {
  //   //     const itemRect = item.getBoundingClientRect();
  //   //     const xRange = viewportWidth - itemRect.width;
  //   //     const yRange = viewportHeight - itemRect.height;

  //   //     gsap.set(item, {
  //   //       position:'absolute',
  //   //       x: gsap.utils.random(0, xRange),
  //   //       y: gsap.utils.random(0, yRange),
  //   //     });
  //   //   });
  //   // };

  //   // handleResize()

  //   // window.addEventListener('resize', handleResize);

  //   // return () => {
  //   //   window.removeEventListener('resize', handleResize);
  //   // };
  // },[])

  useGSAP(() => {
    const container = itemsRef.current;
    const items = gsap.utils.toArray(container.children);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: techRef.current,
        start: "start 50%",
        end: "bottom bottom",
        toggleActions: "play play resume reverse",
        // markers:true,
        // pin:true,
        scrub: 0.2,
      },
    });

    items.forEach((item) => {
      tl.fromTo(
        item,
        {
          opacity: 0,
          scale: 0,
        },
        {
          opacity: 1,
          color: "white",
          duration: 0.2,
          scale: 1,
          stagger: 1,
        }
      );
    });
  }, []);

  return (
    <div className="technology" id="technology" ref={techRef}>
      <div className="technology__header">
        Main Tech\Tools Used &#8600;
        <div className="bar"></div>
      </div>
      <div className="technology__wrapper" ref={itemsRef}>
        {data.map((tech, i) => (
          <div className="technology__items" key={i}>
            {tech}
          </div>
        ))}
      </div>
      <div>...if necessary.</div>
    </div>
  );
};

export default Technology;
