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
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShadowMaterial,
  SkinnedMesh,
  WebGLRenderer,
} from 'three'
import { MMDAnimationHelper } from 'three/examples/jsm/animation/MMDAnimationHelper'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Ammo from 'ammojs-typed'
import Meta from '../components/meta'
import { MODELS, MOTIONS } from '../modules/mmd'

interface State {
  w: number
  h: number
  renderer: WebGLRenderer | null
  scene: Scene
  clock: Clock
  helper: MMDAnimationHelper
  loader: MMDLoader
  camera: PerspectiveCamera | null
  groundMesh: Mesh | null
  directionalLight: DirectionalLight | null
  controls: OrbitControls | null
  currentModel: SkinnedMesh | null
  currentMotion: AnimationClip | null
}

const initialState = () => ({
  w: 0,
  h: 0,
  renderer: null,
  scene: new Scene(),
  clock: new Clock(),
  helper: new MMDAnimationHelper(),
  loader: new MMDLoader(),
  camera: null,
  groundMesh: null,
  directionalLight: null,
  controls: null,
  currentModel: null,
  currentMotion: null,
})

const Home: NextPage = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  const [modelId, setModelId] = useState(0)
  const [motionId, setMotionId] = useState(randomPick(MOTIONS.length))
  const [state, setState] = useState<State>(initialState())

  useEffect(() => {
    setLoading(true)
    const localState = initialState()
    init(localState)
    loadModel(localState)
  }, [])

  function clear() {
    while (mountRef.current?.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild)
    }
  }

  function randomPick(max: number): number {
    return Math.floor(Math.random() * max)
  }

  function init(localState: State) {
    clear()

    localState.w = window.innerWidth
    localState.h = window.innerHeight

    localState.renderer = new WebGLRenderer()
    localState.renderer.setPixelRatio(window.devicePixelRatio)
    localState.renderer.setSize(localState.w, localState.h)
    localState.renderer.setClearColor(0xffffff, 1.0)
    localState.renderer.shadowMap.enabled = true
    mountRef.current?.appendChild(localState.renderer.domElement)

    // camera
    localState.camera = new PerspectiveCamera(
      45,
      localState.w / localState.h,
      0.1,
      100
    )

    // ambientLight
    localState.scene.add(new AmbientLight(0xffffff, 0.6))

    // directionalLight
    localState.directionalLight = new DirectionalLight(0xffe2b9, 0.4)
    localState.directionalLight.position.set(2, 4, 2)
    localState.directionalLight.castShadow = true
    localState.scene.add(localState.directionalLight)

    // ground
    localState.groundMesh = new Mesh(
      new PlaneGeometry(10, 10, 1, 1),
      new ShadowMaterial({ opacity: 0.2 })
    )
    localState.groundMesh.rotation.x = -Math.PI / 2
    localState.groundMesh.receiveShadow = true
    localState.scene.add(localState.groundMesh)

    // grid
    localState.scene.add(new GridHelper(10, 20, 0x0000000, 0x999999))
    localState.scene.add(new AxesHelper(10))

    // control
    localState.controls = new OrbitControls(
      localState.camera,
      localState.renderer.domElement
    )
    localState.controls.enableDamping = true
  }

  function loadModel(localState: State) {
    const model = MODELS[modelId]
    const motion = MOTIONS[motionId]
    console.info('[model file]', model, '[motion file]', motion)

    Ammo().then(() => {
      localState.loader.loadWithAnimation(
        model.path,
        motion.path,
        ({ mesh, animation }) => {
          // mesh.receiveShadow = true
          mesh.castShadow = true
          const boundingBox = new Box3().setFromObject(mesh)
          mesh.scale.multiplyScalar(model.height / boundingBox.max.y)
          localState.controls?.target.set(0, model.height / 2, 0)
          localState.controls?.object.position.set(
            0,
            model.height * 0.55,
            model.height * 1.9
          )
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((v) =>
              (v as any).emissive.multiplyScalar(model.emissiveMag)
            )
          }

          localState.helper.add(mesh, { animation: animation, physics: true })
          localState.scene.add(mesh)
          localState.currentModel = mesh
          localState.currentMotion = animation
          setTimeout(() => {
            setState({ ...state, ...localState })
            setLoading(false)
            animate(localState)
          }, 500)
        },
        (xhr) => console.info((xhr.loaded / xhr.total) * 100 + '% loaded'),
        (e) => console.error(e)
      )
    })
  }

  function animate(localState: State) {
    const t = () => {
      localState.helper.update(localState.clock.getDelta())
      localState.controls?.update()
      if (localState.camera) {
        localState.renderer?.render(localState.scene, localState.camera)
      }
      requestAnimationFrame(t)
    }
    t()
  }

  function changeModel() {
    setLoading(true)
    setModelId((modelId + 1) % MODELS.length)
    if (state.currentModel) {
      state.helper.remove(state.currentModel)
      state.scene.remove(state.currentModel)
    }
    loadModel({ ...state })
  }

  function changeMotion() {
    setLoading(true)
    setMotionId((motionId + 1) % MOTIONS.length)
    if (state.currentModel) {
      state.helper.remove(state.currentModel)
      state.scene.remove(state.currentModel)
    }
    loadModel({ ...state })
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
        className="absolute top-2 left-2 bg-transparent text-gray-700 py-1 px-1 border border-gray-500 rounded"
        disabled={loading}
      >
        Model &gt;&gt;
      </button>
      <button
        onClick={changeMotion}
        className="absolute top-2 left-24 bg-transparent text-gray-700 py-1 px-1 border border-gray-500 rounded"
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
