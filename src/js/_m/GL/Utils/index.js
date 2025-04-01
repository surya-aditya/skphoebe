/**
 * Creates a new 4x4 identity matrix.
 * @returns {Float32Array} A new identity matrix.
 */
export function create() {
  const matrix = new Float32Array(16)
  matrix[0] = 1
  matrix[5] = 1
  matrix[10] = 1
  matrix[15] = 1
  return matrix
}

/**
 * Sets the provided 4x4 matrix to an identity matrix.
 * @param {Float32Array} matrix - The matrix to be set to identity.
 * @returns {Float32Array} The identity matrix.
 */
export function identity(matrix) {
  matrix[0] = 1
  matrix[1] = 0
  matrix[2] = 0
  matrix[3] = 0
  matrix[4] = 0
  matrix[5] = 1
  matrix[6] = 0
  matrix[7] = 0
  matrix[8] = 0
  matrix[9] = 0
  matrix[10] = 1
  matrix[11] = 0
  matrix[12] = 0
  matrix[13] = 0
  matrix[14] = 0
  matrix[15] = 1
  return matrix
}

/**
 * Inverts the provided 4x4 matrix.
 * @param {Float32Array} out - The receiving matrix.
 * @param {Float32Array} a - The source matrix to be inverted.
 * @returns {Float32Array|null} The inverted matrix, or null if the matrix cannot be inverted.
 */
export function invert(out, a) {
  const a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3]
  const a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7]
  const a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11]
  const a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15]

  const b00 = a00 * a11 - a01 * a10
  const b01 = a00 * a12 - a02 * a10
  const b02 = a00 * a13 - a03 * a10
  const b03 = a01 * a12 - a02 * a11
  const b04 = a01 * a13 - a03 * a11
  const b05 = a02 * a13 - a03 * a12
  const b06 = a20 * a31 - a21 * a30
  const b07 = a20 * a32 - a22 * a30
  const b08 = a20 * a33 - a23 * a30
  const b09 = a21 * a32 - a22 * a31
  const b10 = a21 * a33 - a23 * a31
  const b11 = a22 * a33 - a23 * a32

  const det =
    b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06

  if (!det) {
    return null
  }

  const invDet = 1.0 / det

  out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet
  out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * invDet
  out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet
  out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * invDet
  out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * invDet
  out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet
  out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * invDet
  out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet
  out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet
  out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * invDet
  out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet
  out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * invDet
  out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * invDet
  out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet
  out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * invDet
  out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet

  return out
}

/**
 * Generates a perspective projection matrix.
 * @param {Float32Array} out - The receiving matrix.
 * @param {number} fovy - Vertical field of view in radians.
 * @param {number} aspect - Aspect ratio.
 * @param {number} near - Near bound of the frustum.
 * @param {number} far - Far bound of the frustum.
 * @returns {Float32Array} The perspective projection matrix.
 */
export function perspective(out, fovy, aspect, near, far) {
  const f = 1.0 / Math.tan(fovy / 2)
  const nf = 1 / (near - far)

  out[0] = f / aspect
  out[1] = 0
  out[2] = 0
  out[3] = 0
  out[4] = 0
  out[5] = f
  out[6] = 0
  out[7] = 0
  out[8] = 0
  out[9] = 0
  out[10] = (far + near) * nf
  out[11] = -1
  out[12] = 0
  out[13] = 0
  out[14] = 2 * far * near * nf
  out[15] = 0

  return out
}

/**
 * Multiplies two 4x4 matrices.
 * @param {Float32Array} out - The receiving matrix.
 * @param {Float32Array} a - The first operand.
 * @param {Float32Array} b - The second operand.
 * @returns {Float32Array} The product of the two matrices.
 */
