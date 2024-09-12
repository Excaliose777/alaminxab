/* eslint-disable react/no-unknown-property */
import './Canvas.scss'
import {gsap} from 'gsap'
import { useGSAP } from '@gsap/react'
import { Canvas } from '@react-three/fiber'
import Wavy from './Wavy/Wavy'
import { useRef } from 'react'
// import {useResize} from '../utils/Hooks/useResize'
// import Scene from './FBO/Scene'

gsap.registerPlugin(useGSAP)

const Canvas3D = () => {
  // const canvasRef = useRef(null)
  // useResize(canvasRef)
  useGSAP(() => {
    gsap.from('.main', {
      opacity:0,
      duration:1,
      ease:'power3.inOut'
    })
  },[])
  return (
    <div className='canvas'>
    <Canvas shadows camera={{position:[2,2,2]}} >
      <ambientLight intensity={0.5} />
      <color attach="background" args={["black"]} />
      <Wavy count={4000}/>
      {/* <Scene/> */}
    </Canvas>
    </div>
  )
}

export default Canvas3D

