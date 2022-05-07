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
    emissiveMag: 1.5,
  },
  {
    path: './models/alicia/mmd/Alicia_solid.pmx',
    height: 1.48,
    emissiveMag: 0.1,
  },
]
const MOTIONS = [
  './models/alicia/mmd_motion/2分ループステップ1.vmd',
  './models/alicia/mmd_motion/2分ループステップ10.vmd',
  './models/alicia/mmd_motion/2分ループステップ17.vmd',
  './models/alicia/mmd_motion/2分ループステップ19.vmd',
  './models/alicia/mmd_motion/2分ループステップ20.vmd',
  './models/alicia/mmd_motion/2分ループステップ22.vmd',
  './models/alicia/mmd_motion/2分ループステップ23.vmd',
  './models/alicia/mmd_motion/2分ループステップ28.vmd',
  './models/alicia/mmd_motion/2分ループステップ29.vmd',
  './models/alicia/mmd_motion/2分ループステップ31.vmd',
  './models/alicia/mmd_motion/2分ループステップ36.vmd',
  './models/alicia/mmd_motion/2分ループステップ37.vmd',
  './models/alicia/mmd_motion/2分ループステップ7.vmd',
  './models/alicia/mmd_motion/2分ループステップ8.vmd',
  './motions/nekomimi_switch/nekomimi_lat.vmd',
  './motions/schrodingeiger_no_koneko/Schrodingeiger_no_Koneko1.vmd',
]

const Home: NextPage = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [modelId, setModelId] = useState(0)
  const [motionId, setMotionId] = useState(
    Math.floor(Math.random() * MOTIONS.length)
  )

  useEffect(() => {
    init()
  }, [])

  function clear() {
    while (mountRef.current?.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild)
    }
  }

  function init() {
    setLoaded(false)
    clear()
    const model = MODELS[modelId]
    const motion = MOTIONS[motionId]
    console.info('[motion file]', motion)

    const w = window.innerWidth
    const h = window.innerHeight
    const renderer = new WebGLRenderer()
    const scene = new Scene()
    const clock = new Clock()
    const helper = new MMDAnimationHelper()
    const loader = new MMDLoader()

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    renderer.setClearColor(0xffffff, 1.0)
    renderer.shadowMap.enabled = true
    mountRef.current?.appendChild(renderer.domElement)

    // camera
    const camera = new PerspectiveCamera(45, w / h, 0.1, 100)

    // ambientLight
    scene.add(new AmbientLight(0xffffff, 0.6))

    // directionalLight
    const directionalLight = new DirectionalLight(0xffe2b9, 0.4)
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

    Ammo().then(() => {
      loader.loadWithAnimation(
        model.path,
        motion,
        ({ mesh, animation }) => {
          //mesh.receiveShadow = true
          mesh.castShadow = true
          const boundingBox = new Box3().setFromObject(mesh)
          mesh.scale.multiplyScalar(model.height / boundingBox.max.y)
          controls.target.set(0, model.height / 2, 0)
          controls.object.position.set(
            0,
            model.height * 0.55,
            model.height * 1.9
          )
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((v) =>
              (v as any).emissive.multiplyScalar(model.emissiveMag)
            )
          }

          helper.add(mesh, { animation: animation, physics: true })
          scene.add(mesh)
          setTimeout(() => setLoaded(true), 500)
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
  }

  function changeModel() {
    setModelId(modelId ^ 1)
    setMotionId(Math.floor(Math.random() * MOTIONS.length))
    init()
  }

  return (
    <>
      <Meta
        title={process.env.siteName || ''}
        description={process.env.siteName || ''}
      />
      <div
        className="absolute top-1/2 left-1/2 animate-ping h-5 w-5 bg-gray-600 rounded-full"
        role="status"
        style={{ display: loaded ? 'none' : 'block' }}
      />
      <button
        onClick={changeModel}
        className="absolute top-2 left-2 bg-transparent text-blue-700 py-1 px-2 border border-blue-500 rounded"
      >
        Change
      </button>
      <a
        className="absolute bottom-2 left-2 bg-transparent text-gray-700 py-1 px-1 border border-gray-500 rounded"
        href="https://github.com/tic40/threejs-mmd"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
      <div ref={mountRef} style={{ display: loaded ? 'block' : 'none' }} />
    </>
  )
}

export default Home
