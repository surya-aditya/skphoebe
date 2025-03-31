import { Has } from "../utils/dom"
import Motion from "./index"

export default class Timeline {
  constructor() {
    this._ = []
    this.d = 0
  }

  from(obj) {
    this.d += Has(obj, "de") ? obj.de : 0
    obj.de = this.d
    this._.push(new Motion(obj))
  }

  play(t) {
    this.run("play", t)
  }

  pause() {
    this.run("pause")
  }

  run(t, i) {
    let e = 0
    const s = this._.length
    const r = i || void 0
    while (e < s) {
      this._[e][t](r)
      e++
    }
  }
}
