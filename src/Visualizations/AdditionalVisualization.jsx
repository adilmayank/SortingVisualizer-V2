import Heap from './Heap'

const AdditionalVisualization = ({
  selectedAlgorithm,
  inputArray,
  additionalInfoProps,
}) => {
  return (
    <>
      <div className="additional-visualization-container col-span-4 ml-3 frosted h-full rounded-lg">
        <AdditionalInfoText additionalInfoProps={additionalInfoProps} />
        <AdditionalInfoVisualizer
          selectedAlgorithm={selectedAlgorithm}
          inputArray={inputArray}
          additionalInfoProps={additionalInfoProps}
        />
      </div>
    </>
  )
}

const AdditionalInfoText = ({ additionalInfoProps }) => {
  const { comparisons, mainArrayWrites, auxiliaryArrayWrites } =
    additionalInfoProps

  return (
    <>
      <div className="h-1/6 w-full p-3 flex flex-col">
        <div className="flex items-center  w-full h-full bg-slate-600/50 rounded-lg">
          {comparisons === undefined && (
            <div className="flex justify-center items-center rounded-md text-white font-semibold text-xs bg-slate-800/80 h-5/6 m-1 px-3 flex-1">
              <div className="px-1 uppercase">
                <span>😃 Start Sorting to see Additional Info 😃</span>
              </div>
            </div>
          )}
          {comparisons !== undefined && (
            <div className="flex justify-between items-center rounded-md text-white font-semibold text-xs bg-slate-800/80 h-5/6 m-1 px-3 flex-1">
              <div className="px-1 flex-2 w-4/5">
                <span>Comparisons: </span>
              </div>
              <div className="flex justify-center w-1/5">
                <span className="px-1 rounded-md">{comparisons}</span>
              </div>
            </div>
          )}
          {mainArrayWrites !== undefined && (
            <div className="flex justify-between items-center rounded-md text-white font-semibold text-xs bg-slate-800/80 h-5/6 m-1 px-3 flex-1">
              <div className="px-1  w-4/5">
                <span>Main Array Writes: </span>
              </div>
              <div className="flex justify-center w-1/5">
                <span className="px-1 rounded-md">{mainArrayWrites}</span>
              </div>
            </div>
          )}

          {/* {auxiliaryArrayWrites && (
              <div className="flex justify-between items-center rounded-md text-white font-semibold text-xs bg-slate-800/80 h-5/6 m-1 px-3 flex-1">
                <div className="px-1">
                  <span>Auxiliary Array Writes: </span>
                </div>
                <div className="flex justify-center">
                  <span className="p-2 w-4/6 rounded-md">
                    {auxiliaryArrayWrites}
                  </span>
                </div>
              </div>
            )} */}
        </div>
      </div>
    </>
  )
}

const AdditionalInfoVisualizer = ({
  selectedAlgorithm,
  inputArray,
  additionalInfoProps,
}) => {
  return (
    <>
      <div className="additional-visualization flex flex-col justify-center items-center h-5/6 w-full p-2">
        {selectedAlgorithm === 'heapSort' && (
          <Heap
            inputArray={inputArray}
            additionalInfoProps={additionalInfoProps}
          />
        )}
      </div>
    </>
  )
}

export default AdditionalVisualization
