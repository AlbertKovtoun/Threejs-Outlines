import { postProcessing, renderer } from "./Experience"

export class GUI {
  constructor() {
    this.gui = renderer.renderer.inspector.createParameters("Parameters")

    // this.gui
    //   .add(postProcessing.uSize, "value", 0, 2, 0.01)
    //   .name("Vignette Size")
    //   .onChange((value) => {
    //     // console.log(value)
    //   })

    // this.gui
    //   .add(postProcessing.uSmoothness, "value", 0, 0.5, 0.01)
    //   .name("Vignette Smoothness")
  }
}