export function multiply(out, a, b) {
  const a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3]
  const a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7]
  const a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11]
  const a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15]

  const b00 = b[0],
    b01 = b[1],
    b02 = b[2],
    b03 = b[3]
  const b10 = b[4],
    b11 = b[5],
    b12 = b[6],
    b13 = b[7]
  const b20 = b[8],
    b21 = b[9],
    b22 = b[10],
    b23 = b[11]
  const b30 = b[12],
    b31 = b[13],
    b32 = b[14],
    b33 = b[15]

  out[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30
  out[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31
  out[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32
  out[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33
  out[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30
  out[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31
  out[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32
  out[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33
  out[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30
  out[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31
  out[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32
  out[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33
  out[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30
  out[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31
  out[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32
  out[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33

  return out
}

/**
 * Multiplies a matrix by another matrix.
 * @param {Float32Array} out - The receiving matrix.
 * @param {Float32Array} a - The matrix to multiply.
 * @returns {Float32Array} The multiplied matrix.
 */
export function multiplyFn(out, a) {
  return multiply(out, out, a)
}

/**
 * Translates a matrix by the given vector.
 * @param {Float32Array} out - The receiving matrix.
 * @param {Float32Array} a - The matrix to translate.
 * @param {Float32Array} v - The vector to translate by.
 * @returns {Float32Array} The translated matrix.
 */
export function translate(out, a, v) {
  const x = v[0],
    y = v[1],
    z = v[2]
  const a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3]
  const a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7]
  const a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11]
  const a30 = a[12],
    a31 = a[13],
    a32 = a[14],
    a33 = a[15]

  out[0] = a00
  out[1] = a01
  out[2] = a02
  out[3] = a03
  out[4] = a10
  out[5] = a11
  out[6] = a12
  out[7] = a13
  out[8] = a20
  out[9] = a21
  out[10] = a22
  out[11] = a23

  out[12] = a00 * x + a10 * y + a20 * z + a30
  out[13] = a01 * x + a11 * y + a21 * z + a31
  out[14] = a02 * x + a12 * y + a22 * z + a32
  out[15] = a03 * x + a13 * y + a23 * z + a33

  return out
}

/**
 * Translates a matrix by the given vector.
 * @param {Float32Array} out - The receiving matrix.
 * @param {Float32Array} v - The vector to translate by.
 * @returns {Float32Array} The translated matrix.
 */
export function translateFn(out, v) {
  return translate(out, out, v)
}

/**
 * Scales a matrix by the given vector.
 * @param {Float32Array} out - The receiving matrix.
 * @param {Float32Array} a - The matrix to scale.
 * @param {Float32Array} v - The vector to scale by.
 * @returns {Float32Array} The scaled matrix.
 */
export function scale(out, a, v) {
  const x = v[0],
    y = v[1],
    z = v[2]

  out[0] = a[0] * x
  out[1] = a[1] * x
  out[2] = a[2] * x
  out[3] = a[3] * x
  out[4] = a[4] * y
  out[5] = a[5] * y
  out[6] = a[6] * y
  out[7] = a[7] * y
  out[8] = a[8] * z
  out[9] = a[9] * z
  out[10] = a[10] * z
  out[11] = a[11] * z
  out[12] = a[12]
  out[13] = a[13]
  out[14] = a[14]
  out[15] = a[15]

  return out
}

/**
 * Scales a matrix by the given vector.
 * @param {Float32Array} out - The receiving matrix.
 * @param {Float32Array} v - The vector to scale by.
 * @returns {Float32Array} The scaled matrix.
 */
export function scaleFn(out, v) {
  return scale(out, out, v)
}

/**
 * Rotates a matrix by the given angle around the specified axis.
 * @param {Float32Array} out - The receiving matrix.
 * @param {Float32Array} a - The matrix to rotate.
 * @param {number} rad - The angle to rotate the matrix by.
 * @param {Float32Array} axis - The axis to rotate around.
 * @returns {Float32Array|null} The rotated matrix, or null if the axis is invalid.
 */
export function rotate(out, a, rad, axis) {
  let [x, y, z] = axis
  let len = Math.hypot(x, y, z)
  if (len < 1e-6) {
    return null
  }
  len = 1 / len
  x *= len
  y *= len
  z *= len

  const s = Math.sin(rad)
  const c = Math.cos(rad)
  const t = 1 - c

  const a00 = a[0],
    a01 = a[1],
    a02 = a[2],
    a03 = a[3]
  const a10 = a[4],
    a11 = a[5],
    a12 = a[6],
    a13 = a[7]
  const a20 = a[8],
    a21 = a[9],
    a22 = a[10],
    a23 = a[11]

  // Construct the elements of the rotation matrix
  const b00 = x * x * t + c,
    b01 = y * x * t + z * s,
    b02 = z * x * t - y * s
  const b10 = x * y * t - z * s,
    b11 = y * y * t + c,
    b12 = z * y * t + x * s
  const b20 = x * z * t + y * s,
    b21 = y * z * t - x * s,
    b22 = z * z * t + c

  out[0] = a00 * b00 + a10 * b01 + a20 * b02
  out[1] = a01 * b00 + a11 * b01 + a21 * b02
  out[2] = a02 * b00 + a12 * b01 + a22 * b02
  out[3] = a03 * b00 + a13 * b01 + a23 * b02
  out[4] = a00 * b10 + a10 * b11 + a20 * b12
  out[5] = a01 * b10 + a11 * b11 + a21 * b12
  out[6] = a02 * b10 + a12 * b11 + a22 * b12
  out[7] = a03 * b10 + a13 * b11 + a23 * b12
  out[8] = a00 * b20 + a10 * b21 + a20 * b22
  out[9] = a01 * b20 + a11 * b21 + a21 * b22
  out[10] = a02 * b20 + a12 * b21 + a22 * b22
  out[11] = a03 * b20 + a13 * b21 + a23 * b22

  if (a !== out) {
    out[12] = a[12]
    out[13] = a[13]
    out[14] = a[14]
    out[15] = a[15]
  }

  return out
}

/**
 * Rotates a matrix by the given angle around the specified axis.
 * @param {Float32Array} out - The receiving matrix.
 * @param {number} rad - The angle to rotate the matrix by.
 * @param {Float32Array} axis - The axis to rotate around.
 * @returns {Float32Array|null} The rotated matrix, or null if the axis is invalid.
 */
export function rotateFn(out, rad, axis) {
  return rotate(out, out, rad, axis)
}
