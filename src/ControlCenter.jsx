import { useEffect } from 'react'
import CreateRandomArray from './Utils/CreateRandomArray'
import InsertionSortGenerator from './Algorithms/InsertionSort'
import HeapSortGenerator from './Algorithms/HeapSort'
import MergeSortGenerator from './Algorithms/MergeSort'
import QuickSortGenerator from './Algorithms/QuickSort'
import CheckIfArrayIsSorted from './Utils/CheckIfAlreadySorted'

const ControlCenter = ({
  inputArray,
  arraySize,
  sortingSpeed,
  setArraySize,
  setInputArray,
  setSortingSpeed,
  selectedAlgorithm,
  setSelectedAlgorithm,
  setAdditionalInfoProps,
  isSortingHappening,
  setIsSortingHappening,
  setNotification,
}) => {
  useEffect(() => {
    const barAreaContainer = document.querySelector('.bar-area')
    const barAreaHeight = barAreaContainer.clientHeight
    setAdditionalInfoProps({})
    setBarsAsUnsorted()
    setInputArray(CreateRandomArray(arraySize, barAreaHeight))
  }, [arraySize])

  const AlgorithmOptions = {
    insertionSort: { text: 'Insertion Sort', active: true },
    mergeSort: { text: 'Merge Sort', active: false },
    heapSort: { text: 'Heap Sort', active: false },
    quickSort: { text: 'Quick Sort', active: false },
  }

  const SortingSpeedOptions = {
    superFast: {
      name: 'superFast',
      text: 'Super Fast',
      value: 10,
      active: true,
    },
    fast: { name: 'fast', text: 'Fast', value: 50, active: false },
    slow: { name: 'slow', text: 'Slow', value: 350, active: false },
    superSlow: {
      name: 'superSlow',
      text: 'Super Slow',
      value: 500,
      active: false,
    },
  }

  useEffect(() => {
    let defaultSelectedAlgorithm, defaultSortingSpeed
    Object.keys(SortingSpeedOptions).map((item) => {
      if (SortingSpeedOptions[item].active) {
        defaultSortingSpeed = SortingSpeedOptions[item].value
      }
    })
    Object.keys(AlgorithmOptions).map((item) => {
      if (AlgorithmOptions[item].active) {
        defaultSelectedAlgorithm = item
      }
    })
    setSelectedAlgorithm(defaultSelectedAlgorithm)
    setSortingSpeed(defaultSortingSpeed)
  }, [])

  // handler
  const notifyUser = (message) => {
    setNotification(message)
  }

  // handler
  const handleRandomize = () => {
    if (!isSortingHappening) {
      const barAreaContainer = document.querySelector('.bar-area')
      const barAreaHeight = barAreaContainer.clientHeight
      setInputArray(CreateRandomArray(arraySize, barAreaHeight))
      setAdditionalInfoProps({})
      setBarsAsUnsorted()
    }
  }

  // handler
  const handleArraySizeChange = (inputArraySize) => {
    if (inputArraySize >= 0 && inputArraySize <= 200) {
      setArraySize(inputArraySize)
    }
  }

  // handler
  const handleAlgorithmSelectorChange = (algorithm) => {
    setSelectedAlgorithm(algorithm)
  }

  // handler
  const handleSortingSpeedChange = (speed) => {
    setSortingSpeed(SortingSpeedOptions[speed].value)
  }

  // handler
  const handleSort = () => {
    if (!isSortingHappening) {
      let tempInputArray = [...inputArray]
      if (CheckIfArrayIsSorted(inputArray)) {
        notifyUser("Array is already sorted 😉")
      } else {
        let sortingGenerator
        if (selectedAlgorithm === 'insertionSort') {
          sortingGenerator = InsertionSortGenerator(tempInputArray)
        } else if (selectedAlgorithm === 'heapSort') {
          sortingGenerator = HeapSortGenerator(tempInputArray)
        } else if (selectedAlgorithm === 'mergeSort') {
          sortingGenerator = MergeSortGenerator(tempInputArray)
        } else if (selectedAlgorithm === 'quickSort') {
          sortingGenerator = QuickSortGenerator(tempInputArray)
        }
        setIsSortingHappening(true)
        updateArrayWithDelay(sortingGenerator)
      }
    }
  }

  // side effect
  const setBarsAsUnsorted = () => {
    const bars = document.querySelectorAll('.bar')
    const heaps = document.querySelectorAll('.heap')
    for (let bar of bars) {
      bar.setAttribute('class', 'bar')
    }
    for (let heap of heaps) {
      heap.setAttribute('class', 'heap')
    }
  }

  // side effect
  const animateAsSorted = () => {
    const bars = document.querySelectorAll('.bar')
    const heaps = document.querySelectorAll('.heap')
    const animateBarAsSorted = (bars, index) => {
      if (index < bars.length) {
        setTimeout(() => {
          bars[index].setAttribute('class', 'bar sorted')
          heaps.length > 0 && heaps[index].setAttribute('class', 'heap sorted')
          animateBarAsSorted(bars, index + 1)
        }, 1000 / bars.length)
      } else {
        setIsSortingHappening(false)
      }
    }
    animateBarAsSorted(bars, 0)
  }

  // side effect
  const updateArrayWithDelay = (generator) => {
    const { done, value } = generator.next()
    if (!done) {
      const {
        comparisons,
        mainArrayWrites,
        auxiliaryArrayWrites,
        arraySnapshot,
        ...otherProps
      } = value
      setTimeout(() => {
        setInputArray([...arraySnapshot])
        setAdditionalInfoProps({
          comparisons,
          mainArrayWrites,
          auxiliaryArrayWrites,
          ...otherProps,
        })
        updateArrayWithDelay(generator)
      }, sortingSpeed)
    } else {
      animateAsSorted()
      notifyUser('Array is sorted')
    }
  }

  return (
    <>
      <div className="control-center-container px-2 py-2 frosted justify-center rounded-lg flex w-full">
        <div className="control-center p-4 grid grid-cols-4 w-full">
          <div className="algorithm-selector-container w-full">
            <div className="algorithm-selector w-4/6 flex flex-col">
              <div className="label">
                <span>Algorithm</span>
              </div>
              <select
                className="control-input"
                name="algorithm"
                id="algorithm"
                placeholder="select an algorithm"
                onChange={(e) =>
                  handleAlgorithmSelectorChange(e.currentTarget.value)
                }
                disabled={isSortingHappening}
              >
                {Object.keys(AlgorithmOptions).map((item, index) => {
                  return (
                    <option
                      className={`algorithm-button button ${
                        item === selectedAlgorithm && 'active'
                      }`}
                      key={index}
                      value={item}
                      id={item}
                    >
                      {AlgorithmOptions[item].text}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="array-length-selector-container w-full">
            <div className="array-length-selector w-4/6 flex flex-col">
              <label htmlFor="array-size" className="label">
                <span>Array Size</span>
              </label>
              <input
                name="array-size"
                className="control-input"
                type="number"
                min={10}
                max={200}
                value={arraySize}
                onChange={(e) => handleArraySizeChange(e.target.value)}
                disabled={isSortingHappening}
              />
            </div>
          </div>
          <div className="sorting-speed-selector-container w-full">
            <div className="sorting-speed-selector w-4/6 flex flex-col">
              <div className="label">
                <span>Sorting Speed</span>
              </div>
              <select
                name="sorting-speed"
                className="control-input"
                id="sorting-speed"
                onChange={(e) => handleSortingSpeedChange(e.target.value)}
                disabled={isSortingHappening}
              >
                {Object.keys(SortingSpeedOptions).map((item, index) => {
                  return (
                    <option value={SortingSpeedOptions[item].name} key={index}>
                      {SortingSpeedOptions[item].text}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div
            className="action-buttons-container justify-evenly items-end
               grid grid-cols-2 gap-2 w-full"
          >
            <div
              className="randomize-button-container control-button-container"
              onClick={() => handleRandomize()}
              aria-disabled={isSortingHappening}
            >
              <div className="randomize-button control-button">
                <span>Randomize</span>
              </div>
            </div>
            <div
              className="sort-button-container control-button-container"
              onClick={handleSort}
            >
              <div className=" sort-button control-button">
                <span>Sort</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ControlCenter
