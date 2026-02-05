import { Inspector } from "three/addons/inspector/Inspector"
import * as THREE from "three/webgpu"

import { vec4 } from "three/tsl"

import { Camera } from "./Camera"
import { GUI } from "./GUI"
import { Loaders } from "./Loaders"
import { Model } from "./Model"
import { PostProcessing } from "./PostProcessing"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()
scene.backgroundNode = vec4(0, 0, 0, 1)

export const loaders = new Loaders()

export const model = new Model()

export const sizes = new Sizes()

export const camera = new Camera()

export const renderer = new Renderer()
renderer.renderer.inspector = new Inspector()

export const postProcessing = new PostProcessing()

await renderer.renderer.init()

export const gui = new GUI()

//Animate
const clock = new THREE.Clock()
let time = Date.now()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  camera.controls.update()

  postProcessing.postProcessing.render()

  window.requestAnimationFrame(tick)
}

tick()
