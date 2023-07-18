import { memo } from 'react'


// Container
const Bar = ({
  selectedAlgorithm,
  additionalInfoProps,
  height,
  width,
  index,
}) => {
  const classNamesList = ['bar']
  let classNamesString
  const heightInPx = `${height}px`
  const widthInPx = `${width}px`
  if (selectedAlgorithm === 'insertionSort') {
    const { initialPosition, beingCompared, finalPosition } =
      additionalInfoProps
    if (initialPosition === index) {
      classNamesList.push('insertion-initial')
    } else if (beingCompared === index) {
      classNamesList.push('insertion-comparing')
    } else if (finalPosition === index) {
      classNamesList.push('insertion-final')
    }
  } else if (selectedAlgorithm === 'mergeSort') {
    const { leftIndex, rightIndex, activeMainIndex } = additionalInfoProps
    if (index === leftIndex) {
      classNamesList.push('merge-left')
    } else if (index === rightIndex) {
      classNamesList.push('merge-right')
    } else if (index > rightIndex && rightIndex) {
      classNamesList.push('merge-out-of-bound')
    } else if (index === activeMainIndex) {
      classNamesList.push('merge-comparing')
    }
  } else if (selectedAlgorithm === 'heapSort') {
    const { heapSize, parentIndex, leftChildIndex, rightChildIndex } =
      additionalInfoProps
    if (heapSize && index >= heapSize) {
      classNamesList.push('heap-out-of-bound')
    } else if (parentIndex === index) {
      classNamesList.push('heap-parent')
    } else if (leftChildIndex === index) {
      classNamesList.push('heap-left-child')
    } else if (rightChildIndex === index) {
      classNamesList.push('heap-right-child')
    }
  } else if (selectedAlgorithm === 'quickSort') {
  }
  classNamesString = classNamesList.join(' ')

  return (
    <BarPure
      classNames={classNamesString}
      height={heightInPx}
      width={widthInPx}
      key={index}
    />
  )
}

// Presentational
const BarPure = memo(({ classNames, height, width }) => {
  return (
    <>
      <div
        className={classNames}
        style={{ height: height, width: width }}
      ></div>
    </>
  )
})
export default Bar
