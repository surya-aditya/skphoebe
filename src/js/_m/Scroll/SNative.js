import { BM, L } from "../../utils/dom"

export default class SNative {
  constructor(config) {
    this.cb = config.cb
    BM(this, ["run"])
  }

  on() {
    this.l("a")
  }

  off() {
    this.l("r")
  }

  l(action) {
    L(window, action, "scroll", this.run)
  }

  run() {
    this.cb(scrollY)
  }
}
