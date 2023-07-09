import { useEffect, useState, useRef } from 'react'

const Heap = ({ inputArray, additionalInfoProps }) => {
  if (inputArray.length > 30) {
    return (
      <>
        <div className="h-full w-full flex flex-col justify-center items-center">
          <p className="font-bold uppercase my-1 flex justify-center p-1 text-center lg:text-lg sm:text-md xl:text-xl ">
            ❌ Heap Too Big ❌
          </p>
          <p className="text-md uppercase flex justify-center p-1 text-center my-1">
            Input array must be less than 30
          </p>
        </div>
      </>
    )
  }
  return (
    <HeapContainer
      inputArray={inputArray}
      additionalInfoProps={additionalInfoProps}
    />
  )
}

const HeapContainer = ({ inputArray, additionalInfoProps }) => {
  let { heapSize, parentIndex, leftChildIndex, rightChildIndex } =
    additionalInfoProps
  const svgRef = useRef(null)
  const [radius, setRadius] = useState(0)
  const [circlePositions, setCirclePositions] = useState([])
  const [linePositions, setLinePositions] = useState({})

  useEffect(() => {
    const svg = svgRef.current
    const svgHeight = svg.clientHeight
    const svgWidth = svg.clientWidth
    const radius = (svgHeight * svgWidth) / 0.6 / inputArray.length / 1000
    const heapNodeCount = Math.min(
      inputArray.length,
      Math.pow(2, Math.floor(Math.log2(inputArray.length)) + 1) - 1
    )
    let heapNodeIndex = 0
    setRadius(radius)
    setCirclePositions([])
    setLinePositions([])

    const rows = Math.floor(Math.log2(heapNodeCount)) + 1
    let tempCirclePositions = []
    let tempLinePositions = []

    // setting positions for cirlce
    for (let row = 1; row <= rows; row++) {
      const y_pos = (svgHeight / (rows + 1)) * row + 1 / 2
      const columns = Math.pow(2, row - 1)
      for (let column = 1; column <= columns; column++) {
        if (heapNodeIndex >= heapNodeCount) {
          break
        }
        const x_pos = (svgWidth / (columns + 1)) * column
        tempCirclePositions = [
          ...tempCirclePositions,
          { x_pos: x_pos, y_pos: y_pos },
        ]
        heapNodeIndex++
      }
    }

    // setting positions for line
    tempCirclePositions.map((item, index) => {
      if (index < Math.floor(tempCirclePositions.length / 2)) {
        const leftChildIndex = getLeftChildIndex(
          index,
          tempCirclePositions.length
        )
        const rightChildIndex = getRightChildIndex(
          index,
          tempCirclePositions.length
        )

        if (leftChildIndex) {
          tempLinePositions = [
            ...tempLinePositions,
            {
              x1: item['x_pos'],
              y1: item['y_pos'],
              x2: tempCirclePositions[leftChildIndex]['x_pos'],
              y2: tempCirclePositions[leftChildIndex]['y_pos'],
            },
          ]
        }

        if (rightChildIndex) {
          tempLinePositions = [
            ...tempLinePositions,
            {
              x1: item['x_pos'],
              y1: item['y_pos'],
              x2: tempCirclePositions[rightChildIndex]['x_pos'],
              y2: tempCirclePositions[rightChildIndex]['y_pos'],
            },
          ]
        }
      }
    })
    setCirclePositions(tempCirclePositions)
    setLinePositions(tempLinePositions)
  }, [inputArray])

  return (
    <svg className="h-full w-full" ref={svgRef}>
      {circlePositions.length > 0 &&
        circlePositions.map((circlePosition, index) => {
          return (
            <>
              <Node
                key={index}
                radius={radius}
                position={circlePosition}
                className={''}
              />
            </>
          )
        })}
      {linePositions.length > 0 &&
        linePositions.map((linePosition, index) => {
          return (
            <>
              <Edge index={index} position={linePosition} />
            </>
          )
        })}
    </svg>
  )
}

function getLeftChildIndex(parentIndex, arraySize) {
  return 2 * parentIndex + 1 < arraySize && 2 * parentIndex + 1
}

function getRightChildIndex(parentIndex, arraySize) {
  return 2 * parentIndex + 2 < arraySize && 2 * parentIndex + 2
}

const Node = ({ position, radius, className }) => {
  return (
    <>
      <circle
        className={className}
        r={radius}
        cx={position.x_pos}
        cy={position.y_pos}
      ></circle>
    </>
  )
}

const Edge = ({ position }) => {
  return (
    <>
      <line
        x1={position['x1']}
        y1={position['y1']}
        x2={position['x2']}
        y2={position['y2']}
        stroke="black"
        strokeWidth={2}
      ></line>
    </>
  )
}

const NodeConnector = () => {}

export default Heap
