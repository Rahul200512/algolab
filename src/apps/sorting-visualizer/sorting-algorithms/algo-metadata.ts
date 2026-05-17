/**
 * Per-algorithm metadata: display name, Big-O badges, and pseudocode.
 * Kept in a single map so UI components (Header, Pseudocode panel) stay in sync.
 */

export interface AlgoMetadata {
  displayName: string;
  best: string;
  average: string;
  worst: string;
  space: string;
  description: string;
  pseudocode: string[];
}

export const algoMetadata: Record<string, AlgoMetadata> = {
  bubble: {
    displayName: 'Bubble Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    description:
      'Repeatedly steps through the list, compares adjacent items, and swaps them if they are in the wrong order.',
    pseudocode: [
      'for i from 0 to n - 1',
      '  swapped = false',
      '  for j from 0 to n - i - 2',
      '    if arr[j] > arr[j + 1]',
      '      swap arr[j], arr[j + 1]',
      '      swapped = true',
      '  if not swapped: break',
    ],
  },
  selection: {
    displayName: 'Selection Sort',
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    description:
      'Finds the smallest element in the unsorted portion and moves it to the front, one position at a time.',
    pseudocode: [
      'for i from 0 to n - 1',
      '  minIndex = i',
      '  for j from i + 1 to n - 1',
      '    if arr[j] < arr[minIndex]',
      '      minIndex = j',
      '  swap arr[i], arr[minIndex]',
    ],
  },
  insertion: {
    displayName: 'Insertion Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    description:
      'Builds the sorted array one element at a time by inserting each into its correct position.',
    pseudocode: [
      'for i from 1 to n - 1',
      '  key = arr[i]',
      '  j = i - 1',
      '  while j >= 0 and arr[j] > key',
      '    arr[j + 1] = arr[j]',
      '    j = j - 1',
      '  arr[j + 1] = key',
    ],
  },
  heap: {
    displayName: 'Heap Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
    description:
      'Builds a max-heap, then repeatedly extracts the largest element to the end of the array.',
    pseudocode: [
      'build max-heap from arr',
      'for i from n - 1 down to 1',
      '  swap arr[0], arr[i]',
      '  heap-size = i',
      '  heapify(arr, 0)',
    ],
  },
  merge: {
    displayName: 'Merge Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    description:
      'Divides the array in half, recursively sorts each half, then merges them back together.',
    pseudocode: [
      'mergeSort(arr, left, right):',
      '  if left >= right: return',
      '  mid = (left + right) / 2',
      '  mergeSort(arr, left, mid)',
      '  mergeSort(arr, mid + 1, right)',
      '  merge(arr, left, mid, right)',
    ],
  },
  quick: {
    displayName: 'Quick Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    description:
      'Picks a pivot and partitions the array so smaller elements go left and larger go right, then recurses.',
    pseudocode: [
      'quickSort(arr, low, high):',
      '  if low >= high: return',
      '  pivot = partition(arr, low, high)',
      '  quickSort(arr, low, pivot - 1)',
      '  quickSort(arr, pivot + 1, high)',
    ],
  },
  shell: {
    displayName: 'Shell Sort',
    best: 'O(n log n)',
    average: 'O(n^1.25)',
    worst: 'O(n²)',
    space: 'O(1)',
    description:
      'Generalized insertion sort that compares elements far apart and gradually shrinks the gap.',
    pseudocode: [
      'for gap = n / 2; gap > 0; gap /= 2',
      '  for i from gap to n - 1',
      '    temp = arr[i]',
      '    j = i',
      '    while j >= gap and arr[j - gap] > temp',
      '      arr[j] = arr[j - gap]',
      '      j -= gap',
      '    arr[j] = temp',
    ],
  },
  cocktail: {
    displayName: 'Cocktail Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    description:
      'A bidirectional bubble sort: traverses the array forwards and backwards on alternating passes.',
    pseudocode: [
      'do',
      '  swapped = false',
      '  for i from start to end - 1',
      '    if arr[i] > arr[i + 1]: swap, swapped = true',
      '  if not swapped: break',
      '  end -= 1',
      '  for i from end - 1 down to start',
      '    if arr[i] > arr[i + 1]: swap, swapped = true',
      '  start += 1',
      'while swapped',
    ],
  },
};

export function getMeta(name: string): AlgoMetadata {
  return (
    algoMetadata[name] ?? {
      displayName: name,
      best: '—',
      average: '—',
      worst: '—',
      space: '—',
      description: '',
      pseudocode: [],
    }
  );
}
