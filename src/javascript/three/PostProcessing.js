import * as THREE from "three"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader"

import { camera, renderer, scene, sizes } from "./Experience"

import outlineVertexShader from "../../shaders/outline/vertex.glsl?raw"
import outlineFragmentShader from "../../shaders/outline/fragment.glsl?raw"

export class PostProcessing {
  constructor() {
    this.renderTarget = new THREE.WebGLRenderTarget(800, 600, { samples: 5 })

    this.effectComposer = new EffectComposer(
      renderer.renderer,
      this.renderTarget,
    )

    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.effectComposer.setSize(sizes.width, sizes.height)

    this.renderPass = new RenderPass(scene, camera.camera)
    this.effectComposer.addPass(this.renderPass)

    this.gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
    this.effectComposer.addPass(this.gammaCorrectionPass)

    this.outlineShader = {
      vertexShader: outlineVertexShader,
      fragmentShader: outlineFragmentShader,

      uniforms: {
        tDiffuse: { value: null },
        uTintColor: { value: new THREE.Color("grey") },
      },
    }

    this.outlinePass = new ShaderPass(this.outlineShader)
    this.effectComposer.addPass(this.outlinePass)

    //Not sure anymore what this does
    //this.effectComposer.renderTarget1.texture.colorSpace = THREE.SRGBColorSpace
    //this.effectComposer.renderTarget2.texture.colorSpace = THREE.SRGBColorSpace

    window.addEventListener("resize", () => {
      this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.effectComposer.setSize(sizes.width, sizes.height)
    })
  }
}
