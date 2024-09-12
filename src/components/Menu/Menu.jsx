import './Menu.scss'
import TimeDisplay from '../../utils/Time/TimeDisplay'
import {gsap} from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
gsap.registerPlugin(useGSAP)

const menuData = [
  {
    index: '01',
    name:'Home',
    href:'home'
  },
  {
    index: '02',
    name:'About',
    href:'about'
  },
  {
    index: '03',
    name:'Services',
    href:'services'
  },
  {
    index: '04',
    name:'Experience',
    href:'experience'
  },
]
const linkData =[{
  name:'LinkedIn',
  link: 'https://www.linkedin.com/in/alaminxab',
},{
  name:'Email',
  link: 'mailto:alaminxab@gmail.com',
},{
  name:'GitHub',
  link: 'https://www.github.com/excaliose777',
},{
  name:'Twitter(X)',
  link: 'https://www.x.com/alaminxab',
}]

const Menu = ({menuOpen, setMenuOpen}) => {
  const menuRef = useRef(null)
  const tl = useRef(gsap.timeline({ paused: true })).current;

  // const tl = gsap.timeline()
  // tl.set('.menu', {scale:0})

  useEffect(() => {
    if(menuRef.current){
      tl.set('.menu', {scale:0, opacity:0})
      
      if(menuOpen){
        tl.clear()
        .set('.menu', {scale:0, opacity:0})
          .to('.menu', { scale: 1, duration: .5, opacity:1})
          .fromTo('.menu__headerTop', { y: '200%' }, { y: '0%', duration: .5 })
          .fromTo('.menu__headerBottom', { y: '100%' }, { y: '0%', duration: .5 })
          .fromTo('.index', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: .5, stagger: 0.2 }, '<')
          .fromTo('.link', { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.5, stagger: 0.25 }, '<')
          .play();
      } else{
        tl.reverse()
      }
    }
  },[menuOpen])

  const handleScroll = async(section) => {
    await tl.reverse()
    // tl.clear()
    setMenuOpen(false);
    const element = document.getElementById(section)
    if(element) {
      element.scrollIntoView({behavior:'smooth'})
    }
  }

  return (
    <div className= {`menu`} ref={menuRef}>
      <div className="menu__container">
        <div className="menu__headerContainer">
          <div className='menu__header'>
            <div className='menu__headerTop'>
              AlaminxAb
            </div>
            <div className='menu__headerBottom'>
              Frontend Developer
            </div>
          </div>
          <div className='menu__header'>
            <div className='menu__headerTop'>
              Location:
            </div>
            <div className='menu__headerBottom'>
              Lagos, [<TimeDisplay/>]
            </div>
          </div>
        </div>

        
          {menuData.map((menu, i) => (
              <div className="menu__menu" key={i}>
                <div className='index' onClick={() => {
                  handleScroll(menu.href)
                }
                }>
                  <div>{menu.index}</div>
                  <div>{menu.name}</div>
                  <div>&#8623;</div>
                </div>
                <div className="bar"></div>
              </div>
          ))}


        <div className="menu__links">
        {linkData.map((link, i) => (
            <div className='link' key={i}>
              <div><a href= {`${link.link}`} target='_blank' rel="noopener noreferrer">{link.name}</a></div>
              <div className="bar"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Menu