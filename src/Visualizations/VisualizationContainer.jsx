import PrimaryVisualizationContainer from './PrimaryVisualization'
import AdditionalVisualization from './AdditionalVisualization'

const VisualizationContainer = ({
  selectedAlgorithm,
  inputArray,
  additionalInfoProps,
}) => {
  return (
    <>
      <div className="visuzalization-container grid grid-cols-12 my-14 w-full h-full">
        <PrimaryVisualizationContainer
          selectedAlgorithm={selectedAlgorithm}
          inputArray={inputArray}
          additionalInfoProps={additionalInfoProps}
        />
        <AdditionalVisualization
          selectedAlgorithm={selectedAlgorithm}
          inputArray={inputArray}
          additionalInfoProps={additionalInfoProps}
        />
      </div>
    </>
  )
}
export default VisualizationContainer
