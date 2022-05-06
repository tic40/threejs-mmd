import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import {
  AmbientLight,
  AxesHelper,
  Box3,
  Clock,
  DirectionalLight,
  GridHelper,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShadowMaterial,
  WebGLRenderer,
} from 'three'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Ammo from 'ammojs-typed'
import Meta from '../components/meta'

const MODELS = [
  {
    path: './models/lat_miku/Lat式ミクVer2.31_White.pmd',
    height: 1.58,
  },
  {
    path: './models/Alicia/MMD/Alicia_solid.pmx',
    height: 1.48,
  },
]
const MOTIONS = [
  {
    path: './motions/schrodingeiger_no_koneko/Schrodingeiger_no_Koneko1.vmd',
  },
]

const Home: NextPage = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  const model = MODELS[0]
  const motion = MOTIONS[0]

  useEffect(() => {
    const w = window.innerWidth
    const h = window.innerHeight

    Ammo().then((Ammo) => {
      Ammo = Ammo
      const renderer = new WebGLRenderer()
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(w, h)
      renderer.shadowMap.enabled = true
      renderer.setClearColor(0xffffff, 1.0)
      mountRef.current?.appendChild(renderer.domElement)

      const scene = new Scene()
      const clock = new Clock()
      const helper = new MMDAnimationHelper()

      // camera
      const camera = new PerspectiveCamera(45, w / h, 0.1, 100)

      // ambientLight
      scene.add(new AmbientLight(0xffffff, 0.6))

      // directionalLight
      const directionalLight = new DirectionalLight(0xffe2b9, 0.5)
      directionalLight.position.set(2, 4, 2)
      directionalLight.castShadow = true
      scene.add(directionalLight)

      // ground
      const groundMesh = new Mesh(
        new PlaneGeometry(10, 10, 1, 1),
        new ShadowMaterial({ opacity: 0.2 })
      )
      groundMesh.rotation.x = -Math.PI / 2
      groundMesh.receiveShadow = true
      scene.add(groundMesh)

      // grid
      scene.add(new GridHelper(10, 20, 0x0000000, 0x999999))
      scene.add(new AxesHelper(10))

      // control
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true

      // load model
      const loader = new MMDLoader()
      loader.loadWithAnimation(
        model.path,
        motion.path,
        ({ mesh, animation }) => {
          mesh.castShadow = true
          // mesh.receiveShadow = true
          const boundingBox = new Box3().setFromObject(mesh)
          const m = model.height / boundingBox.max.y
          mesh.scale.multiplyScalar(m)
          const boundingBoxScaled = new Box3().setFromObject(mesh)
          controls.target.set(0, model.height / 2, 0)
          controls.object.position.set(
            0,
            model.height * 0.55,
            model.height * 1.9
          )

          helper.add(mesh, {
            animation: animation,
            physics: true,
          })
          scene.add(mesh)
          setLoaded(true)
        },
        (xhr) => console.info((xhr.loaded / xhr.total) * 100 + '% loaded'),
        (e) => console.error(e)
      )
      const t = () => {
        helper.update(clock.getDelta())
        controls.update()
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
        style={{ display: loaded ? 'none' : 'block' }}
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
