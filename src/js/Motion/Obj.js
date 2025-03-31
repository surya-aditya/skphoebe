import { isDef } from "../utils/dom"
import { Lerp, R, Remap } from "../utils/math"

export default class Obj {
  constructor(options) {
    const index = options.index
    const de = options.de

    this.propArr = options.prop
    this.propArrL = this.propArr.length
    this.prop = []
    this.pr = {
      show: {
        start: index * de,
        end: 1 - (options.length - 1 - index) * de,
      },
      hide: {
        start: 0,
        end: 1,
      },
    }
    this.curr = []

    for (let i = 0; i < this.propArrL; i++) {
      const prop = this.propArr[i]
      this.curr[i] = prop[1]
      this.prop[i] = { round: prop[0] === "y" || prop[0] === "x" ? 3 : 6 }
    }
  }

  prepare(options) {
    this.isShow = options.isShow

    for (let isRunning = options.isRunning, i = 0; i < this.propArrL; i++) {
      const prop = this.propArr[i]
      const start = prop[1]
      const end = prop[2]

      if (prop[0] === "opacity") {
        if (this.isShow) {
          this.prop[i].start = isRunning ? this.curr[i] : start
          this.prop[i].end = end
        } else {
          this.prop[i].start = this.curr[i]
          this.prop[i].end = start
        }
      } else {
        if (this.isShow) {
          this.prop[i].start = isRunning ? this.curr[i] : start
          this.prop[i].end = 0
        } else {
          this.prop[i].start = this.curr[i]
          this.prop[i].end = options.propEndIsEnd ? end : start
        }
      }

      const pr = this.isShow && !isRunning ? this.pr.show : this.pr.hide
      this.pr.start = pr.start
      this.pr.end = pr.end
    }
  }

  loop(options) {
    const elements = options.el
    const elementsL = options.elL
    const position = [0, 0]
    const progress = Remap(this.pr.start, this.pr.end, 0, 1, options.pr)
    const easeProg = options.rEase(progress)

    let rotation = ""
    let opacity = ""

    for (let i = 0; i < this.propArrL; i++) {
      const props = this.propArr[i]
      const propN = props[0]
      const obj = this.prop[i]

      this.curr[i] = R(Lerp(obj.start, obj.end, easeProg), obj.round)

      if (propN === "y") {
        const unit = isDef(props[3]) ? "px" : "%"
        position[1] = this.curr[i] + unit
      } else if (propN === "x") {
        const unit = isDef(props[3]) ? "px" : "%"
        position[0] = this.curr[i] + unit
      } else {
        if (propN === "rotateX") {
          rotation = ` rotateX(${this.curr[i]}deg)`
        } else if (propN === "opacity") {
          opacity = this.curr[i]
        }
      }
    }

    for (let i = 0; i < elementsL; i++) {
      const style = elements[i].style
      style.transform = `translate3d(${position[0]},${position[1]},0)${rotation}`

      if (opacity !== "") style.opacity = opacity
    }
  }
}
