import { useEffect, useRef } from 'react'

import type { NextPage } from 'next'
import {
  WebGLRenderer,
  Color,
  Scene,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  GridHelper,
  Clock,
} from 'three'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useState } from 'react'
import Meta from '../components/meta'
import Ammo from 'ammojs-typed'

const Home: NextPage = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const w = window.innerWidth
    const h = window.innerHeight

    Ammo().then((Ammo) => {
      Ammo = Ammo
      const renderer = new WebGLRenderer()
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(w, h)
      mountRef.current?.appendChild(renderer.domElement)

      const scene = new Scene()
      // camera
      const camera = new PerspectiveCamera(50, w / h, 2, 2000)
      camera.position.set(0, 10, 50)
      // ambientLight
      const ambientLight = new AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)
      // directionalLight
      const directionalLight = new DirectionalLight(0xffe2b9, 0.4)
      directionalLight.position.set(1, 0.75, 0.5).normalize()
      scene.add(directionalLight)
      // grid
      const gridHelper = new GridHelper(1000, 100)
      scene.add(gridHelper)
      scene.background = new Color(0xf0f0f0)
      // control
      new OrbitControls(camera, renderer.domElement)
      const clock = new Clock()

      const helper = new MMDAnimationHelper()
      // load model
      const loader = new MMDLoader()
      loader.loadWithAnimation(
        './models/lat_miku/Lat式ミクVer2.31_White.pmd',
        './motions/schrodingeiger_no_koneko/Schrodingeiger_no_Koneko1.vmd',
        // called when the resource is loaded
        ({ mesh, animation }) => {
          helper.add(mesh, {
            animation: animation,
            physics: true,
          })
          scene.add(mesh)
          setLoaded(true)
        },
        // called when loading is in progresses
        (xhr) => console.info((xhr.loaded / xhr.total) * 100 + '% loaded'),
        (e) => console.error(e)
      )
      const t = () => {
        helper.update(clock.getDelta())
        renderer.render(scene, camera)
        requestAnimationFrame(t)
      }
      t()
    })
  }, [])

  return (
    <>
      <Meta
        title={process.env.siteName || ''}
        description={process.env.siteName || ''}
      />
      <div
        className="
          absolute
          top-1/2
          left-1/2
          animate-ping
          h-5
          w-5
          bg-gray-600
          rounded-full
        "
        role="status"
        style={loaded ? { display: 'none' } : { display: 'block' }}
      ></div>
      <a
        className="
          absolute
          bottom-2
          left-2
          bg-transparent
          text-gray-700
          py-1
          px-2
          border
          border-gray-500
          rounded
        "
        href="https://github.com/tic40/threejs-mmd"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
      <div ref={mountRef} />
    </>
  )
}

export default Home
