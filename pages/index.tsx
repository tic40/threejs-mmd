import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import {
  AmbientLight,
  AnimationClip,
  AxesHelper,
  Box3,
  Clock,
  DirectionalLight,
  GridHelper,
  Material,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShadowMaterial,
  SkinnedMesh,
  WebGLRenderer,
} from 'three'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'
import Ammo from 'ammojs-typed'
import Meta from '../components/meta'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { MODELS, MOTIONS } from '../modules/mmd'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

let rid: number
let modelCache: { [x: string]: SkinnedMesh }
let w: number
let h: number
let renderer: WebGLRenderer
let scene: Scene
let clock: Clock
let helper: MMDAnimationHelper
let loader: MMDLoader
let camera: PerspectiveCamera
let groundMesh: Mesh
let directionalLight: DirectionalLight
let controls: OrbitControls
let currentModel: SkinnedMesh
let currentModelId: number
let currentMotionId: number

const Home: NextPage = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setup()
  }, [])

  async function setup() {
    setLoading(true)
    clearCanvas()
    prepareStage()
    await Ammo()
    await loadModel()
    await loadMotion()
    animate()
    setLoading(false)
  }

  function clearCanvas() {
    while (mountRef.current?.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild)
    }
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  function cloneMesh(mesh: SkinnedMesh) {
    return (SkeletonUtils as any).clone(mesh)
  }

  function getCurrentModelInfo() {
    return MODELS[currentModelId]
  }
  function getCurrentMotionInfo() {
    return MOTIONS[currentMotionId]
  }

  function prepareStage() {
    w = window.innerWidth
    h = window.innerHeight
    modelCache = {}
    currentModelId = 0
    currentMotionId = getRandomInt(MOTIONS.length)
    scene = new Scene()
    clock = new Clock()
    helper = new MMDAnimationHelper()
    loader = new MMDLoader()
    renderer = new WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(w, h)
    renderer.setClearColor(0xffffff, 1.0)
    renderer.shadowMap.enabled = true
    mountRef.current?.appendChild(renderer.domElement)

    // camera
    camera = new PerspectiveCamera(45, w / h, 0.1, 100)

    // ambientLight
    scene.add(new AmbientLight(0xffffff, 0.6))

    // directionalLight
    directionalLight = new DirectionalLight(0xffe2b9, 0.4)
    directionalLight.position.set(2, 4, 2)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // ground
    groundMesh = new Mesh(
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
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
  }

  async function loadModel(): Promise<void> {
    return new Promise((resolve, reject) => {
      const model = MODELS[currentModelId]
      if (modelCache[model.name]) return resolve()

      loader.load(
        model.path,
        (mesh) => {
          mesh.castShadow = true
          const boundingBox = new Box3().setFromObject(mesh)
          mesh.scale.multiplyScalar(model.height / boundingBox.max.y)
          ;(mesh.material as Material[]).forEach((v: any) => {
            v.emissive.multiplyScalar(model.emissiveMag)
          })
          modelCache[model.name] = mesh
          resolve()
        },
        (xhr) => console.info(`[model] ${(xhr.loaded / xhr.total) * 100}% loaded`),
        (e) => reject(e)
      )
    })
  }

  async function loadMotion(): Promise<void> {
    return new Promise((resolve, reject) => {
      const model = getCurrentModelInfo()
      const motion = getCurrentMotionInfo()
      currentModel = cloneMesh(modelCache[model.name])

      loader.loadAnimation(
        motion.path,
        currentModel,
        (animation) => {
          if (helper.meshes.length) return resolve()
          try {
            helper.add(currentModel, {
              animation: animation as AnimationClip,
              physics: true,
            })
          } catch (e) {
            console.error(e)
            reject(e)
          }
          scene.add(currentModel)
          controls.target.set(0, model.height / 2, 0)
          controls.object.position.set(
            0,
            model.height * 0.55,
            model.height * 1.9
          )
          resolve()
        },
        (xhr) => console.info(`[motion] ${(xhr.loaded / xhr.total) * 100}% loaded`),
        (e) => reject(e)
      )
    })
  }

  function animate() {
    const t = () => {
      helper.update(clock.getDelta())
      controls.update()
      renderer.render(scene, camera)
      rid = requestAnimationFrame(t)
    }
    t()
  }

  async function changeModel() {
    currentModelId = (currentModelId + 1) % MODELS.length
    reset()
  }

  async function changeMotion() {
    currentMotionId = (currentMotionId + 1) % MOTIONS.length
    reset()
  }

  async function reset() {
    setLoading(true)
    helper.remove(currentModel)
    scene.remove(currentModel)
    cancelAnimationFrame(rid)
    try {
      await loadModel()
      await loadMotion()
    } catch (e) {
      setup() // restart
      return
    }
    animate()
    setLoading(false)
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
        style={{ display: loading ? 'block' : 'none' }}
      />
      <button
        onClick={changeModel}
        className="absolute top-2 left-2 bg-transparent hover:text-gray-500 text-gray-700 py-1 px-1 border rounded"
        disabled={loading}
      >
        Model &gt;&gt;
      </button>
      <button
        onClick={changeMotion}
        className="absolute top-2 left-24 bg-transparent hover:text-gray-500 text-gray-700 py-1 px-1 border rounded"
        disabled={loading}
      >
        Motion &gt;&gt;
      </button>
      <a
        className="absolute bottom-2 left-2 bg-transparent text-gray-700 py-1 px-1 noborder rounded"
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
