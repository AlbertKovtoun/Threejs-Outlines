import { postProcessing, renderer } from "./Experience"

export class GUI {
  constructor() {
    this.gui = renderer.renderer.inspector.createParameters("Outline Tweaks")

    this.gui
      .add(postProcessing.uThickness, "value", 0, 5, 0.01)
      .name("Outline Thickness")

    this.gui
      .add(postProcessing.uDepthStrength, "value", 0, 100, 0.01)
      .name("Depth Strength")

    this.gui
      .add(postProcessing.uNormalStrength, "value", 0, 10, 0.01)
      .name("Normal Thickness")
  }
}
