import { useEffect, useRef } from 'react'

import type { NextPage } from 'next'
import * as THREE from 'three'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Meta from '../components/meta'
import Ammo from 'ammojs-typed'

const Home: NextPage = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const w = window.innerWidth
    const h = window.innerHeight

    Ammo().then((Ammo) => {
      Ammo = Ammo
      const renderer = new THREE.WebGLRenderer()
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(w, h)
      renderer.setClearColor(new THREE.Color(0xffffff))
      mountRef.current?.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      // camera
      const camera = new THREE.PerspectiveCamera(50, w / h, 2, 2000)
      camera.position.set(0, 20, 45)
      // ambientLight
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
      scene.add(ambientLight)
      // directionalLight
      const directionalLight = new THREE.DirectionalLight(0xffe2b9, 0.4)
      directionalLight.position.set(1, 0.75, 0.5).normalize()
      scene.add(directionalLight)
      // grid
      const gridHelper = new THREE.GridHelper(1000, 100)
      scene.add(gridHelper)
      scene.background = new THREE.Color(0xf0f0f0)
      // control
      const controls = new OrbitControls(camera, renderer.domElement)
      const clock = new THREE.Clock()

      const helper = new MMDAnimationHelper()
      // load model
      const loader = new MMDLoader()
      loader.loadWithAnimation(
        '/models/lat_miku/Lat式ミクVer2.31_White.pmd',
        '/motions/schrodingeiger_no_koneko/Schrodingeiger_no_Koneko1.vmd',
        // called when the resource is loaded
        ({ mesh, animation }) => {
          helper.add(mesh, {
            animation: animation,
            physics: true,
          })
          scene.add(mesh)
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
      <div ref={mountRef} />
    </>
  )
}

export default Home
