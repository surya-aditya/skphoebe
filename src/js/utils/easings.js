const PI = Math.PI
const cos = (v) => Math.cos(v)
const sin = (v) => Math.sin(v)

const createEaseDictionary = (easeArrays) => {
  const easeDict = {}

  const [linear, i, o, io] = easeArrays

  // Add linear function
  easeDict["l"] = linear[0]

  // Add functions for ease-in (i), ease-out (o), and ease-in-out (io)
  const categories = ["i", "o", "io"]
  const categoryArrays = [i, o, io]

  for (
    let categoryIndex = 0;
    categoryIndex < categories.length;
    categoryIndex++
  ) {
    const categoryArray = categoryArrays[categoryIndex]
    const category = categories[categoryIndex]
    for (let index = 0; index < categoryArray.length; index++) {
      const fn = categoryArray[index]
      const key = category + (index + 1)
      easeDict[key] = fn
    }
  }

  return easeDict
}

// Define Ease as arrays of arrays
export const Ease = createEaseDictionary([
  [(t) => t], // linear
  [
    (t) => 1 - cos(t * 0.5 * PI), // easeInSine
    (t) => t * t, // easeInQuad
    (t) => t * t * t, // easeInCubic
    (t) => t * t * t * t, // easeInQuart
    (t) => t * t * t * t * t, // easeInQuint
    (t) => (t === 0 ? 0 : 2 ** (10 * (t - 1))), // easeInExpo
  ],
  [
    (t) => sin(t * 0.5 * PI), // easeOutSine
    (t) => t * (2 - t), // easeOutQuad
    (t) => --t * t * t + 1, // easeOutCubic
    (t) => 1 - --t * t * t * t, // easeOutQuart
    (t) => 1 + --t * t * t * t * t, // easeOutQuint
    (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t)), // easeOutExpo
  ],
  [
    (t) => -0.5 * (cos(PI * t) - 1), // easeInOutSine
    (t) => (t < 0.5 ? 2 * t * t : 0.5 * (2 - (2 * t - 2) ** 2)), // easeInOutQuad
    (t) => (t < 0.5 ? 4 * t * t * t : 0.5 * (2 + (2 * t - 2) ** 3)), // easeInOutCubic
    (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (2 * t - 2) ** 4), // easeInOutQuart
    (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (2 * t - 2) ** 5), // easeInOutQuint
    (t) =>
      t === 0
        ? 0
        : t === 1
        ? 1
        : t < 0.5
        ? 0.5 * 2 ** (10 * (t * 2 - 1))
        : 0.5 * (2 - 2 ** (-10 * (t * 2 - 1))), // easeInOutExpo
  ],
])

// Bezier Easing
const calcR0 = (v, cp) => 1 - 3 * cp + 3 * v
const calcR1 = (v, cp) => 3 * cp - 6 * v
const calcCurveVal = (t, cp1, cp2) =>
  ((calcR0(cp1, cp2) * t + calcR1(cp1, cp2)) * t + 3 * cp1) * t
const calcCurveDer = (t, cp1, cp2) =>
  3 * calcR0(cp1, cp2) * t * t + 2 * calcR1(cp1, cp2) * t + 3 * cp1

const approxRoot = (tv, lb, ub, cp1, cp2) => {
  let apprx,
    currDiff,
    iter = 0
  do {
    apprx = lb + 0.5 * (ub - lb)
    currDiff = calcCurveVal(apprx, cp1, cp2) - tv
    currDiff > 0 ? (ub = apprx) : (lb = apprx)
  } while (Math.abs(currDiff) > 1e-7 && ++iter < 10)
  return apprx
}

const findRoot = (tv, iv, cp1, cp2) => {
  for (let i = 0; i < 4; ++i) {
    const der = calcCurveDer(iv, cp1, cp2)
    if (der === 0) return iv
    iv -= (calcCurveVal(iv, cp1, cp2) - tv) / der
  }
  return iv
}

export const CubicBezierEase = ([cp1, cp2, cp3, cp4]) => {
  const cachedVals = new Float32Array(11)
  if (cp1 !== cp3 || cp2 !== cp4) {
    for (let i = 0; i < 11; ++i) {
      cachedVals[i] = calcCurveVal(0.1 * i, cp1, cp2)
    }
  }

  return (t) => {
    if ((cp1 === cp3 && cp2 === cp4) || t === 0 || t === 1) return t

    let progress = 0,
      idx = 0
    while (idx < 10 && cachedVals[idx] <= t) ++idx, (progress += 0.1)
    --idx
    const ratio =
      (t - cachedVals[idx]) / (cachedVals[idx + 1] - cachedVals[idx])
    const interpolatedProgress = progress + 0.1 * ratio
    const der = calcCurveDer(interpolatedProgress, cp1, cp2)

    return der >= 0.001
      ? findRoot(t, interpolatedProgress, cp1, cp2)
      : der === 0
      ? interpolatedProgress
      : approxRoot(t, der, der + 0.1, cp1, cp2)
  }
}
