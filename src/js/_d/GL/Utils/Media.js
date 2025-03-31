export function Media(config) {
  const { p, z: includeZ } = config
  const e = p.h
  const r = p.v
  const h = e - 1
  const a = r - 1
  const o = 1 / h
  const l = 1 / a

  const data = {
    mode: "TRIANGLE_STRIP",
    pos: {
      arr: [],
      size: includeZ ? 3 : 2,
    },
    index: [],
    uv: [],
  }

  // Generate vertex positions
  let posIndex = 0
  for (let j = 0; j < r; j++) {
    const y = j * l - 1
    for (let i = 0; i < e; i++) {
      data.pos.arr[posIndex++] = i * o
      data.pos.arr[posIndex++] = y
      if (includeZ) {
        data.pos.arr[posIndex++] = 0
      }
    }
  }

  // Generate indices for TRIANGLE_STRIP
  let index = 0
  const v = r - 1
  const u = r - 2
  const m = e - 1
  for (let j = 0; j < v; j++) {
    const rowStart = e * j
    const nextRowStart = rowStart + e
    const subsequentRowStart = e * (j + 1)
    for (let i = 0; i < e; i++) {
      const nextRowIndex = nextRowStart + i
      data.index[index++] = rowStart + i
      data.index[index++] = nextRowIndex
      if (i === m && j < u) {
        data.index[index++] = nextRowIndex
        data.index[index++] = subsequentRowStart
      }
    }
  }

  // Generate UV coordinates
  let uvIndex = 0
  for (let j = 0; j < r; j++) {
    const vCoord = 1 - j / a
    for (let i = 0; i < e; i++) {
      data.uv[uvIndex++] = i / h
      data.uv[uvIndex++] = vCoord
    }
  }

  return data
}
