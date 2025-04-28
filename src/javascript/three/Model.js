import * as THREE from "three"
import { loaders, scene } from "./Experience"

export class Model {
  constructor() {
    this.setModel()
  }

  setModel() {
    loaders.gltfLoader.load("/models/scene.glb", (gltf) => {
      this.model = gltf.scene

      this.model.traverse((mesh) => {
        if (mesh.isObject3D) {
          mesh.material = new THREE.MeshNormalMaterial()
        }
      })

      scene.add(this.model)
    })
  }
}
