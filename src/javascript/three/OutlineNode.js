import { TempNode } from "three/webgpu"
import { nodeObject, vec4, oneMinus } from "three/tsl"

class OutlineNode extends TempNode {
  static get type() {
    return "OutlineNode"
  }

  constructor(textureNode, depthNode, normalNode) {
    super("vec4")
    this.textureNode = textureNode
    this.depthNode = depthNode
    this.normalNode = normalNode
  }

  setup() {
    let diffuse = this.textureNode
    let normal = this.normalNode

    const depth = this.depthNode.oneMinus()

    return normal
  }
}

export default OutlineNode

export const outline = (outputColor, depth, normal) => {
  return nodeObject(new OutlineNode(outputColor, depth, normal))
}
