function* MergeSortGenerator(array) {
  let comparisons = 0
  let mainArrayWrites = 0
  let auxiliaryArrayWrites = 0
  let snapshot
  snapshot = takeSnapshot(
    comparisons,
    mainArrayWrites,
    auxiliaryArrayWrites,
    [...array],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  )
  yield snapshot

  yield* MergeSort(array, 0, array.length - 1)

  function* MergeSort(A, p, r) {
    if (p >= r) {
      return
    }
    const q = Math.floor((p + r) / 2)
    snapshot = takeSnapshot(
      comparisons,
      mainArrayWrites,
      auxiliaryArrayWrites,
      [...A],
      p,
      q,
      r,
      null,
      null,
      null,
      null,
      null
    )
    yield snapshot
    yield* MergeSort(A, p, q)
    yield* MergeSort(A, q + 1, r)
    yield* Merge(A, p, q, r)
  }

  function* Merge(A, p, q, r) {
    const nL = q - p + 1
    const nR = r - q
    const tempLeft = [...A.slice(p, q + 1)]
    const tempRight = [...A.slice(q + 1, r + 1)]
    auxiliaryArrayWrites = auxiliaryArrayWrites + nL + nR

    let i = 0
    let j = 0
    let k = p

    while (i < nL && j < nR) {
      comparisons++
      comparisons++
      if (tempLeft[i] <= tempRight[j]) {
        A[k] = tempLeft[i]
        mainArrayWrites++
        i++
      } else {
        A[k] = tempRight[j]
        mainArrayWrites++
        j++
      }
      snapshot = takeSnapshot(
        comparisons,
        mainArrayWrites,
        auxiliaryArrayWrites,
        [...A],
        p,
        q,
        r,
        k,
        i,
        [...tempLeft],
        j,
        [...tempRight]
      )
      yield snapshot
      k++
    }

    while (i < nL) {
      comparisons++
      A[k] = tempLeft[i]
      mainArrayWrites++
      snapshot = takeSnapshot(
        comparisons,
        mainArrayWrites,
        auxiliaryArrayWrites,
        [...A],
        p,
        q,
        r,
        k,
        i,
        [...tempLeft],
        j,
        [...tempRight]
      )
      yield snapshot
      i++
      k++
    }

    while (j < nR) {
      comparisons++
      A[k] = tempRight[j]
      mainArrayWrites++
      snapshot = takeSnapshot(
        comparisons,
        mainArrayWrites,
        auxiliaryArrayWrites,
        [...A],
        p,
        q,
        r,
        k,
        i,
        [...tempLeft],
        j,
        [...tempRight]
      )
      yield snapshot
      j++
      k++
    }
  }
  snapshot = takeSnapshot(
    comparisons,
    mainArrayWrites,
    auxiliaryArrayWrites,
    [...array],
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  )
  yield snapshot
}

function takeSnapshot(
  comparisons = null,
  mainArrayWrites = null,
  auxiliaryArrayWrites = null,
  arraySnapshot = null,
  leftIndex = null,
  midIndex = null,
  rightIndex = null,
  activeMainIndex = null,
  leftTempArray = null,
  leftTempIndex = null,
  rightTempArray = null,
  rightTempIndex = null
) {
  return {
    comparisons: comparisons,
    mainArrayWrites: mainArrayWrites,
    auxiliaryArrayWrites: auxiliaryArrayWrites,
    arraySnapshot: arraySnapshot,
    leftIndex: leftIndex,
    midIndex: midIndex,
    rightIndex: rightIndex,
    activeMainIndex: activeMainIndex,
    leftTempArray: leftTempArray,
    leftTempIndex: leftTempIndex,
    rightTempArray: rightTempArray,
    rightTempIndex: rightTempIndex,
  }
}

export default MergeSortGenerator
