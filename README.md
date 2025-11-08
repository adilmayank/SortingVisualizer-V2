# A Sorting Visualizer

### Aim  
A small React app that visualises four sorting algorithms — **Insertion**, **Merge**, **Heap**, and **Quick** — allowing users to see how comparisons and swaps evolve the array step by step. The app provides controls for algorithm selection, array size, and animation speed, along with a special **heap view** that displays the tree structure alongside the traditional bar visualization.

---

## Technical Details

### High-Level Architecture
- **Single-page React app** with `App` as the main component managing state and layout.  
- **ControlCenter**: Handles all user controls (algorithm, speed, array size, randomize, sort).  
- **VisualizationContainer**: Displays array bars and heap/tree structures based on snapshot data.  
- **Sorting Algorithms** implemented as **generator functions**, each yielding snapshots describing intermediate array states.  
- **Toast system** provides real-time notifications like "Array is sorted" or "Already sorted".

---

### State and Data Flow
- Core state variables (`inputArray`, `arraySize`, `selectedAlgorithm`, `sortingSpeed`, `isSortingHappening`, etc.) live in `App.jsx`.  
- `ControlCenter` updates these via props and event handlers.  
- `VisualizationContainer` is **stateless** and purely visual, rendering based on props.  
- During sorting, `ControlCenter` consumes algorithm generators using `.next()`, updating array state on each yielded snapshot to trigger re-rendering.

---

### Sorting Implementation
- Each algorithm (Insertion, Merge, Heap, Quick) is implemented as a **generator** that:
  - Performs sorting logic step-by-step.  
  - **Yields snapshots** after each comparison, swap, or recursion step.  
  - Tracks metrics like:
    - `comparisons`
    - `mainArrayWrites`
    - (optionally) `auxiliaryArrayWrites`
    - algorithm-specific markers (e.g., `pivotIndex`, `heapSize`, etc.)
- **Heap Sort** adds an **extra visualization** of the heap’s binary tree structure using `parentIndex`, `leftChildIndex`, and `rightChildIndex`.

---

### Snapshot Model
Each yielded snapshot is a serializable object describing:
- The **array state** (`arraySnapshot`).
- **Performance metrics** (`comparisons`, `mainArrayWrites`, etc.).
- **Algorithm-specific metadata** like pivots, active indices, or heap positions.

Snapshots are immutable and are used solely for visualization — no mutation occurs downstream.

---

### Visualization and Animation
- The animation loop is controlled via `updateArrayWithDelay()`, which:
  - Calls `.next()` on the generator.
  - Updates array and metadata states.
  - Waits for a delay based on the current `sortingSpeed`.
- After the generator completes:
  - A **final animation** marks all bars as sorted.
  - Sorting state resets, re-enabling controls.
- CSS class toggling (`bar`, `sorted`, etc.) provides visual feedback for comparisons and swaps.

---

### User Controls and UX
- **Algorithm Selector**: Choose between the four algorithms.  
- **Array Size**: Adjustable with numeric input (10–200 range).  
- **Sorting Speed**: Options from *Super Fast* to *Super Slow*.  
- **Randomize Button**: Generates a new random array.  
- **Sort Button**: Starts the visualization.  
- **Toast Notifications**: Show progress or state messages (e.g., already sorted arrays).

---

### Array Generation and Layout
- Random arrays are generated using `CreateRandomArray`, scaled to fit container height dynamically.
- Array size changes automatically regenerate and re-render the visualization.
- Visualization uses **vertical bars** proportional to element values.

---

### DOM and Side Effects
- Some helper functions directly access DOM elements (via `querySelectorAll`) for simplicity:
  - Resetting bar/heap classes.
  - Animating sorted completion sequence.
- These are isolated and could be migrated to **React refs** if needed.

---

### Performance Notes
- Each snapshot clones the array for simplicity — clean and predictable, though memory-heavy for large arrays.
- The app caps array size to avoid performance drops.
- Animation pacing uses `setTimeout` based on sorting speed for consistent timing.

---

### Extensibility
- To add a new algorithm:
  1. Implement it as a generator yielding snapshots in the same shape.
  2. Register it in `ControlCenter`’s algorithm list.
- To add new metrics or visual hints:
  - Extend the snapshot model.
  - Update `VisualizationContainer` to read and display them.

---

### Limitations
- Entirely client-side; no backend.  
- Snapshot cloning increases memory use for large arrays.  
- Direct DOM queries are minimal but not “React-pure.”  
- Designed for clarity and learning, not benchmarking performance.

---

### Summary
This app is a **visual playground for sorting algorithms** — simple enough for learners to understand algorithm flow, yet structured enough for developers to extend or optimize further. The heap visualization adds an extra layer of depth, showing not just how values move, but also how the algorithm perceives structure internally.
