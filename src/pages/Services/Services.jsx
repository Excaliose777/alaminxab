import './Services.scss'
import {gsap} from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP)

const data = [{
  service:'3D',
  detail: 'Integrating 3D elements and Design to code'
},{
  service:'UI/UX Integration',
  detail: 'Converting Figma designs to Frontend code'
},{
  service:'API Development',
  detail: 'Integrating and Developing API using NodeJs'
},{
  service:'Creative Design and Development',
  detail: 'Interactive user focused websites'
},{
  service:'Front End Engineering',
  detail: 'And More'
},]
const Services = () => {

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger:{
        trigger:'.services',
        start:'top 50%',
        end:'bottom bottom',
        toggleActions: 'play play resume reverse',
        // markers:true
      }
    })

    tl.from('.bigText', {
      y:'100%',
      duration:1.5,
      stagger:0.5
    }).to('.serviceBar', {
      scaleX:1,
      duration:1.5,
      stagger:0.5,
      ease:'power3.inOut'
    }, "<")
  },[])

  return (
    <>
      <div className='services' id='services'>
        <div className='services__header'>
          <div >Need Help With?&#8623;:</div>
          <div className='bar'></div> 
        </div>

        <div className='services__box'>
          {data.map((service, i) => (
          <div className='services__service' key={i}>
            <p className='bigText'>{service.service}</p>
            <p className='smallText'>{service.detail}</p>
            <div className='serviceBar'></div>
          </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Services