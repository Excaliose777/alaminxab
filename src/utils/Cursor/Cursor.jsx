import {useEffect} from 'react'
import './Cursor.scss'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP)


const Cursor = () => {

  const manageMouseMove = (e) => {
    gsap.set(".ball", { xPercent: -50, yPercent: -50 })
    
      gsap.to('.ball', {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY,
        ease: "power1.out",
        overwrite: "auto",
        stagger: 0.02,
      });
    
  }
  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove );

    return() => {
      window.removeEventListener('mousemove', manageMouseMove)
    }
  }, 
[]
);
  return (
    <div>
    <div className='ball'></div>
    </div>
  )
}

export default Cursor