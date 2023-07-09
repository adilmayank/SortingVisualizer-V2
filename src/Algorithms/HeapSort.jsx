function* HeapSortGenerator(inputArray) {
  let comparisons = 0
  let mainArrayWrites = 0
  let snapshot
  yield* HeapSort(inputArray)

  function* HeapSort(inputArray) {
    const inputArrayObject = { array: inputArray, heapSize: null }
    yield* BuildMaxHeap(inputArrayObject, inputArrayObject.array.length)

    for (let i = inputArray.length - 1; i >= 0; i--) {
      ExchangeElements(inputArrayObject, 0, i)
      inputArrayObject.heapSize = inputArrayObject.heapSize - 1
      yield* MaxHeapify(inputArrayObject, 0)
    }

    snapshot = takeSnapshot(
      comparisons,
      mainArrayWrites,
      inputArrayObject,
      null,
      null,
      null
    )
    yield snapshot
  }

  function* MaxHeapify(arrayObject, i) {
    const L = Left(i)
    const R = Right(i)
    let largest

    comparisons++
    comparisons++
    if (
      L <= arrayObject.heapSize - 1 &&
      arrayObject.array[L] > arrayObject.array[i]
    ) {
      largest = L
    } else {
      largest = i
    }

    comparisons++
    comparisons++
    if (
      R <= arrayObject.heapSize - 1 &&
      arrayObject.array[R] > arrayObject.array[largest]
    ) {
      largest = R
    }

    snapshot = takeSnapshot(comparisons, mainArrayWrites, arrayObject, i, L, R)
    yield snapshot

    comparisons++
    if (largest !== i) {
      ExchangeElements(arrayObject, i, largest)
      snapshot = takeSnapshot(
        comparisons,
        mainArrayWrites,
        arrayObject,
        largest,
        largest === L ? i : L,
        largest === R ? i : R
      )
      yield snapshot
      yield* MaxHeapify(arrayObject, largest)
    }
  }

  function* BuildMaxHeap(arrayObject, n) {
    arrayObject.heapSize = n
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      yield* MaxHeapify(arrayObject, i)
    }
  }

  function ExchangeElements(arrayObject, a, b) {
    const tempFirstElement = arrayObject.array[a]
    arrayObject.array[a] = arrayObject.array[b]
    arrayObject.array[b] = tempFirstElement
    mainArrayWrites++
    mainArrayWrites++
  }
}

function Left(i) {
  return 2 * i + 1
}

function Right(i) {
  return 2 * i + 2
}

function takeSnapshot(
  comparisons = null,
  mainArrayWrites = null,
  arrayObject = null,
  parentIndex = null,
  leftChildIndex = null,
  rightChildIndex = null
) {
  return {
    comparisons: comparisons,
    mainArrayWrites: mainArrayWrites,
    heapSize: arrayObject.heapSize,
    arraySnapshot: [...arrayObject.array],
    parentIndex: parentIndex,
    leftChildIndex:
      leftChildIndex < arrayObject.heapSize ? leftChildIndex : null,
    rightChildIndex:
      rightChildIndex < arrayObject.heapSize ? rightChildIndex : null,
  }
}

///... main code above this line
export default HeapSortGenerator
