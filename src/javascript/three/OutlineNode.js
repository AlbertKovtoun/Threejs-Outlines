import { TempNode } from "three/webgpu"
import { nodeObject, vec4, vec2, uv, mix } from "three/tsl"

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
    let diffuseBuffer = this.textureNode
    let normalBuffer = this.normalNode
    const depthBuffer = this.depthNode
    const uvNode = uv()
    const thickness = 1

    const screensize = vec2(1 / window.innerWidth, 1 / window.innerHeight).mul(
      thickness,
    )

    const leftDepth = depthBuffer.sample(uvNode.sub(vec2(screensize.x, 0)))
    const rightDepth = depthBuffer.sample(uvNode.add(vec2(screensize.x, 0)))
    const topDepth = depthBuffer.sample(uvNode.add(vec2(0, screensize.y)))
    const bottomDepth = depthBuffer.sample(uvNode.sub(vec2(0, screensize.y)))

    const dxDepth = leftDepth.sub(rightDepth)
    const dyDepth = topDepth.sub(bottomDepth)

    const depthEdge = dxDepth
      .mul(dxDepth)
      .add(dyDepth.mul(dyDepth))
      .sqrt()
      .mul(20) // sqrt(dx² + dy²)

    const leftNormal = normalBuffer.sample(uvNode.sub(vec2(screensize.x, 0)))
    const rightNormal = normalBuffer.sample(uvNode.add(vec2(screensize.x, 0)))
    const topNormal = normalBuffer.sample(uvNode.add(vec2(0, screensize.y)))
    const bottomNormal = normalBuffer.sample(uvNode.sub(vec2(0, screensize.y)))

    const dxNormal = leftNormal.sub(rightNormal)
    const dyNormal = topNormal.sub(bottomNormal)

    const normalEdge = dxNormal
      .dot(dxNormal)
      .add(dyNormal.dot(dyNormal))
      .sqrt()
      .mul(2)

    const outline = depthEdge.oneMinus().add(normalEdge.oneMinus()).clamp(0, 1)

    const finalColor = mix(vec4(0, 0, 0, 1), diffuseBuffer, outline)

    return finalColor
  }
}

export default OutlineNode

export const outline = (outputColor, depth, normal) => {
  return nodeObject(new OutlineNode(outputColor, depth, normal))
}
