import Bar from './Bar'

const PrimaryVisualizationContainer = ({
  selectedAlgorithm,
  inputArray,
  additionalInfoProps,
}) => {
  return (
    <>
      <div className="sorting-box-container col-span-8 flex flex-col frosted mr-3 h-full rounded-lg">
        <Legends selectedAlgorithm={selectedAlgorithm} />
        <div className="bar-area-container overflow-auto h-5/6 w-full flex flex-col p-3">
          <div className="bar-area">
            {inputArray.map((item, index) => {
              return (
                <Bar
                  height={item}
                  width="8px"
                  key={index}
                  index={index}
                  additionalInfoProps={additionalInfoProps}
                  selectedAlgorithm={selectedAlgorithm}
                />
              )
            })}
          </div>
          <div className="bars-base h-2 bg-white w-full rounded-sm"></div>
        </div>
      </div>
    </>
  )
}

const Legends = ({ selectedAlgorithm }) => {
  let legendNames = []
  if (selectedAlgorithm === 'insertionSort') {
    legendNames = [
      { name: 'Initial', className: 'insertion-initial' },
      { name: 'Final', className: 'insertion-final' },
      { name: 'Comparing', className: 'insertion-comparing' },
    ]
  } else if (selectedAlgorithm === 'mergeSort') {
    legendNames = [
      { name: 'Left', className: 'merge-left' },
      { name: 'Right', className: 'merge-right' },
      { name: 'Comparing', className: 'merge-comparing' },
      { name: 'Inactive Range', className: 'merge-out-of-bound' },
    ]
  } else if (selectedAlgorithm === 'heapSort') {
    legendNames = [
      { name: 'Parent', className: 'heap-parent' },
      { name: 'Left Child', className: 'heap-left-child' },
      { name: 'Right Child', className: 'heap-right-child' },
      { name: 'Inactive Range', className: 'heap-out-of-bound' },
    ]
  }
  return (
    <div className="h-1/6 w-full p-3 flex flex-col">
      <div className=" grid items-center grid-flow-col w-full h-full bg-slate-600/50 rounded-lg ">
        {legendNames.map((item, index) => {
          return (
            <div
              className="flex justify-start items-center rounded-md text-white font-semibold text-xs bg-slate-800/80 h-5/6 m-1 px-3"
              key={index}
            >
              <div className="px-1 flex-1">
                <span>{item.name}</span>
              </div>
              <div className={`flex-1 flex justify-center`}>
                <div className={`p-2 w-4/6 rounded-md ${item.className}`}></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PrimaryVisualizationContainer
