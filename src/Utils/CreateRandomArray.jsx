export function CreateRandomArray(length, max = 100) {
  return Array.from(
    { length: length },
    () => Math.floor(Math.random() * max ) + 1
  )
}

export default CreateRandomArray
