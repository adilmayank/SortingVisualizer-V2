function* QuickSortGenerator(A) {
  let comparisons = 0
  let mainArrayWrites = 0
  let snapshot
  snapshot = takeSnapshot(comparisons, mainArrayWrites, [...A])
  yield snapshot
  yield* QuickSort(A, 0, A.length - 1)

  function* QuickSort(A, p, r) {
    comparisons++
    if (p < r) {
      const q = yield* Partition(A, p, r)
      yield* QuickSort(A, p, q - 1)
      yield* QuickSort(A, q + 1, r)
    }
  }

  function* Partition(A, p, r) {
    // let pivot = A[r]
    const pivotIndex = r
    let i = p
    for (let j = p; j < r; j++) {
      snapshot = takeSnapshot(
        comparisons,
        mainArrayWrites,
        [...A],
        pivotIndex,
        i,
        j,
        null
      )
      yield snapshot
      comparisons++
      if (A[j] <= A[pivotIndex]) {
        snapshot = takeSnapshot(
          comparisons,
          mainArrayWrites,
          [...A],
          pivotIndex,
          i,
          j,
          null
        )
        yield snapshot
        ExchangeElements(A, i, j)
        snapshot = takeSnapshot(
          comparisons,
          mainArrayWrites,
          [...A],
          pivotIndex,
          i,
          j,
          null
        )
        yield snapshot
        i++
      }
    }
    ExchangeElements(A, i, r)
    snapshot = takeSnapshot(
      comparisons,
      mainArrayWrites,
      [...A],
      pivotIndex,
      null,
      null,
      i
    )
    yield snapshot
    return i
  }

  function ExchangeElements(A, a, b) {
    if (a === b) {
      return
    }
    const tempFirstElement = A[a]
    mainArrayWrites++
    mainArrayWrites++
    A[a] = A[b]
    A[b] = tempFirstElement
  }
}

function takeSnapshot(
  comparisons = null,
  mainArrayWrites = null,
  arraySnapshot = null,
  pivotIndex = null,
  pivotFrontierIndex = null,
  comparedWithPivotIndex = null,
  pivotFinalIndex = null
) {
  return {
    comparisons: comparisons,
    mainArrayWrites: mainArrayWrites,
    arraySnapshot: arraySnapshot,
    pivotIndex: pivotIndex,
    pivotFrontierIndex: pivotFrontierIndex,
    comparedWithPivotIndex: comparedWithPivotIndex,
    pivotFinalIndex: pivotFinalIndex,
    isPivotPositionFinal: pivotFinalIndex !== null ? true : false,
  }
}

export default QuickSortGenerator