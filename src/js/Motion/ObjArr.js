import Obj from "./Obj"

import { Rand } from "../utils/math"

export default class ObjArr {
  constructor(options) {
    this.de = options.de

    const elements = options.el
    const ch = options.ch
    const properties = options.prop
    const indexStart = options.indexStart

    this.rand = options.rand
    this.length = options.length
    this.el = []
    this.elL = []
    this.obj = []
    this.objL = elements.length
    this.randUniq = []

    for (let objL = options.objL, i = 0; i < this.objL; i++) {
      this.el[i] = ch === 2 ? elements[i].children : [elements[i]]
      this.elL[i] = this.el[i].length
      this.obj[i] = new Obj({
        index: indexStart + i,
        length: objL,
        de: this.de,
        prop: properties,
      })
      this.randUniq[i] = i
    }
  }

  prepare(options) {
    if (!options.isRunning && this.rand) {
      this.randUniq = Rand.uni(this.objL)
    }

    for (let i = 0; i < this.objL; i++) this.obj[i].prepare(options)
  }

  loop(opt) {
    for (let pr = opt.pr, rEase = opt.rEase, i = 0; i < this.objL; i++) {
      this.obj[i].loop({
        el: this.el[this.randUniq[i]],
        elL: this.elL[i],
        pr: pr,
        rEase: rEase,
      })
    }
  }
}
