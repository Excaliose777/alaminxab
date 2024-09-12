import './About.scss'
import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const aboutRef = useRef(null)
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:aboutRef.current,
        start: 'top 50%',
        end: 'bottom bottom',
        toggleActions: 'play play resume reverse',
        scrub:0.5,
        // snap:true
        // markers:true
      }
    })
    tl.from('.p', {
      y:'100%',
      stagger:.5,
      duration:1.5,
    }).from('.bottom-p', {
      y:'100%',
      stagger:.5,
      duration:1,
    })
  },[])


  return (
    <div className='about' id='about' ref={aboutRef}>
      <div className='about__topText'>
        <span><p className='p'>Hey, I&apos;m Alamin, a Frontend Developer currently based in Lagos,</p></span>
        <span> <p className='p'>with years of experience in building interactive experience across different mediums.</p></span>
        <span><p className='p'>Specialized in building websites with cutting edge technolgies</p></span>
        <span><p className='p'>in order to create a engaging visual experience for users.</p></span>
        <span><p className='p'>A keen eye for design and attention to detail.</p></span>

      </div>

      <div className='about__bottomText'>
        <span style={{fontWeight:'bold'}}> <p className='bottom-p'>Utilizing tools like Javascript, WebGL, Shaders and relevant tools to achieve this.</p></span>
        <span><p className='bottom-p'>Envision a web design where every choice enhances user experience.</p></span>
        <span><p className='bottom-p'>Currently looking to learn and connect on interesting projects.</p></span>
        <span><p className='bottom-p'>Working on relevant and impactful projects for users.</p></span>
        <span><p className='bottom-p'>Taking it one day at a time, one step at a time.</p></span>
        <span><p className='bottom-p'>Learning to live and Living to learn.</p></span>
        <span><p className='bottom-p'>Trying to make an impact.</p></span>
        <span><p className='bottom-p'>Always and forever.</p></span>
        <span><p className='bottom-p'>AlaminxAb.</p></span>
        <span><p className='bottom-p'>Regards.</p></span>
        <span><p className='bottom-p'>----</p></span>
      </div>
    </div>
  )
}

export default About