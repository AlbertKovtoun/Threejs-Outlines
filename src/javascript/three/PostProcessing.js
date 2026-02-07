import * as THREE from "three/webgpu"
import {
  pass,
  mrt,
  output,
  emissive,
  depth,
  normalWorld,
  uniform,
} from "three/tsl"
import { fxaa } from "three/addons/tsl/display/FXAANode"
import { outline } from "./OutlineNode"
import { camera, renderer, scene } from "./Experience"

export class PostProcessing {
  constructor() {
    this.scenePass = pass(scene, camera.camera)
    this.scenePass.setMRT(mrt({ output, emissive, depth, normal: normalWorld }))

    this.outputPass = this.scenePass.getTextureNode()
    this.emissivePass = this.scenePass.getTextureNode("emissive")
    this.depthPass = this.scenePass.getTextureNode("depth")
    this.normalPass = this.scenePass.getTextureNode("normal")

    this.uThickness = uniform(1)
    this.uDepthStrength = uniform(20)
    this.uNormalStrength = uniform(2)

    const outlinePass = outline(
      this.outputPass,
      this.depthPass,
      this.normalPass,
      this.uThickness,
      this.uDepthStrength,
      this.uNormalStrength,
    )

    const fxaaPass = fxaa(outlinePass)

    this.postProcessing = new THREE.PostProcessing(renderer.renderer)
    this.postProcessing.outputNode = outlinePass
  }
}
