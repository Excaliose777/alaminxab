import './Experience.scss'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useRef } from 'react'
gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

const data = [ {
  date: 'Now',
  company: '[Pending...]',
  position: 'Creative Frontend Developer',
  work: 'Work Done'
}, {
  date: '2024',
  company: 'Flutterwave',
  position: 'Frontend Engineer',
  work: 'Work Done'
}, {
  date: '2023',
  company: 'Livingstone IT',
  position: 'Blockchain Developer',
  work: 'Work Done'
}, {
  date: '2022',
  company: 'Encode/LearnWeb3',
  position: 'Blockchain Dev || Student',
  work: 'Work Done'
}]


const Experience = () => {
  const experienceRef = useRef()
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:experienceRef.current,
        start:'start 50%',
        end: 'bottom bottom',
        toggleActions: 'play play resume reverse',
        // markers:true,
        scrub:0.5
      }
    })

    tl.fromTo('.experience__experience', {
      color:'gray',
      opacity:0,
      y:'50%'
    }, {
      color:'white',
      opacity:1,
      duration:1,
      stagger:1,
      y:0,
    })
  },[])
  
  return (
    <div className='experience' id='experience' ref={experienceRef}>
      <div className='experience__main'>
        <div className='experience__header'>
          History &#8623;
        <div className='bar'></div> 
        </div>
        <div className='experience__experienceCover' >

          {data.map((work, i) => (
            <div key={i} className='experience__experience'>
              <div className='experience__date'>{work.date}</div>
              <div style={{textAlign:'right'}}>
                <div className='experience__company'>{work.company}</div>
                <p style={{color:'gray'}}>{work.position}</p>
              </div>
              {/* <div>{work.work}</div> */}
          </div>
          ))}
        </div>
      </div>

      <div style={{position:'absolute', bottom:0, right:0,fontSize:'1vw'}}>No Awwwards or Certificates just yet, but soon.</div>
    </div>
  )
}

export default Experience