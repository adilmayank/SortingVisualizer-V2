import { useState, useEffect } from 'react'
import ControlCenter from './ControlCenter'
import CreateRandomArray from './Utils/CreateRandomArray'
import VisualizationContainer from './Visualizations/VisualizationContainer'
import Toast from './Toast'

function App() {
  const [arraySize, setArraySize] = useState(30)
  const [inputArray, setInputArray] = useState(CreateRandomArray(arraySize))
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)
  const [sortingSpeed, setSortingSpeed] = useState(null)
  const [additionalInfoProps, setAdditionalInfoProps] = useState({})
  const [isSortingHappening, setIsSortingHappening] = useState(false)
  const [notification, setNotification] = useState(null)

  return (
    <>
      <div className="app-bg min-h-[700px] min-w-[1150px] w-full h-screen backdrop-blur-md font-sans flex justify-center items-center">
        <div className="main-container m-2 w-5/6 h-full flex flex-col relative justify-center items-center">
          {notification && (
            <Toast
              notification={notification}
              setNotification={setNotification}
            />
          )}
          <div className="title-container heading m-3 h-20 flex w-full justify-center items-center">
            <div className=" mx-1 text-2xl font-bold uppercase text-black p-3 border-2 border-black">
              A Sorting Visualizer
            </div>
          </div>
          <div className="content-container m-3 flex flex-col h-full w-full items-center">
            <ControlCenter
              arraySize={arraySize}
              inputArray={inputArray}
              selectedAlgorithm={selectedAlgorithm}
              sortingSpeed={sortingSpeed}
              setSortingSpeed={setSortingSpeed}
              isSortingHappening={isSortingHappening}
              setSelectedAlgorithm={setSelectedAlgorithm}
              setArraySize={setArraySize}
              setAdditionalInfoProps={setAdditionalInfoProps}
              setInputArray={setInputArray}
              setIsSortingHappening={setIsSortingHappening}
              setNotification={setNotification}
            />
            <VisualizationContainer
              inputArray={inputArray}
              selectedAlgorithm={selectedAlgorithm}
              additionalInfoProps={additionalInfoProps}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
