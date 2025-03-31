import ResizeObserver from "./ResizeObserver"

let RoId = 0

export default class ROR {
  constructor(cb) {
    this.cb = cb
    this.id = RoId

    RoId++
  }

  on() {
    new ResizeObserver().add({ id: this.id, cb: this.cb })
  }

  off() {
    new ResizeObserver().rm(this.id)
  }
}
