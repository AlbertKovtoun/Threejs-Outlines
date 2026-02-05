import { TempNode } from "three/webgpu"
import { nodeObject, Fn, convertToTexture, uv } from "three/tsl"

class TemporaryNode extends TempNode {
  static get type() {
    return "TemporaryNode"
  }

  constructor(textureNode, sizeNode) {
    super("vec4")

    this.textureNode = textureNode

    this.sizeNode = sizeNode
  }

  setup() {
    const textureNode = this.textureNode
    const uvNode = textureNode.uvNode || uv()

    const ApplyTemporary = Fn(([uv, size]) => {
      let diffuse = textureNode.sample(uv)

      return diffuse
    }).setLayout({
      name: "TemporaryShader",
      type: "vec4",
      inputs: [
        { name: "uv", type: "vec2" },
        { name: "size", type: "float" },
      ],
    })

    const temporaryFn = Fn(() => {
      return ApplyTemporary(uvNode, this.sizeNode)
    })

    const outputNode = temporaryFn()

    return outputNode
  }
}

export default TemporaryNode

export const temporary = (node, size = 1) => {
  return nodeObject(new TemporaryNode(convertToTexture(node), nodeObject(size)))
}
