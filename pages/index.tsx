import { useEffect, useRef } from 'react'

import Meta from '../components/meta'
import type { NextPage } from 'next'
import * as THREE from 'three'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'

const Home: NextPage = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loader = new MMDLoader()
    const renderer = new THREE.WebGLRenderer()

    const elm = mountRef.current

    elm?.appendChild(renderer.domElement)
    const w = window.innerWidth // elm?.clientWidth || 500
    const h = window.innerHeight //Math.max(500, elm?.clientHeight || 0)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 1, 100)
    camera.position.set(0, 0, 100)
    const geometry = new THREE.SphereGeometry(300, 30, 30)

    loader.load(
      '/models/miku_lat/Lat式ミクVer2.31_Normal.pmd',
      // called when the resource is loaded
      (mesh: THREE.Object3D<THREE.Event>) => {
        scene.add(mesh)
      },
      // called when loading is in progresses
      (xhr) => {
        console.info((xhr.loaded / xhr.total) * 100 + '% loaded')
      }
    )

    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(1, 1, 1)

    scene.add(directionalLight)

    const tick = () => {
      // mesh.rotation.y += 0.01
      renderer.render(scene, camera)

      requestAnimationFrame(tick)
    }

    tick()

    return () => {
      elm?.removeChild(renderer.domElement)
    }
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
