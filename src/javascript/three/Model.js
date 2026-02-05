import * as THREE from "three/webgpu"
import { uv, vec4 } from "three/tsl"
import { loaders, scene } from "./Experience"

export class Model {
  constructor() {
    loaders.gltfLoader.load("/models/Scene.glb", (gltf) => {
      this.modelGroup = gltf.scene

      this.modelGroup.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshBasicNodeMaterial()
          child.material.colorNode = vec4(uv(), 1, 1)
        }
      })

      scene.add(this.modelGroup)
    })
  }
}
