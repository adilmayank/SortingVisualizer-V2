function* InsertionSortGenerator(array) {
  let comparisons = 0
  let mainArrayWrites = 0
  let key
  let j
  let snapshot

  for (let i = 1; i <= array.length - 1; i++) {
    snapshot = takeSnapshot(comparisons, mainArrayWrites, i, null, null, [
      ...array,
    ])
    yield snapshot

    comparisons++
    key = array[i]
    j = i - 1

    while (j >= 0 && array[j] > key) {
      comparisons++

      snapshot = takeSnapshot(comparisons, mainArrayWrites, null, j, null, [
        ...array,
      ])
      yield snapshot
      
      array[j + 1] = array[j]
      mainArrayWrites++
      j--

      // snapshot = takeSnapshot(comparisons, mainArrayWrites, null, j, null, [
      //   ...array,
      // ])
      // yield snapshot
    }

    array[j + 1] = key
    snapshot = takeSnapshot(comparisons, mainArrayWrites, null, null, j + 1, [
      ...array,
    ])
    yield snapshot
  }
  snapshot = takeSnapshot(comparisons, mainArrayWrites, null, null, null, [
    ...array,
  ])
  yield snapshot
}

function takeSnapshot(
  comparisons = null,
  mainArrayWrites = null,
  initialPosition = null,
  beingCompared = null,
  finalPosition = null,
  arraySnapshot = null
) {
  return {
    comparisons: comparisons,
    mainArrayWrites: mainArrayWrites,
    initialPosition: initialPosition,
    beingCompared: beingCompared,
    finalPosition: finalPosition,
    arraySnapshot: arraySnapshot,
  }
}

export default InsertionSortGenerator
