import * as THREE from "three/webgpu"

import {
  pass,
  mrt,
  output,
  emissive,
  depth,
  normalView,
  normalWorld,
} from "three/tsl"
import { bloom } from "three/addons/tsl/display/BloomNode.js"
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

    this.bloomPass = bloom(this.emissivePass, 0.8, 1)
    this.bloomedOutput = this.outputPass.add(this.bloomPass)

    const outlinePass = outline(
      this.outputPass,
      this.depthPass,
      this.normalPass,
    )

    this.postProcessing = new THREE.PostProcessing(renderer.renderer)
    this.postProcessing.outputNode = outlinePass
  }
}
