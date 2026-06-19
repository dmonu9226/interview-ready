export interface CodeQuestion {
  id: number
  category: string
  question: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  explanation: string
  solution: string
  timeComplexity: string
  spaceComplexity: string
  priority: 'high' | 'medium' | 'low' | null
}

export const dsaCategories = [
  'all',
  'Arrays & Strings',
  'Stack & Queue',
  'HashMap / Objects',
  'Recursion',
  'JavaScript-Specific DSA',
  'React/UI-Oriented',
  'Testing (Jest & RTL)',
  'Java',
  'Node.js',
  'Express.js'
]

export const codeQuestionsData: CodeQuestion[] = [
  // Arrays & Strings
  {
    id: 1,
    category: 'Arrays & Strings',
    question: 'Reverse a string without using built-in methods',
    difficulty: 'Easy',
    explanation: 'Use two pointers approach - one at start, one at end. Swap characters and move pointers toward center.',
    solution: `function reverseString(str) {
  let chars = str.split('');
  let left = 0;
  let right = chars.length - 1;
  
  while (left < right) {
    // Swap characters
    let temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;
    
    left++;
    right--;
  }
  
  return chars.join('');
}

// Example
console.log(reverseString("hello")); // "olleh"`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 2,
    category: 'Arrays & Strings',
    question: 'Check if a string is palindrome',
    difficulty: 'Easy',
    explanation: 'Compare characters from both ends moving toward center. If all match, it\'s a palindrome.',
    solution: `function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

// Example
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 3,
    category: 'Arrays & Strings',
    question: 'Find duplicate elements in array',
    difficulty: 'Easy',
    explanation: 'Use a Set to track seen elements. If element already exists in Set, it\'s a duplicate.',
    solution: `function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  
  for (const num of arr) {
    if (seen.has(num)) {
      duplicates.add(num);
    } else {
      seen.add(num);
    }
  }
  
  return Array.from(duplicates);
}

// Example
console.log(findDuplicates([1, 2, 3, 2, 4, 3])); // [2, 3]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 4,
    category: 'Arrays & Strings',
    question: 'Remove duplicates from array',
    difficulty: 'Easy',
    explanation: 'Use Set which automatically removes duplicates, then convert back to array.',
    solution: `function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// Alternative without Set
function removeDuplicatesManual(arr) {
  const result = [];
  const seen = new Set();
  
  for (const item of arr) {
    if (!seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }
  
  return result;
}

// Example
console.log(removeDuplicates([1, 2, 2, 3, 3, 4])); // [1, 2, 3, 4]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 5,
    category: 'Arrays & Strings',
    question: 'Find first non-repeating character',
    difficulty: 'Medium',
    explanation: 'Count frequency of each character using Map, then find first character with count of 1.',
    solution: `function firstNonRepeatingChar(str) {
  const charCount = new Map();
  
  // Count frequency
  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  
  // Find first non-repeating
  for (const char of str) {
    if (charCount.get(char) === 1) {
      return char;
    }
  }
  
  return null;
}

// Example
console.log(firstNonRepeatingChar("leetcode"));    // "l"
console.log(firstNonRepeatingChar("aabb"));        // null`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 6,
    category: 'Arrays & Strings',
    question: 'Find second largest number',
    difficulty: 'Easy',
    explanation: 'Track largest and second largest in single pass. Update both as you iterate.',
    solution: `function findSecondLargest(arr) {
  let largest = -Infinity;
  let secondLargest = -Infinity;
  
  for (const num of arr) {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num !== largest) {
      secondLargest = num;
    }
  }
  
  return secondLargest === -Infinity ? null : secondLargest;
}

// Example
console.log(findSecondLargest([10, 5, 20, 8, 20])); // 10`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 7,
    category: 'Arrays & Strings',
    question: 'Move all zeros to end',
    difficulty: 'Easy',
    explanation: 'Use two pointers - one tracks position for non-zeros, another iterates. Move non-zeros forward, fill rest with zeros.',
    solution: `function moveZerosToEnd(arr) {
  let writePos = 0;
  
  // Move all non-zeros to front
  for (let readPos = 0; readPos < arr.length; readPos++) {
    if (arr[readPos] !== 0) {
      arr[writePos] = arr[readPos];
      writePos++;
    }
  }
  
  // Fill remaining positions with zeros
  while (writePos < arr.length) {
    arr[writePos] = 0;
    writePos++;
  }
  
  return arr;
}

// Example
console.log(moveZerosToEnd([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 8,
    category: 'Arrays & Strings',
    question: 'Rotate array by k positions',
    difficulty: 'Medium',
    explanation: 'Reverse entire array, then reverse first k elements, then reverse remaining elements.',
    solution: `function rotateArray(arr, k) {
  k = k % arr.length; // Handle k > length
  
  function reverse(start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
  
  // Reverse entire array
  reverse(0, arr.length - 1);
  // Reverse first k elements
  reverse(0, k - 1);
  // Reverse remaining elements
  reverse(k, arr.length - 1);
  
  return arr;
}

// Example
console.log(rotateArray([1, 2, 3, 4, 5], 2)); // [4, 5, 1, 2, 3]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 9,
    category: 'Arrays & Strings',
    question: 'Flatten nested arrays',
    difficulty: 'Medium',
    explanation: 'Use recursion - if element is array, recursively flatten it; otherwise add to result.',
    solution: `function flattenArray(arr) {
  const result = [];
  
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }
  
  return result;
}

// Example
console.log(flattenArray([1, [2, [3, 4]], 5])); // [1, 2, 3, 4, 5]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 10,
    category: 'Arrays & Strings',
    question: 'Chunk array into groups',
    difficulty: 'Easy',
    explanation: 'Slice array into chunks of specified size using loop.',
    solution: `function chunkArray(arr, size) {
  const chunks = [];
  
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  
  return chunks;
}

// Example
console.log(chunkArray([1, 2, 3, 4, 5], 2)); 
// [[1, 2], [3, 4], [5]]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 11,
    category: 'Arrays & Strings',
    question: 'Find missing number from array',
    difficulty: 'Easy',
    explanation: 'Calculate expected sum using formula n*(n+1)/2, subtract actual sum to find missing number.',
    solution: `function findMissingNumber(arr, n) {
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((sum, num) => sum + num, 0);
  
  return expectedSum - actualSum;
}

// Example
console.log(findMissingNumber([1, 2, 4, 5, 6], 6)); // 3`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 12,
    category: 'Arrays & Strings',
    question: 'Merge two sorted arrays',
    difficulty: 'Easy',
    explanation: 'Use two pointers, compare elements from both arrays, add smaller one to result.',
    solution: `function mergeSortedArrays(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  
  // Add remaining elements
  return result.concat(arr1.slice(i)).concat(arr2.slice(j));
}

// Example
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); 
// [1, 2, 3, 4, 5, 6]`,
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n + m)',
    priority: null
  },
  {
    id: 13,
    category: 'Arrays & Strings',
    question: 'Find intersection of two arrays',
    difficulty: 'Easy',
    explanation: 'Convert one array to Set, filter other array checking membership in Set.',
    solution: `function findIntersection(arr1, arr2) {
  const set1 = new Set(arr1);
  const intersection = arr2.filter(item => set1.has(item));
  
  return [...new Set(intersection)]; // Remove duplicates
}

// Example
console.log(findIntersection([1, 2, 3, 4], [3, 4, 5, 6])); 
// [3, 4]`,
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 14,
    category: 'Arrays & Strings',
    question: 'Find longest substring without repeating characters',
    difficulty: 'Medium',
    explanation: 'Sliding window technique - expand window with right pointer, shrink when duplicate found using left pointer.',
    solution: `function longestSubstringWithoutRepeats(str) {
  const charIndex = new Map();
  let maxLength = 0;
  let start = 0;
  
  for (let end = 0; end < str.length; end++) {
    const char = str[end];
    
    // If character already in window, move start
    if (charIndex.has(char) && charIndex.get(char) >= start) {
      start = charIndex.get(char) + 1;
    }
    
    charIndex.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }
  
  return maxLength;
}

// Example
console.log(longestSubstringWithoutRepeats("abcabcbb")); // 3 ("abc")`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, m))',
    priority: null
  },
  {
    id: 15,
    category: 'Arrays & Strings',
    question: 'Find maximum subarray sum (Kadane\'s Algorithm)',
    difficulty: 'Medium',
    explanation: 'Track current sum and max sum. Reset current sum to 0 if it becomes negative.',
    solution: `function maxSubarraySum(arr) {
  let maxSum = -Infinity;
  let currentSum = 0;
  
  for (const num of arr) {
    currentSum = Math.max(num, currentSum + num);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}

// Example
console.log(maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); 
// 6 ([4, -1, 2, 1])`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 16,
    category: 'Arrays & Strings',
    question: 'Group anagrams',
    difficulty: 'Medium',
    explanation: 'Sort each word to create key, group words with same sorted key in Map.',
    solution: `function groupAnagrams(words) {
  const anagramMap = new Map();
  
  for (const word of words) {
    const sortedKey = word.split('').sort().join('');
    
    if (!anagramMap.has(sortedKey)) {
      anagramMap.set(sortedKey, []);
    }
    
    anagramMap.get(sortedKey).push(word);
  }
  
  return Array.from(anagramMap.values());
}

// Example
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]`,
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)',
    priority: null
  },
  {
    id: 17,
    category: 'Arrays & Strings',
    question: 'Find frequency of characters',
    difficulty: 'Easy',
    explanation: 'Use Map or object to count occurrences of each character.',
    solution: `function charFrequency(str) {
  const freq = new Map();
  
  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  
  return freq;
}

// Example
console.log(charFrequency("hello"));
// Map { 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1 }`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 18,
    category: 'Arrays & Strings',
    question: 'Sort array of 0,1,2 (Dutch Flag)',
    difficulty: 'Medium',
    explanation: 'Three pointers: low for 0s, mid for 1s, high for 2s. Swap based on value at mid pointer.',
    solution: `function sortColors(arr) {
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;
  
  while (mid <= high) {
    if (arr[mid] === 0) {
      [arr[low], arr[mid]] = [arr[mid], arr[low]];
      low++;
      mid++;
    } else if (arr[mid] === 1) {
      mid++;
    } else {
      [arr[mid], arr[high]] = [arr[high], arr[mid]];
      high--;
    }
  }
  
  return arr;
}

// Example
console.log(sortColors([2, 0, 2, 1, 1, 0])); 
// [0, 0, 1, 1, 2, 2]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 116,
    category: 'Arrays & Strings',
    question: 'Find all unique triplets that sum to zero (3Sum)',
    difficulty: 'Medium',
    explanation: 'Sort the array first, then use a fixed pointer and two-pointer technique. For each element, use two pointers to find pairs that sum to the negative of the current element. Skip duplicates to ensure unique triplets.',
    solution: `function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b); // Sort array
  
  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate values for first element
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    let left = i + 1;
    let right = nums.length - 1;
    const target = -nums[i];
    
    while (left < right) {
      const sum = nums[left] + nums[right];
      
      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]]);
        
        // Skip duplicates for second element
        while (left < right && nums[left] === nums[left + 1]) left++;
        // Skip duplicates for third element
        while (left < right && nums[right] === nums[right - 1]) right--;
        
        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }
  
  return result;
}

// Example
console.log(threeSum([1, 0, -1, 2]));
// Output: [[-1, 0, 1]] (indices: i=2, j=1, k=0)

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// Output: [[-1, -1, 2], [-1, 0, 1]]`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1) excluding output',
    priority: null
  },

  // Stack & Queue
  {
    id: 19,
    category: 'Stack & Queue',
    question: 'Valid parentheses (){}[]',
    difficulty: 'Easy',
    explanation: 'Use stack - push opening brackets, pop and match when closing bracket found.',
    solution: `function isValidParentheses(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}

// Example
console.log(isValidParentheses("()[]{}")); // true
console.log(isValidParentheses("([)]"));   // false`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 20,
    category: 'Stack & Queue',
    question: 'Implement stack using array',
    difficulty: 'Easy',
    explanation: 'Use array with push (add), pop (remove), peek (view top), isEmpty check.',
    solution: `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(item) {
    this.items.push(item);
  }
  
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}

// Example
const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.pop());  // 2
console.log(stack.peek()); // 1`,
    timeComplexity: 'O(1) for all operations',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 21,
    category: 'Stack & Queue',
    question: 'Implement queue using array',
    difficulty: 'Easy',
    explanation: 'Use array with enqueue (push to end), dequeue (shift from front), front peek.',
    solution: `class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(item) {
    this.items.push(item);
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }
  
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}

// Example
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 1
console.log(queue.front());   // 2`,
    timeComplexity: 'O(1) enqueue, O(n) dequeue',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 22,
    category: 'Stack & Queue',
    question: 'Queue using two stacks',
    difficulty: 'Medium',
    explanation: 'Use one stack for enqueue, another for dequeue. Transfer elements when dequeue stack is empty.',
    solution: `class QueueWithTwoStacks {
  constructor() {
    this.enqueueStack = [];
    this.dequeueStack = [];
  }
  
  enqueue(item) {
    this.enqueueStack.push(item);
  }
  
  dequeue() {
    if (this.dequeueStack.length === 0) {
      // Transfer all elements
      while (this.enqueueStack.length > 0) {
        this.dequeueStack.push(this.enqueueStack.pop());
      }
    }
    return this.dequeueStack.pop();
  }
  
  front() {
    if (this.dequeueStack.length === 0) {
      while (this.enqueueStack.length > 0) {
        this.dequeueStack.push(this.enqueueStack.pop());
      }
    }
    return this.dequeueStack[this.dequeueStack.length - 1];
  }
}

// Example
const q = new QueueWithTwoStacks();
q.enqueue(1);
q.enqueue(2);
console.log(q.dequeue()); // 1`,
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 23,
    category: 'Stack & Queue',
    question: 'Stack using queues',
    difficulty: 'Medium',
    explanation: 'Use two queues. On push, add to q2, move all from q1 to q2, swap queues.',
    solution: `class StackWithQueues {
  constructor() {
    this.q1 = [];
    this.q2 = [];
  }
  
  push(item) {
    this.q2.push(item);
    
    // Move all from q1 to q2
    while (this.q1.length > 0) {
      this.q2.push(this.q1.shift());
    }
    
    // Swap queues
    [this.q1, this.q2] = [this.q2, this.q1];
  }
  
  pop() {
    return this.q1.shift();
  }
  
  top() {
    return this.q1[0];
  }
}

// Example
const s = new StackWithQueues();
s.push(1);
s.push(2);
console.log(s.pop()); // 2`,
    timeComplexity: 'O(n) push, O(1) pop',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 24,
    category: 'Stack & Queue',
    question: 'Min stack implementation',
    difficulty: 'Medium',
    explanation: 'Maintain auxiliary stack that tracks minimum. Push min value on each operation.',
    solution: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  
  push(val) {
    this.stack.push(val);
    const min = this.minStack.length === 0 
      ? val 
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(min);
  }
  
  pop() {
    this.minStack.pop();
    return this.stack.pop();
  }
  
  top() {
    return this.stack[this.stack.length - 1];
  }
  
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// Example
const minStack = new MinStack();
minStack.push(3);
minStack.push(1);
minStack.push(2);
console.log(minStack.getMin()); // 1`,
    timeComplexity: 'O(1) for all operations',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 61,
    category: 'Stack & Queue',
    question: 'Next greater element',
    difficulty: 'Medium',
    explanation: 'Use monotonic decreasing stack. For each element, pop smaller elements and set current as their next greater.',
    solution: `function nextGreaterElement(arr) {
  const result = new Array(arr.length).fill(-1);
  const stack = []; // Store indices
  
  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
      const index = stack.pop();
      result[index] = arr[i];
    }
    stack.push(i);
  }
  
  return result;
}

// Example
console.log(nextGreaterElement([4, 5, 2, 25])); 
// [5, 25, 25, -1]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },

  // HashMap / Objects
  {
    id: 62,
    category: 'HashMap / Objects',
    question: 'Two Sum problem',
    difficulty: 'Easy',
    explanation: 'Use Map to store complement (target - current). Check if current number exists as complement.',
    solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// Example
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 63,
    category: 'HashMap / Objects',
    question: 'Deep clone object',
    difficulty: 'Medium',
    explanation: 'Recursively copy all properties. For objects/arrays, recurse; for primitives, copy directly.',
    solution: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  const cloned = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  
  return cloned;
}

// Example
const original = { a: 1, b: { c: 2 } };
const copy = deepClone(original);
copy.b.c = 3;
console.log(original.b.c); // 2 (unchanged)`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },

  // Recursion
  {
    id: 64,
    category: 'Recursion',
    question: 'Fibonacci recursion',
    difficulty: 'Easy',
    explanation: 'Base cases: fib(0)=0, fib(1)=1. Recursive case: fib(n) = fib(n-1) + fib(n-2).',
    solution: `// Basic recursion (exponential time)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// With memoization (linear time)
function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

// Example
console.log(fibonacciMemo(10)); // 55`,
    timeComplexity: 'O(n) with memoization',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 25,
    category: 'Recursion',
    question: 'Generate permutations',
    difficulty: 'Medium',
    explanation: 'For each element, fix it at first position and recursively permute remaining elements.',
    solution: `function permutations(arr) {
  if (arr.length <= 1) return [arr];
  
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = permutations(remaining);
    
    for (const perm of perms) {
      result.push([current, ...perm]);
    }
  }
  
  return result;
}

// Example
console.log(permutations([1, 2, 3]));
// [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]`,
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n!)',
    priority: null
  },

  // JavaScript-Specific DSA
  {
    id: 26,
    category: 'JavaScript-Specific DSA',
    question: 'Implement debounce()',
    difficulty: 'Medium',
    explanation: 'Delay function execution until after wait time has elapsed since last call. Clear previous timeout on new call.',
    solution: `function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const context = this;
    
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Example
const search = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

search('react');     // Will not execute immediately
search('react hooks'); // Only this will execute after 300ms`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 27,
    category: 'JavaScript-Specific DSA',
    question: 'Implement throttle()',
    difficulty: 'Medium',
    explanation: 'Limit function execution to once per time period. Execute immediately on first call, then ignore until time passes.',
    solution: `function throttle(func, limit) {
  let inThrottle;
  
  return function executedFunction(...args) {
    const context = this;
    
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Example
const handleScroll = throttle(() => {
  console.log('Scroll handled');
}, 100);

window.addEventListener('scroll', handleScroll);`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 28,
    category: 'JavaScript-Specific DSA',
    question: 'Polyfill for map()',
    difficulty: 'Medium',
    explanation: 'Iterate through array, apply callback to each element, collect results in new array.',
    solution: `Array.prototype.myMap = function(callback, thisArg) {
  const result = [];
  
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }
  
  return result;
};

// Example
const numbers = [1, 2, 3];
console.log(numbers.myMap(x => x * 2)); // [2, 4, 6]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 29,
    category: 'JavaScript-Specific DSA',
    question: 'Polyfill for reduce()',
    difficulty: 'Medium',
    explanation: 'Accumulate values by applying reducer function. Start with initial value or first element.',
    solution: `Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;
  
  if (accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }
  
  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }
  
  return accumulator;
};

// Example
const sum = [1, 2, 3].myReduce((acc, curr) => acc + curr, 0);
console.log(sum); // 6`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 30,
    category: 'JavaScript-Specific DSA',
    question: 'Implement Promise',
    difficulty: 'Hard',
    explanation: 'Track state (pending/fulfilled/rejected), store callbacks, execute asynchronously with microtask queue.',
    solution: `class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.callbacks = [];
    
    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.callbacks.forEach(cb => cb.onFulfilled(value));
      }
    };
    
    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.value = reason;
        this.callbacks.forEach(cb => cb.onRejected(reason));
      }
    };
    
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.callbacks.push({
        onFulfilled: (value) => {
          try {
            resolve(onFulfilled(value));
          } catch (error) {
            reject(error);
          }
        },
        onRejected: (reason) => {
          try {
            reject(onRejected(reason));
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 31,
    category: 'JavaScript-Specific DSA',
    question: 'Currying function',
    difficulty: 'Medium',
    explanation: 'Transform function that takes multiple arguments into sequence of functions each taking single argument.',
    solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

// Example
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 32,
    category: 'JavaScript-Specific DSA',
    question: 'Memoization',
    difficulty: 'Medium',
    explanation: 'Cache function results. Check cache before computing, store result after computation.',
    solution: `function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    
    return result;
  };
}

// Example
const expensiveCalculation = memoize((n) => {
  console.log('Computing...');
  return n * n;
});

console.log(expensiveCalculation(5)); // Computing... 25
console.log(expensiveCalculation(5)); // 25 (cached)`,
    timeComplexity: 'O(1) after first call',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 33,
    category: 'JavaScript-Specific DSA',
    question: 'Event emitter implementation',
    difficulty: 'Medium',
    explanation: 'Store event-name to callback-array mapping. Implement on (subscribe), emit (trigger), off (unsubscribe).',
    solution: `class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    
    // Return unsubscribe function
    return () => this.off(event, callback);
  }
  
  emit(event, ...args) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(...args));
    }
  }
  
  off(event, callback) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
}

// Example
const emitter = new EventEmitter();
emitter.on('greet', (name) => console.log(\`Hello \${name}\`));
emitter.emit('greet', 'World'); // Hello World`,
    timeComplexity: 'O(1) for on/off, O(n) for emit',
    spaceComplexity: 'O(n)',
    priority: null
  },

  // React/UI-Oriented
  {
    id: 34,
    category: 'React/UI-Oriented',
    question: 'Search with debounce',
    difficulty: 'Medium',
    explanation: 'Combine debounce with React state. Debounce API calls to avoid excessive requests while typing.',
    solution: `import { useState, useEffect, useCallback } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      fetch(\`/api/search?q=\${debouncedQuery}\`)
        .then(res => res.json())
        .then(setResults);
    }
  }, [debouncedQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}`,
    timeComplexity: 'O(1) per keystroke',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 35,
    category: 'React/UI-Oriented',
    question: 'Infinite scroll implementation',
    difficulty: 'Medium',
    explanation: 'Use IntersectionObserver to detect when user reaches bottom. Load more data when threshold element is visible.',
    solution: `import { useState, useRef, useEffect, useCallback } from 'react';

function InfiniteScroll({ fetchItems }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const loadMore = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    const newItems = await fetchItems(page);
    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setLoading(false);
  }, [page, loading, fetchItems]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
      <div ref={observerRef}>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}`,
    timeComplexity: 'O(n) where n is items loaded',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 36,
    category: 'React/UI-Oriented',
    question: 'Implement LRU cache for API requests',
    difficulty: 'Hard',
    explanation: 'Use Map for O(1) access. Track usage order. Evict least recently used when capacity exceeded.',
    solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return undefined;
    
    // Move to end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Delete least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }
}

// React Hook for API caching
function useLRUCache(capacity = 100) {
  const cacheRef = useRef(new LRUCache(capacity));

  const getCached = useCallback((key) => {
    return cacheRef.current.get(key);
  }, []);

  const setCached = useCallback((key, value) => {
    cacheRef.current.put(key, value);
  }, []);

  return { getCached, setCached };
}`,
    timeComplexity: 'O(1) for get/put',
    spaceComplexity: 'O(capacity)',
    priority: null
  },
  {
    id: 37,
    category: 'Stack & Queue',
    question: 'Browser history implementation',
    difficulty: 'Medium',
    explanation: 'Use two stacks - one for back history, one for forward. Navigate between them.',
    solution: `class BrowserHistory {
  constructor(homepage) {
    this.backStack = [homepage];
    this.forwardStack = [];
  }
  
  visit(url) {
    this.backStack.push(url);
    this.forwardStack = []; // Clear forward history
  }
  
  back(steps) {
    while (steps > 0 && this.backStack.length > 1) {
      this.forwardStack.push(this.backStack.pop());
      steps--;
    }
    return this.backStack[this.backStack.length - 1];
  }
  
  forward(steps) {
    while (steps > 0 && this.forwardStack.length > 0) {
      this.backStack.push(this.forwardStack.pop());
      steps--;
    }
    return this.backStack[this.backStack.length - 1];
  }
}

// Example
const history = new BrowserHistory('google.com');
history.visit('facebook.com');
history.visit('youtube.com');
console.log(history.back(1)); // facebook.com`,
    timeComplexity: 'O(steps)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 38,
    category: 'HashMap / Objects',
    question: 'Count frequency of words',
    difficulty: 'Easy',
    explanation: 'Split text into words, use Map to count occurrences of each word.',
    solution: `function wordFrequency(text) {
  const words = text.toLowerCase().split(/\\s+/);
  const freq = new Map();
  
  for (const word of words) {
    freq.set(word, (freq.get(word) || 0) + 1);
  }
  
  return freq;
}

// Example
console.log(wordFrequency("the cat sat on the mat"));
// Map { 'the' => 2, 'cat' => 1, 'sat' => 1, 'on' => 1, 'mat' => 1 }`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 39,
    category: 'HashMap / Objects',
    question: 'Find duplicates using Map',
    difficulty: 'Easy',
    explanation: 'Track seen items in Map, if already exists its a duplicate.',
    solution: `function findDuplicatesWithMap(arr) {
  const seen = new Map();
  const duplicates = [];
  
  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.push(item);
    } else {
      seen.set(item, true);
    }
  }
  
  return [...new Set(duplicates)];
}

// Example
console.log(findDuplicatesWithMap([1, 2, 3, 2, 4, 3])); // [2, 3]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 40,
    category: 'HashMap / Objects',
    question: 'Most frequent element',
    difficulty: 'Easy',
    explanation: 'Count frequencies with Map, find element with highest count.',
    solution: `function mostFrequent(arr) {
  const freq = new Map();
  let maxCount = 0;
  let result = null;
  
  for (const item of arr) {
    const count = (freq.get(item) || 0) + 1;
    freq.set(item, count);
    
    if (count > maxCount) {
      maxCount = count;
      result = item;
    }
  }
  
  return result;
}

// Example
console.log(mostFrequent([1, 3, 2, 1, 4, 1])); // 1`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 41,
    category: 'HashMap / Objects',
    question: 'Deep compare two objects',
    difficulty: 'Medium',
    explanation: 'Recursively compare all properties. Check types, then values, then nested objects.',
    solution: `function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  
  if (typeof obj1 !== typeof obj2) return false;
  
  if (typeof obj1 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  
  return true;
}

// Example
console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(d) where d is depth',
    priority: null
  },
  {
    id: 42,
    category: 'Recursion',
    question: 'Factorial recursion',
    difficulty: 'Easy',
    explanation: 'Base case: factorial(0) = 1. Recursive: n * factorial(n-1).',
    solution: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Example
console.log(factorial(5)); // 120 (5*4*3*2*1)`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n) call stack',
    priority: null
  },
  {
    id: 43,
    category: 'Recursion',
    question: 'Flatten nested object',
    difficulty: 'Medium',
    explanation: 'Recursively traverse object, concatenate keys with delimiter for nested properties.',
    solution: `function flattenObject(obj, prefix = '') {
  const result = {};
  
  for (const key in obj) {
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }
  
  return result;
}

// Example
console.log(flattenObject({ a: { b: { c: 1 } } }));
// { 'a.b.c': 1 }`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 44,
    category: 'Recursion',
    question: 'Generate combinations',
    difficulty: 'Medium',
    explanation: 'For each element, either include it or exclude it. Recurse on remaining elements.',
    solution: `function combinations(arr, k) {
  const result = [];
  
  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }
    
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}

// Example
console.log(combinations([1, 2, 3], 2));
// [[1,2], [1,3], [2,3]]`,
    timeComplexity: 'O(C(n,k))',
    spaceComplexity: 'O(k)',
    priority: null
  },
  {
    id: 45,
    category: 'JavaScript-Specific DSA',
    question: 'Polyfill for filter()',
    difficulty: 'Medium',
    explanation: 'Iterate through array, apply callback, add to result if callback returns true.',
    solution: `Array.prototype.myFilter = function(callback, thisArg) {
  const result = [];
  
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  
  return result;
};

// Example
const evens = [1, 2, 3, 4].myFilter(x => x % 2 === 0);
console.log(evens); // [2, 4]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 46,
    category: 'JavaScript-Specific DSA',
    question: 'Polyfill for bind()',
    difficulty: 'Medium',
    explanation: 'Return new function with bound context and prepended arguments.',
    solution: `Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  
  return function(...newArgs) {
    return fn.apply(context, [...args, ...newArgs]);
  };
};

// Example
function greet(greeting, name) {
  console.log(\`\${greeting} \${name}\`);
}

const boundGreet = greet.myBind(null, 'Hello');
boundGreet('World'); // Hello World`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 47,
    category: 'JavaScript-Specific DSA',
    question: 'Polyfill for call()',
    difficulty: 'Medium',
    explanation: 'Temporarily attach function to context object, execute, then remove.',
    solution: `Function.prototype.myCall = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('Not callable');
  }
  
  context = context || globalThis;
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  
  return result;
};

// Example
function greet() {
  console.log(\`Hello \${this.name}\`);
}

greet.myCall({ name: 'John' }); // Hello John`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 48,
    category: 'JavaScript-Specific DSA',
    question: 'Polyfill for apply()',
    difficulty: 'Medium',
    explanation: 'Similar to call but accepts arguments as array.',
    solution: `Function.prototype.myApply = function(context, args = []) {
  if (typeof this !== 'function') {
    throw new Error('Not callable');
  }
  
  context = context || globalThis;
  const fnSymbol = Symbol('fn');
  context[fnSymbol] = this;
  
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  
  return result;
};

// Example
function sum(a, b) {
  return a + b;
}

console.log(sum.myApply(null, [5, 10])); // 15`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 49,
    category: 'JavaScript-Specific DSA',
    question: 'Promise.all polyfill',
    difficulty: 'Hard',
    explanation: 'Execute all promises in parallel. Resolve when all succeed, reject if any fails.',
    solution: `Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    
    if (promises.length === 0) {
      resolve(results);
      return;
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

// Example
Promise.myAll([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(console.log); // [1, 2, 3]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 117,
    category: 'JavaScript-Specific DSA',
    question: 'Find all unique triplets that sum to target (3Sum)',
    difficulty: 'Medium',
    explanation: 'Sort the array first, then use a fixed pointer and two-pointer technique. For each element, use two pointers to find pairs that sum to (target - current element). Skip duplicates to ensure unique triplets.',
    solution: `function threeSum(nums, target) {
  nums.sort((a, b) => a - b);
  const result = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate values for first element
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    
    let left = i + 1;
    let right = nums.length - 1;
    const remaining = target - nums[i];
    
    while (left < right) {
      const sum = nums[left] + nums[right];
      
      if (sum === remaining) {
        result.push([nums[i], nums[left], nums[right]]);
        
        // Skip duplicates for second element
        while (left < right && nums[left] === nums[left + 1]) left++;
        // Skip duplicates for third element
        while (left < right && nums[right] === nums[right - 1]) right--;
        
        left++;
        right--;
      } else if (sum < remaining) {
        left++;
      } else {
        right--;
      }
    }
  }
  
  return result;
}

// Example
console.log(threeSum([1, 0, -1, 2], 0)); 
// Output: [[-1, 0, 1]]`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1) excluding output',
    priority: null
  },
  {
    id: 50,
    category: 'React/UI-Oriented',
    question: 'Virtualized list implementation',
    difficulty: 'Hard',
    explanation: 'Render only visible items based on scroll position. Calculate item positions absolutely.',
    solution: `import { useState, useRef, useEffect } from 'react';

function VirtualizedList({ items, itemHeight, containerHeight }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(visibleStart, visibleEnd);
  const offsetY = visibleStart * itemHeight;
  
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };
  
  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: containerHeight, overflow: 'auto' }}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={visibleStart + index}
            style={{
              position: 'absolute',
              top: offsetY + index * itemHeight,
              height: itemHeight,
              width: '100%'
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}`,
    timeComplexity: 'O(visible items)',
    spaceComplexity: 'O(visible items)',
    priority: null
  },
  {
    id: 51,
    category: 'React/UI-Oriented',
    question: 'Drag-and-drop list',
    difficulty: 'Hard',
    explanation: 'Track dragged item, calculate drop position, reorder array on drop.',
    solution: `import { useState } from 'react';

function DragAndDropList({ items }) {
  const [list, setList] = useState(items);
  const [draggedIndex, setDraggedIndex] = useState(null);
  
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };
  
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newList = [...list];
    const draggedItem = newList[draggedIndex];
    newList.splice(draggedIndex, 1);
    newList.splice(index, 0, draggedItem);
    
    setList(newList);
    setDraggedIndex(index);
  };
  
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  
  return (
    <ul>
      {list.map((item, index) => (
        <li
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          style={{
            padding: '10px',
            margin: '5px',
            background: draggedIndex === index ? '#e0e0e0' : 'white',
            cursor: 'grab'
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}`,
    timeComplexity: 'O(n) for reorder',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 52,
    category: 'React/UI-Oriented',
    question: 'Pagination logic',
    difficulty: 'Medium',
    explanation: 'Calculate total pages, slice data for current page, handle page navigation.',
    solution: `import { useState, useMemo } from 'react';

function usePagination(items, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, currentPage, itemsPerPage]);
  
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);
  
  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
}

// Usage
function PaginatedList({ items }) {
  const pagination = usePagination(items, 10);
  
  return (
    <div>
      {pagination.paginatedItems.map(item => <div key={item.id}>{item.name}</div>)}
      <button onClick={pagination.prevPage} disabled={!pagination.hasPrev}>Previous</button>
      <button onClick={pagination.nextPage} disabled={!pagination.hasNext}>Next</button>
    </div>
  );
}`,
    timeComplexity: 'O(1) per page',
    spaceComplexity: 'O(itemsPerPage)',
    priority: null
  },
  {
    id: 53,
    category: 'React/UI-Oriented',
    question: 'Nested comments component',
    difficulty: 'Hard',
    explanation: 'Recursive component that renders comments and their nested replies.',
    solution: `import { useState } from 'react';

function Comment({ comment, depth = 0 }) {
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);
  
  const handleAddReply = (text) => {
    const newReply = {
      id: Date.now(),
      author: 'You',
      text,
      replies: []
    };
    setReplies([...replies, newReply]);
    setShowReply(false);
  };
  
  return (
    <div style={{ marginLeft: depth * 20, marginTop: 10 }}>
      <div className="comment">
        <strong>{comment.author}</strong>
        <p>{comment.text}</p>
        <button onClick={() => setShowReply(!showReply)}>Reply</button>
      </div>
      
      {showReply && (
        <ReplyForm onSubmit={handleAddReply} />
      )}
      
      {replies.map(reply => (
        <Comment key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}

function ReplyForm({ onSubmit }) {
  const [text, setText] = useState('');
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(text); }}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    timeComplexity: 'O(n) where n is total comments',
    spaceComplexity: 'O(d) where d is max depth',
    priority: null
  },
  {
    id: 54,
    category: 'React/UI-Oriented',
    question: 'Multi-select dropdown',
    difficulty: 'Medium',
    explanation: 'Track selected items, toggle on click, display selected tags.',
    solution: `import { useState, useRef, useEffect } from 'react';

function MultiSelectDropdown({ options, placeholder = 'Select...' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggleOption = (option) => {
    setSelected(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };
  
  const removeOption = (option) => {
    setSelected(prev => prev.filter(item => item !== option));
  };
  
  return (
    <div ref={dropdownRef} className="multi-select">
      <div className="selected-tags">
        {selected.map(item => (
          <span key={item} className="tag">
            {item}
            <button onClick={() => removeOption(item)}>×</button>
          </span>
        ))}
        <input
          type="text"
          placeholder={selected.length === 0 ? placeholder : ''}
          onClick={() => setIsOpen(true)}
        />
      </div>
      
      {isOpen && (
        <ul className="options">
          {options.map(option => (
            <li
              key={option}
              onClick={() => toggleOption(option)}
              className={selected.includes(option) ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    timeComplexity: 'O(n) for rendering',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 55,
    category: 'React/UI-Oriented',
    question: 'File upload with progress bar',
    difficulty: 'Medium',
    explanation: 'Use XMLHttpRequest or fetch with progress tracking. Update state as upload progresses.',
    solution: `import { useState } from 'react';

function FileUploadWithProgress() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  
  const handleUpload = async (file) => {
    setUploading(true);
    setProgress(0);
    
    const formData = new FormData();
    formData.append('file', file);
    
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        setProgress(Math.round(percentComplete));
      }
    });
    
    xhr.addEventListener('load', () => {
      setUploading(false);
      setProgress(100);
    });
    
    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  };
  
  return (
    <div>
      <input
        type="file"
        onChange={(e) => handleUpload(e.target.files[0])}
        disabled={uploading}
      />
      {uploading && (
        <div className="progress-bar">
          <div style={{ width: \`\${progress}%\` }} />
        </div>
      )}
      <p>{progress}% uploaded</p>
    </div>
  );
}`,
    timeComplexity: 'O(1) UI updates',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 56,
    category: 'React/UI-Oriented',
    question: 'Build reusable table with sorting/filtering',
    difficulty: 'Hard',
    explanation: 'Create generic table component with sortable columns and filter input.',
    solution: `import { useState, useMemo } from 'react';

function ReusableTable({ columns, data }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filter, setFilter] = useState('');
  
  const sortedAndFilteredData = useMemo(() => {
    let result = [...data];
    
    // Filter
    if (filter) {
      result = result.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
    
    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return result;
  }, [data, sortConfig, filter]);
  
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  return (
    <div>
      <input
        type="text"
        placeholder="Filter..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} onClick={() => handleSort(col.key)}>
                {col.label}
                {sortConfig.key === col.key && (
                  <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedAndFilteredData.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
    timeComplexity: 'O(n log n) for sort',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 57,
    category: 'React/UI-Oriented',
    question: 'Design toast notification system',
    difficulty: 'Medium',
    explanation: 'Use context and portal to manage toast queue. Auto-dismiss with timeout.',
    solution: `import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  
  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);
  
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);
  
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div className="toast-container">
          {toasts.map(toast => (
            <div key={toast.id} className={\`toast \${toast.type}\`}>
              {toast.message}
              <button onClick={() => removeToast(toast.id)}>×</button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}`,
    timeComplexity: 'O(1) per toast',
    spaceComplexity: 'O(n) where n is active toasts',
    priority: null
  },
  {
    id: 58,
    category: 'React/UI-Oriented',
    question: 'Design modal manager',
    difficulty: 'Medium',
    explanation: 'Use context to manage modal stack. Render modals with portal.',
    solution: `import { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modals, setModals] = useState([]);
  
  const openModal = useCallback((component, props = {}) => {
    const id = Date.now();
    setModals(prev => [...prev, { id, component, props }]);
    return id;
  }, []);
  
  const closeModal = useCallback((id) => {
    setModals(prev => prev.filter(m => m.id !== id));
  }, []);
  
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modals.map(modal => (
        <ModalWrapper key={modal.id} onClose={() => closeModal(modal.id)}>
          <modal.component {...modal.props} />
        </ModalWrapper>
      ))}
    </ModalContext.Provider>
  );
}

function ModalWrapper({ children, onClose }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function useModal() {
  return useContext(ModalContext);
}`,
    timeComplexity: 'O(1) per modal',
    spaceComplexity: 'O(n) where n is open modals',
    priority: null
  },
  {
    id: 59,
    category: 'React/UI-Oriented',
    question: 'Design custom hook for fetching',
    difficulty: 'Medium',
    explanation: 'Encapsulate fetch logic with loading, error, and data states. Support caching.',
    solution: `import { useState, useEffect, useCallback } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(response.statusText);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refetch };
}

// Usage
function UserProfile({ userId }) {
  const { data, loading, error, refetch } = useFetch(\`/api/users/\${userId}\`);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return <div>{data.name}</div>;
}`,
    timeComplexity: 'O(1) hook execution',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 60,
    category: 'React/UI-Oriented',
    question: 'Build autocomplete component',
    difficulty: 'Medium',
    explanation: 'Combine debounce with API calls. Show suggestions dropdown, handle keyboard navigation.',
    solution: `import { useState, useEffect, useRef } from 'react';

function Autocomplete({ fetchSuggestions, placeholder = 'Search...' }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  
  // Debounced search
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    
    const timer = setTimeout(async () => {
      const results = await fetchSuggestions(query);
      setSuggestions(results);
      setShowDropdown(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      selectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };
  
  const selectSuggestion = (item) => {
    setQuery(item);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };
  
  return (
    <div className="autocomplete">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      
      {showDropdown && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className={index === selectedIndex ? 'selected' : ''}
              onClick={() => selectSuggestion(item)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Usage
function SearchPage() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(\`/api/search?q=\${query}\`);
    const data = await response.json();
    return data.suggestions;
  };
  
  return <Autocomplete fetchSuggestions={fetchSuggestions} />;
}`,
    timeComplexity: 'O(n) for rendering suggestions',
    spaceComplexity: 'O(n)',
    priority: null
  },

  // ==================== REACT HOOKS ====================
  {
    id: 66,
    category: 'React/UI-Oriented',
    question: 'Build useDebounce Hook',
    difficulty: 'Medium',
    explanation: 'Delays function execution until after wait time has elapsed since last call. Essential for search inputs, API calls, resize handlers.',
    solution: `import { useState, useEffect } from 'react';

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    // Set timer to update debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    // Cleanup: cancel timer if value changes before delay
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 67,
    category: 'React/UI-Oriented',
    question: 'Build useLocalStorage Hook',
    difficulty: 'Easy',
    explanation: 'Syncs state with localStorage. Persists data across page reloads. Handles JSON serialization and parsing.',
    solution: `import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setStoredValue];
}

// Usage
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 68,
    category: 'React/UI-Oriented',
    question: 'Build useFetch Hook',
    difficulty: 'Medium',
    explanation: 'Custom hook for data fetching with loading, error, and data states. Handles cleanup on unmount to prevent memory leaks.',
    solution: `import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted && err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Cleanup: abort request and mark as unmounted
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(
    \`https://api.example.com/users/\${userId}\`
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{user?.name}</div>;
}`,
    timeComplexity: 'O(1) hook execution',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 69,
    category: 'React/UI-Oriented',
    question: 'Build usePrevious Hook',
    difficulty: 'Easy',
    explanation: 'Returns the previous value of a state or prop. Useful for comparing current vs previous values, detecting changes.',
    solution: `import { useRef, useEffect } from 'react';

function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  
  return (
    <div>
      <p>Current: {count}, Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Another example - detect direction
function TrendIndicator({ value }) {
  const prevValue = usePrevious(value);
  
  const trend = prevValue !== undefined
    ? value > prevValue ? 'up' : value < prevValue ? 'down' : 'same'
    : 'initial';
  
  return <span>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>;
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },

  // ==================== REACT COMPONENTS ====================
  {
    id: 70,
    category: 'React/UI-Oriented',
    question: 'Infinite Scroll Implementation',
    difficulty: 'Medium',
    explanation: 'Loads more content as user scrolls near bottom. Uses IntersectionObserver for efficient scroll detection without performance issues.',
    solution: `import { useState, useEffect, useRef } from 'react';

function InfiniteScroll({ fetchItems, renderItem }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  
  // Fetch initial items
  useEffect(() => {
    loadMore();
  }, []);
  
  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newItems = await fetchItems(page);
      
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to load items:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // IntersectionObserver for sentinel element
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.5 }
    );
    
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    
    return () => observer.disconnect();
  }, [hasMore, loading]);
  
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
      
      {/* Sentinel element */}
      <div ref={observerRef} style={{ height: '20px' }} />
      
      {loading && <div>Loading more...</div>}
      {!hasMore && <div>No more items</div>}
    </div>
  );
}

// Usage
function PostList() {
  const fetchPosts = async (page) => {
    const res = await fetch(\`/api/posts?page=\${page}&limit=10\`);
    return res.json();
  };
  
  return (
    <InfiniteScroll
      fetchItems={fetchPosts}
      renderItem={(post) => <PostCard post={post} />}
    />
  );
}`,
    timeComplexity: 'O(n) for rendering items',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 71,
    category: 'React/UI-Oriented',
    question: 'Pagination Component',
    difficulty: 'Medium',
    explanation: 'Displays paginated content with page navigation. Shows limited pages, handles edge cases, provides smooth UX.',
    solution: `import { useState, useMemo } from 'react';

function Pagination({ totalItems, itemsPerPage, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Calculate visible page numbers
  const visiblePages = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }, [currentPage, totalPages]);
  
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    setCurrentPage(page);
    onPageChange(page);
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Prev
      </button>
      
      {visiblePages[0] > 1 && (
        <>
          <button onClick={() => handlePageChange(1)}>1</button>
          {visiblePages[0] > 2 && <span>...</span>}
        </>
      )}
      
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
      
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span>...</span>}
          <button onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
}

// Usage
function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    fetchProducts(currentPage, itemsPerPage).then(setProducts);
  }, [currentPage]);
  
  return (
    <div>
      {products.map(product => <ProductCard key={product.id} product={product} />)}
      <Pagination
        totalItems={100}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}`,
    timeComplexity: 'O(1) for pagination logic',
    spaceComplexity: 'O(p) where p is visible pages',
    priority: null
  },
  {
    id: 72,
    category: 'React/UI-Oriented',
    question: 'Multi-select Dropdown',
    difficulty: 'Medium',
    explanation: 'Allows selecting multiple options from dropdown. Shows selected items as tags, supports removal, keyboard navigation.',
    solution: `import { useState, useRef, useEffect } from 'react';

function MultiSelectDropdown({ options, placeholder = 'Select...', onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  
  // Filter options based on search
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggleOption = (option) => {
    const isSelected = selected.find(item => item.value === option.value);
    
    let newSelected;
    if (isSelected) {
      newSelected = selected.filter(item => item.value !== option.value);
    } else {
      newSelected = [...selected, option];
    }
    
    setSelected(newSelected);
    onChange?.(newSelected);
  };
  
  const removeOption = (value, e) => {
    e.stopPropagation();
    const newSelected = selected.filter(item => item.value !== value);
    setSelected(newSelected);
    onChange?.(newSelected);
  };
  
  return (
    <div className="multi-select" ref={dropdownRef}>
      <div
        className="select-input"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length === 0 ? (
          <span className="placeholder">{placeholder}</span>
        ) : (
          <div className="selected-tags">
            {selected.map(item => (
              <span key={item.value} className="tag">
                {item.label}
                <button onClick={(e) => removeOption(item.value, e)}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="search-input"
          />
          
          <ul className="options-list">
            {filteredOptions.map(option => {
              const isSelected = selected.find(item => item.value === option.value);
              return (
                <li
                  key={option.value}
                  className={\`option \${isSelected ? 'selected' : ''}\`}
                  onClick={() => toggleOption(option)}
                >
                  <input
                    type="checkbox"
                    checked={!!isSelected}
                    readOnly
                  />
                  {option.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

// Usage
function UserForm() {
  const options = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' }
  ];
  
  const [skills, setSkills] = useState([]);
  
  return (
    <MultiSelectDropdown
      options={options}
      placeholder="Select skills..."
      onChange={setSkills}
    />
  );
}`,
    timeComplexity: 'O(n) for filtering options',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 73,
    category: 'React/UI-Oriented',
    question: 'Modal Component',
    difficulty: 'Medium',
    explanation: 'Reusable modal with backdrop, close on escape/outside click, focus trap, and portal rendering for proper z-index.',
    solution: `import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  // Render in portal to avoid z-index issues
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

// Usage
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Action"
      >
        <p>Are you sure you want to proceed?</p>
        <button>Yes</button>
        <button>No</button>
      </Modal>
    </div>
  );
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 74,
    category: 'React/UI-Oriented',
    question: 'Toast Notification System',
    difficulty: 'Hard',
    explanation: 'Queue-based notification system with auto-dismiss, different types (success/error/warning), stacking, and smooth animations.',
    solution: `import { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// Toast Context
const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  
  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);
  
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);
  
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// Toast Container
function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}

// Individual Toast
function Toast({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);
  
  return (
    <div className={\`toast toast-\${toast.type}\`}>
      <span>{toast.message}</span>
      <button onClick={() => onRemove(toast.id)}>×</button>
    </div>
  );
}

// Custom Hook
function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

// Usage
function App() {
  const { addToast } = useToast();
  
  return (
    <div>
      <button onClick={() => addToast('Success!', 'success')}>
        Show Success
      </button>
      <button onClick={() => addToast('Error occurred', 'error')}>
        Show Error
      </button>
      <button onClick={() => addToast('Warning!', 'warning')}>
        Show Warning
      </button>
    </div>
  );
}

// Wrap app with provider
createRoot(document.getElementById('root')).render(
  <ToastProvider>
    <App />
  </ToastProvider>
);`,
    timeComplexity: 'O(1) per toast operation',
    spaceComplexity: 'O(n) where n is number of toasts',
    priority: null
  },
  {
    id: 75,
    category: 'React/UI-Oriented',
    question: 'Accordion Component',
    difficulty: 'Easy',
    explanation: 'Expandable/collapsible sections. Supports single or multiple open items, smooth animations, accessible markup.',
    solution: `import { useState } from 'react';

function Accordion({ items, allowMultiple = false }) {
  const [openIndexes, setOpenIndexes] = useState([]);
  
  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenIndexes(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes(prev =>
        prev.includes(index) ? [] : [index]
      );
    }
  };
  
  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        
        return (
          <div key={index} className="accordion-item">
            <button
              className={\`accordion-header \${isOpen ? 'open' : ''}\`}
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span className="icon">{isOpen ? '−' : '+'}</span>
            </button>
            
            {isOpen && (
              <div className="accordion-content">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Usage
function FAQ() {
  const faqItems = [
    {
      title: 'What is React?',
      content: 'React is a JavaScript library for building user interfaces.'
    },
    {
      title: 'What are hooks?',
      content: 'Hooks let you use state and other React features in functional components.'
    },
    {
      title: 'What is JSX?',
      content: 'JSX is a syntax extension that looks like HTML but compiles to JavaScript.'
    }
  ];
  
  return <Accordion items={faqItems} />;
}`,
    timeComplexity: 'O(1) per toggle',
    spaceComplexity: 'O(n) for open state',
    priority: null
  },
  {
    id: 76,
    category: 'React/UI-Oriented',
    question: 'Tabs Component',
    difficulty: 'Easy',
    explanation: 'Tabbed interface for organizing content. Keyboard accessible, supports controlled/uncontrolled modes, animated transitions.',
    solution: `import { useState } from 'react';

function Tabs({ tabs, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const handleKeyDown = (e, index) => {
    let newIndex = index;
    
    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    setActiveTab(newIndex);
  };
  
  return (
    <div className="tabs">
      <div className="tab-list" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={\`tab \${activeTab === index ? 'active' : ''}\`}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={\`panel-\${index}\`}
            id={\`tab-\${index}\`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div
        className="tab-panel"
        role="tabpanel"
        id={\`panel-\${activeTab}\`}
        aria-labelledby={\`tab-\${activeTab}\`}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

// Usage
function Dashboard() {
  const tabs = [
    {
      label: 'Overview',
      content: <OverviewPanel />
    },
    {
      label: 'Analytics',
      content: <AnalyticsPanel />
    },
    {
      label: 'Settings',
      content: <SettingsPanel />
    }
  ];
  
  return <Tabs tabs={tabs} />;
}`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },

  // ==================== STATE MANAGEMENT ====================
  {
    id: 77,
    category: 'React/UI-Oriented',
    question: 'Redux Cart Example',
    difficulty: 'Medium',
    explanation: 'Complete shopping cart implementation with Redux Toolkit. Includes add, remove, update quantity, calculate total.',
    solution: `import { createSlice, configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price
        });
      }
      
      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  }
});

// Store
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

// Component
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  
  return (
    <div>
      <h2>Shopping Cart ({cart.totalQuantity} items)</h2>
      
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>Qty: {item.quantity}</span>
            <span>\${item.totalPrice.toFixed(2)}</span>
            <button onClick={() => dispatch(removeItem(item.id))}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      
      <div>Total: \${cart.totalAmount.toFixed(2)}</div>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );
}

function Product({ product }) {
  const dispatch = useDispatch();
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
      <button onClick={() => dispatch(addItem(product))}>
        Add to Cart
      </button>
    </div>
  );
}`,
    timeComplexity: 'O(n) for finding items',
    spaceComplexity: 'O(n) for cart items',
    priority: null
  },
  {
    id: 78,
    category: 'React/UI-Oriented',
    question: 'Context API Implementation',
    difficulty: 'Medium',
    explanation: 'Global state management with Context API. Avoids prop drilling, provides centralized state access throughout component tree.',
    solution: `import { createContext, useContext, useReducer } from 'react';

// Create Context
const AppContext = createContext();

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
}

// Provider Component
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    theme: 'light',
    cart: []
  });
  
  const value = { state, dispatch };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook
function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

// Usage
function App() {
  return (
    <AppProvider>
      <Header />
      <MainContent />
    </AppProvider>
  );
}

function Header() {
  const { state, dispatch } = useAppContext();
  
  return (
    <header>
      <span>Theme: {state.theme}</span>
      <button onClick={() => dispatch({
        type: 'SET_THEME',
        payload: state.theme === 'light' ? 'dark' : 'light'
      })}>
        Toggle Theme
      </button>
      <span>Cart: {state.cart.length} items</span>
    </header>
  );
}

function ProductList() {
  const { dispatch } = useAppContext();
  
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  
  return (
    <div>
      {products.map(product => (
        <Product key={product.id} product={product} onAdd={addToCart} />
      ))}
    </div>
  );
}`,
    timeComplexity: 'O(1) for context access',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 79,
    category: 'React/UI-Oriented',
    question: 'Zustand Store Implementation',
    difficulty: 'Medium',
    explanation: 'Lightweight state management with Zustand. Simpler than Redux, no boilerplate, built-in TypeScript support, middleware support.',
    solution: `import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Create Store
const useStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      cart: [],
      theme: 'light',
      
      // Actions
      setUser: (user) => set({ user }),
      
      addToCart: (product) => set((state) => ({
        cart: [...state.cart, product]
      })),
      
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),
      
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
      
      clearCart: () => set({ cart: [] }),
      
      // Computed
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((sum, item) => sum + item.price, 0);
      }
    }),
    {
      name: 'app-storage', // localStorage key
      partialize: (state) => ({
        cart: state.cart,
        theme: state.theme
      })
    }
  )
);

// Usage in Components
function Header() {
  const { theme, toggleTheme, cart } = useStore();
  
  return (
    <header>
      <span>Theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
      <span>Cart: {cart.length} items</span>
    </header>
  );
}

function Cart() {
  const { cart, removeFromCart, getCartTotal } = useStore();
  
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <div>Total: \${getCartTotal()}</div>
    </div>
  );
}

function Login() {
  const setUser = useStore(state => state.setUser);
  
  const handleLogin = async (credentials) => {
    const user = await loginAPI(credentials);
    setUser(user);
  };
  
  return <LoginForm onSubmit={handleLogin} />;
}

// Select specific state (prevents unnecessary re-renders)
function ThemeDisplay() {
  const theme = useStore(state => state.theme);
  return <div>Current theme: {theme}</div>;
}`,
    timeComplexity: 'O(1) for state access',
    spaceComplexity: 'O(n) for persisted state',
    priority: null
  },

  // ==================== JAVA QUESTIONS ====================
  {
    id: 80,
    category: 'Java',
    question: 'Reverse a Linked List',
    difficulty: 'Easy',
    explanation: 'Iteratively reverse pointers in a singly linked list. Track previous, current, and next nodes.',
    solution: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            ListNode nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        
        return prev;
    }
}

// Usage
// Input: 1 -> 2 -> 3 -> 4 -> 5
// Output: 5 -> 4 -> 3 -> 2 -> 1`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 81,
    category: 'Java',
    question: 'Two Sum Problem',
    difficulty: 'Easy',
    explanation: 'Find two numbers that add up to target using HashMap for O(1) lookup of complements.',
    solution: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        throw new IllegalArgumentException("No solution found");
    }
}

// Usage
// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1]`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 82,
    category: 'Java',
    question: 'Valid Parentheses',
    difficulty: 'Easy',
    explanation: 'Use stack to match opening and closing brackets. Push opening, pop and verify on closing.',
    solution: `import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                
                char top = stack.pop();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
            }
        }
        
        return stack.isEmpty();
    }
}

// Usage
// Input: "()[]{}"
// Output: true`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 83,
    category: 'Java',
    question: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    explanation: 'Iteratively compare nodes from both lists and build merged list by linking smaller node.',
    solution: `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

public class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        // Attach remaining nodes
        current.next = (l1 != null) ? l1 : l2;
        
        return dummy.next;
    }
}

// Usage
// Input: 1->2->4, 1->3->4
// Output: 1->1->2->3->4->4`,
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 84,
    category: 'Java',
    question: 'Maximum Subarray (Kadane\'s Algorithm)',
    difficulty: 'Medium',
    explanation: 'Track current sum and max sum. Reset current sum when it becomes negative.',
    solution: `public class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = Integer.MIN_VALUE;
        int currentSum = 0;
        
        for (int num : nums) {
            currentSum = Math.max(num, currentSum + num);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
}

// Usage
// Input: [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6 (subarray [4,-1,2,1])`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 85,
    category: 'Java',
    question: 'Binary Search',
    difficulty: 'Easy',
    explanation: 'Divide and conquer on sorted array. Compare middle element, eliminate half based on comparison.',
    solution: `public class Solution {
    public int binarySearch(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2; // Avoid overflow
            
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1; // Not found
    }
}

// Usage
// Input: nums = [-1,0,3,5,9,12], target = 9
// Output: 4`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 86,
    category: 'Java',
    question: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    explanation: 'Sliding window with HashMap to track character indices. Expand right, shrink left on duplicate.',
    solution: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> charIndex = new HashMap<>();
        int maxLength = 0;
        int start = 0;
        
        for (int end = 0; end < s.length(); end++) {
            char c = s.charAt(end);
            
            if (charIndex.containsKey(c) && charIndex.get(c) >= start) {
                start = charIndex.get(c) + 1;
            }
            
            charIndex.put(c, end);
            maxLength = Math.max(maxLength, end - start + 1);
        }
        
        return maxLength;
    }
}

// Usage
// Input: "abcabcbb"
// Output: 3 (substring "abc")`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, m))',
    priority: null
  },
  {
    id: 87,
    category: 'Java',
    question: 'Group Anagrams',
    difficulty: 'Medium',
    explanation: 'Sort each string to create key, group strings with same sorted key using HashMap.',
    solution: `import java.util.*;

public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> anagramMap = new HashMap<>();
        
        for (String str : strs) {
            char[] chars = str.toCharArray();
            Arrays.sort(chars);
            String sortedKey = new String(chars);
            
            anagramMap.computeIfAbsent(sortedKey, k -> new ArrayList<>());
            anagramMap.get(sortedKey).add(str);
        }
        
        return new ArrayList<>(anagramMap.values());
    }
}

// Usage
// Input: ["eat","tea","tan","ate","nat","bat"]
// Output: [["eat","tea","ate"],["tan","nat"],["bat"]]`,
    timeComplexity: 'O(n * k log k)',
    spaceComplexity: 'O(n * k)',
    priority: null
  },
  {
    id: 88,
    category: 'Java',
    question: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    explanation: 'Recursive validation with min/max bounds. Each node must be within valid range.',
    solution: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Solution {
    public boolean isValidBST(TreeNode root) {
        return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    private boolean isValidBST(TreeNode node, long min, long max) {
        if (node == null) return true;
        
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        return isValidBST(node.left, min, node.val) &&
               isValidBST(node.right, node.val, max);
    }
}

// Usage
//     2
//    / \\
//   1   3
// Output: true`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) where h is height',
    priority: null
  },
  {
    id: 89,
    category: 'Java',
    question: 'Implement LRU Cache',
    difficulty: 'Hard',
    explanation: 'Combine HashMap for O(1) access with Doubly Linked List for ordering. Move accessed nodes to front.',
    solution: `import java.util.HashMap;
import java.util.Map;

class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }
    
    private final int capacity;
    private final Map<Integer, Node> cache;
    private final Node head, tail;
    
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!cache.containsKey(key)) return -1;
        
        Node node = cache.get(key);
        remove(node);
        addToFront(node);
        return node.value;
    }
    
    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            remove(cache.get(key));
        }
        
        if (cache.size() >= capacity) {
            cache.remove(tail.prev.key);
            remove(tail.prev);
        }
        
        Node newNode = new Node(key, value);
        addToFront(newNode);
        cache.put(key, newNode);
    }
    
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    private void addToFront(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
}

// Usage
// LRUCache cache = new LRUCache(2);
// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1); // returns 1`,
    timeComplexity: 'O(1) for get/put',
    spaceComplexity: 'O(capacity)',
    priority: null
  },
  {
    id: 90,
    category: 'Java',
    question: 'Top K Frequent Elements',
    difficulty: 'Medium',
    explanation: 'Count frequencies with HashMap, use Min-Heap of size K to track top K elements.',
    solution: `import java.util.*;

public class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // Count frequencies
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : nums) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }
        
        // Min-heap based on frequency
        PriorityQueue<Map.Entry<Integer, Integer>> minHeap = 
            new PriorityQueue<>((a, b) -> a.getValue() - b.getValue());
        
        for (Map.Entry<Integer, Integer> entry : freqMap.entrySet()) {
            minHeap.offer(entry);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        // Extract results
        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            result[i] = minHeap.poll().getKey();
        }
        
        return result;
    }
}

// Usage
// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1, 2]`,
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 91,
    category: 'Java',
    question: 'Clone Graph',
    difficulty: 'Medium',
    explanation: 'BFS traversal with HashMap to track cloned nodes. Create copy and connect neighbors.',
    solution: `import java.util.*;

class Node {
    public int val;
    public List<Node> neighbors;
    
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
}

public class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        
        Map<Node, Node> visited = new HashMap<>();
        Queue<Node> queue = new LinkedList<>();
        
        // Clone first node
        Node clone = new Node(node.val);
        visited.put(node, clone);
        queue.offer(node);
        
        while (!queue.isEmpty()) {
            Node current = queue.poll();
            
            for (Node neighbor : current.neighbors) {
                if (!visited.containsKey(neighbor)) {
                    visited.put(neighbor, new Node(neighbor.val));
                    queue.offer(neighbor);
                }
                
                visited.get(current).neighbors.add(visited.get(neighbor));
            }
        }
        
        return clone;
    }
}`,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    priority: null
  },
  {
    id: 92,
    category: 'Java',
    question: 'Word Ladder',
    difficulty: 'Hard',
    explanation: 'BFS to find shortest transformation sequence. Change one letter at a time, check if word exists in dictionary.',
    solution: `import java.util.*;

public class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;
        
        Queue<String> queue = new LinkedList<>();
        queue.offer(beginWord);
        int level = 1;
        
        while (!queue.isEmpty()) {
            int size = queue.size();
            
            for (int i = 0; i < size; i++) {
                String current = queue.poll();
                char[] chars = current.toCharArray();
                
                for (int j = 0; j < chars.length; j++) {
                    char original = chars[j];
                    
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        
                        chars[j] = c;
                        String newWord = new String(chars);
                        
                        if (newWord.equals(endWord)) {
                            return level + 1;
                        }
                        
                        if (wordSet.contains(newWord)) {
                            queue.offer(newWord);
                            wordSet.remove(newWord);
                        }
                    }
                    
                    chars[j] = original;
                }
            }
            level++;
        }
        
        return 0;
    }
}

// Usage
// Input: beginWord = "hit", endWord = "cog",
//        wordList = ["hot","dot","dog","lot","log","cog"]
// Output: 5 (hit -> hot -> dot -> dog -> cog)`,
    timeComplexity: 'O(M^2 * N)',
    spaceComplexity: 'O(M^2 * N)',
    priority: null
  },
  {
    id: 93,
    category: 'Java',
    question: 'Serialize and Deserialize Binary Tree',
    difficulty: 'Hard',
    explanation: 'Use preorder traversal with null markers for serialization. Parse string recursively for deserialization.',
    solution: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

public class Codec {
    private static final String NULL_MARKER = "#";
    private static final String SEPARATOR = ",";
    
    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        serializeHelper(root, sb);
        return sb.toString();
    }
    
    private void serializeHelper(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append(NULL_MARKER).append(SEPARATOR);
            return;
        }
        
        sb.append(node.val).append(SEPARATOR);
        serializeHelper(node.left, sb);
        serializeHelper(node.right, sb);
    }
    
    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(SEPARATOR)));
        return deserializeHelper(queue);
    }
    
    private TreeNode deserializeHelper(Queue<String> queue) {
        String val = queue.poll();
        
        if (val.equals(NULL_MARKER)) {
            return null;
        }
        
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = deserializeHelper(queue);
        node.right = deserializeHelper(queue);
        
        return node;
    }
}

// Usage
// Codec codec = new Codec();
// String serialized = codec.serialize(root);
// TreeNode deserialized = codec.deserialize(serialized);`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 94,
    category: 'Java',
    question: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    explanation: 'Binary search on smaller array to find correct partition point. Ensure left half <= right half.',
    solution: `public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Ensure nums1 is smaller
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        
        int m = nums1.length;
        int n = nums2.length;
        int left = 0, right = m;
        
        while (left <= right) {
            int partitionX = (left + right) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;
            
            int maxX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int minX = (partitionX == m) ? Integer.MAX_VALUE : nums1[partitionX];
            
            int maxY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int minY = (partitionY == n) ? Integer.MAX_VALUE : nums2[partitionY];
            
            if (maxX <= minY && maxY <= minX) {
                if ((m + n) % 2 == 0) {
                    return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2.0;
                } else {
                    return Math.max(maxX, maxY);
                }
            } else if (maxX > minY) {
                right = partitionX - 1;
            } else {
                left = partitionX + 1;
            }
        }
        
        throw new IllegalArgumentException("Input arrays are not sorted");
    }
}

// Usage
// Input: nums1 = [1,3], nums2 = [2]
// Output: 2.0`,
    timeComplexity: 'O(log(min(m, n)))',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 95,
    category: 'Java',
    question: 'Trapping Rain Water',
    difficulty: 'Hard',
    explanation: 'Two pointer approach. Track max height from left and right. Water trapped depends on minimum of both max heights.',
    solution: `public class Solution {
    public int trap(int[] height) {
        if (height == null || height.length == 0) return 0;
        
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        
        return water;
    }
}

// Usage
// Input: [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    priority: null
  },

  // ==================== NODE.JS QUESTIONS ====================
  {
    id: 96,
    category: 'Node.js',
    question: 'Create an HTTP Server',
    difficulty: 'Easy',
    explanation: 'Build a basic HTTP server using the built-in http module. Handle requests and send responses.',
    solution: `const http = require('http');

const server = http.createServer((req, res) => {
  // Set response headers
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  // Send response
  res.end(JSON.stringify({
    message: 'Hello World',
    method: req.method,
    url: req.url
  }));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 97,
    category: 'Node.js',
    question: 'Read and Write Files',
    difficulty: 'Easy',
    explanation: 'Use fs module to read from and write to files. Support both synchronous and asynchronous operations.',
    solution: `const fs = require('fs');
const path = require('path');

// Async file reading
async function readFileAsync(filePath) {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    console.error('Error reading file:', err.message);
    throw err;
  }
}

// Async file writing
async function writeFileAsync(filePath, content) {
  try {
    await fs.promises.writeFile(filePath, content, 'utf8');
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing file:', err.message);
    throw err;
  }
}

// Stream large files efficiently
function streamFile(inputPath, outputPath) {
  const readStream = fs.createReadStream(inputPath);
  const writeStream = fs.createWriteStream(outputPath);
  
  return new Promise((resolve, reject) => {
    readStream.pipe(writeStream);
    
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
    readStream.on('error', reject);
  });
}

// Usage
(async () => {
  // Read file
  const content = await readFileAsync('input.txt');
  console.log(content);
  
  // Write file
  await writeFileAsync('output.txt', 'Hello World');
  
  // Stream file
  await streamFile('large-file.txt', 'copy.txt');
})();`,
    timeComplexity: 'O(n) where n is file size',
    spaceComplexity: 'O(1) with streams',
    priority: null
  },
  {
    id: 98,
    category: 'Node.js',
    question: 'Implement Debounce Function',
    difficulty: 'Medium',
    explanation: 'Create a debounce utility that delays function execution until after wait time has elapsed since last call.',
    solution: `function debounce(func, wait) {
  let timeout;
  
  return function executedFunction(...args) {
    const context = this;
    
    // Clear previous timeout
    clearTimeout(timeout);
    
    // Set new timeout
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Usage in Express
const express = require('express');
const app = express();

const expensiveOperation = (query) => {
  console.log('Searching for:', query);
  // Simulate expensive operation
  return new Promise(resolve => {
    setTimeout(() => resolve({ results: [] }), 100);
  });
};

const debouncedSearch = debounce(async (req, res) => {
  const { q } = req.query;
  const results = await expensiveOperation(q);
  res.json(results);
}, 300);

app.get('/search', debouncedSearch);

app.listen(3000);`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 99,
    category: 'Node.js',
    question: 'Create EventEmitter',
    difficulty: 'Medium',
    explanation: 'Implement a custom EventEmitter class with on, emit, once, and removeListener methods.',
    solution: `class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    
    // Return unsubscribe function
    return () => this.removeListener(event, listener);
  }
  
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.removeListener(event, wrapper);
    };
    
    this.on(event, wrapper);
  }
  
  emit(event, ...args) {
    const listeners = this.events.get(event);
    if (!listeners) return false;
    
    listeners.forEach(listener => {
      try {
        listener(...args);
      } catch (err) {
        console.error('Listener error:', err);
      }
    });
    
    return true;
  }
  
  removeListener(event, listener) {
    const listeners = this.events.get(event);
    if (!listeners) return;
    
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
    
    // Clean up empty arrays
    if (listeners.length === 0) {
      this.events.delete(event);
    }
  }
  
  removeAllListeners(event) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
  
  listenerCount(event) {
    const listeners = this.events.get(event);
    return listeners ? listeners.length : 0;
  }
}

// Usage
const emitter = new EventEmitter();

emitter.on('greet', (name) => {
  console.log(\`Hello, \${name}!\`);
});

emitter.once('welcome', () => {
  console.log('Welcome!');
});

emitter.emit('greet', 'John'); // Hello, John!
emitter.emit('welcome');       // Welcome!
emitter.emit('welcome');       // Nothing`,
    timeComplexity: 'O(n) for emit where n is listeners',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 100,
    category: 'Node.js',
    question: 'Build a Simple REST API with Express',
    difficulty: 'Medium',
    explanation: 'Create a CRUD REST API using Express.js with proper routing, middleware, and error handling.',
    solution: `const express = require('express');
const app = express();

app.use(express.json());

// In-memory storage (use database in production)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' }
];
let nextId = 3;

// GET all items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET single item
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

// POST create item
app.post('/api/items', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newItem = {
    id: nextId++,
    name
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update item
app.put('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  item.name = name;
  res.json(item);
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    timeComplexity: 'O(n) for find operations',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 101,
    category: 'Node.js',
    question: 'Implement Rate Limiting Middleware',
    difficulty: 'Medium',
    explanation: 'Create middleware to limit request frequency per IP address using a sliding window approach.',
    solution: `const express = require('express');
const app = express();

// Rate limiter implementation
class RateLimiter {
  constructor(windowMs, maxRequests) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.requests = new Map();
  }
  
  isRateLimited(ip) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    // Get or initialize request timestamps
    if (!this.requests.has(ip)) {
      this.requests.set(ip, []);
    }
    
    const timestamps = this.requests.get(ip);
    
    // Remove old timestamps outside window
    while (timestamps.length > 0 && timestamps[0] <= windowStart) {
      timestamps.shift();
    }
    
    // Check if limit exceeded
    if (timestamps.length >= this.maxRequests) {
      return true;
    }
    
    // Add current timestamp
    timestamps.push(now);
    return false;
  }
  
  getRemainingRequests(ip) {
    const timestamps = this.requests.get(ip) || [];
    return Math.max(0, this.maxRequests - timestamps.length);
  }
}

// Create rate limiter: 100 requests per 15 minutes
const limiter = new RateLimiter(15 * 60 * 1000, 100);

// Rate limiting middleware
function rateLimitMiddleware(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  
  if (limiter.isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many requests',
      retryAfter: Math.ceil(limiter.windowMs / 1000)
    });
  }
  
  // Add rate limit headers
  res.setHeader('X-RateLimit-Limit', limiter.maxRequests);
  res.setHeader('X-RateLimit-Remaining', limiter.getRemainingRequests(ip));
  
  next();
}

// Apply to all routes
app.use(rateLimitMiddleware);

app.get('/api/data', (req, res) => {
  res.json({ data: 'Here is your data' });
});

app.listen(3000);`,
    timeComplexity: 'O(1) amortized',
    spaceComplexity: 'O(n) where n is unique IPs',
    priority: null
  },
  {
    id: 102,
    category: 'Node.js',
    question: 'Create a WebSocket Server',
    difficulty: 'Hard',
    explanation: 'Build a real-time WebSocket server for bidirectional communication between client and server.',
    solution: `const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws, req) => {
  console.log('New client connected');
  clients.add(ws);
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Connected to WebSocket server'
  }));
  
  // Broadcast to all clients
  const broadcast = (data) => {
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };
  
  // Handle messages
  ws.on('message', (message) => {
    console.log('Received:', message);
    
    try {
      const data = JSON.parse(message);
      
      // Echo back to sender
      ws.send(JSON.stringify({
        type: 'echo',
        data: data
      }));
      
      // Broadcast to others
      broadcast({
        type: 'broadcast',
        data: data,
        clientId: ws._id
      });
    } catch (err) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid JSON'
      }));
    }
  });
  
  // Handle disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

console.log('WebSocket server running on ws://localhost:8080');

// Client-side example (browser)
/*
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Connected');
  socket.send(JSON.stringify({ message: 'Hello!' }));
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

socket.onerror = (error) => {
  console.error('Error:', error);
};

socket.onclose = () => {
  console.log('Disconnected');
};
*/`,
    timeComplexity: 'O(n) for broadcast where n is clients',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 103,
    category: 'Node.js',
    question: 'Implement JWT Authentication',
    difficulty: 'Medium',
    explanation: 'Create authentication middleware using JSON Web Tokens for stateless user verification.',
    solution: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '1h';

// Mock user database
const users = [];

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    SECRET_KEY,
    { expiresIn: TOKEN_EXPIRY }
  );
}

// Verify JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid token');
  }
}

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;
    
    // Validate input
    if (!email || !password || !username) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = {
      id: users.length + 1,
      email,
      username,
      password: hashedPassword,
      role: 'user'
    };
    
    users.push(user);
    
    // Generate token
    const token = generateToken(user);
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, username: user.username }
    });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user);
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, username: user.username }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Protected route
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Protected data',
    user: req.user
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    timeComplexity: 'O(1) for token verification',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 104,
    category: 'Node.js',
    question: 'Build a File Upload Handler',
    difficulty: 'Medium',
    explanation: 'Implement secure file upload with validation, streaming, and error handling using multer.',
    solution: `const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, \`\${file.fieldname}-\${uniqueSuffix}\${ext}\`);
  }
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5                    // Max 5 files
  },
  fileFilter: fileFilter
});

// Single file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path
    }
  });
});

// Multiple file upload
app.post('/api/upload-multiple', upload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  
  const files = req.files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    size: file.size
  }));
  
  res.json({
    message: \`\${files.length} files uploaded successfully\`,
    files
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large (max 5MB)' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files (max 5)' });
    }
    return res.status(400).json({ error: err.message });
  }
  
  if (err.message === 'Invalid file type') {
    return res.status(400).json({ error: 'Invalid file type' });
  }
  
  next(err);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    timeComplexity: 'O(n) where n is file size',
    spaceComplexity: 'O(1) with streaming',
    priority: null
  },
  {
    id: 105,
    category: 'Node.js',
    question: 'Implement Logging System',
    difficulty: 'Medium',
    explanation: 'Create a structured logging system with different log levels, file output, and rotation.',
    solution: `const fs = require('fs');
const path = require('path');

class Logger {
  constructor(options = {}) {
    this.logLevel = options.level || 'info';
    this.logDir = options.logDir || 'logs';
    this.maxFileSize = options.maxFileSize || 10 * 1024 * 1024; // 10MB
    
    // Log levels hierarchy
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
      verbose: 4
    };
    
    // Ensure log directory exists
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }
  
  _shouldLog(level) {
    return this.levels[level] <= this.levels[this.logLevel];
  }
  
  _formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length > 0 ? ' ' + JSON.stringify(meta) : '';
    
    return '[' + timestamp + '] [' + level.toUpperCase() + '] ' + message + metaStr;
  }
  
  _writeToFile(message) {
    const date = new Date().toISOString().split('T')[0];
    const logFile = path.join(this.logDir, 'app-' + date + '.log');
    
    // Append to file
    fs.appendFile(logFile, message + '\\n', (err) => {
      if (err) {
        console.error('Failed to write to log file:', err);
      }
    });
    
    // Check file size and rotate if needed
    this._rotateLog(logFile);
  }
  
  _rotateLog(logFile) {
    try {
      const stats = fs.statSync(logFile);
      
      if (stats.size > this.maxFileSize) {
        const rotatedFile = logFile + '.' + Date.now();
        fs.renameSync(logFile, rotatedFile);
      }
    } catch (err) {
      // File doesn't exist yet
    }
  }
  
  error(message, meta = {}) {
    if (this._shouldLog('error')) {
      const formatted = this._formatMessage('error', message, meta);
      console.error(formatted);
      this._writeToFile(formatted);
    }
  }
  
  warn(message, meta = {}) {
    if (this._shouldLog('warn')) {
      const formatted = this._formatMessage('warn', message, meta);
      console.warn(formatted);
      this._writeToFile(formatted);
    }
  }
  
  info(message, meta = {}) {
    if (this._shouldLog('info')) {
      const formatted = this._formatMessage('info', message, meta);
      console.log(formatted);
      this._writeToFile(formatted);
    }
  }
  
  debug(message, meta = {}) {
    if (this._shouldLog('debug')) {
      const formatted = this._formatMessage('debug', message, meta);
      console.log(formatted);
      this._writeToFile(formatted);
    }
  }
  
  verbose(message, meta = {}) {
    if (this._shouldLog('verbose')) {
      const formatted = this._formatMessage('verbose', message, meta);
      console.log(formatted);
      this._writeToFile(formatted);
    }
  }
}

// Usage
const logger = new Logger({
  level: 'debug',
  logDir: 'logs',
  maxFileSize: 5 * 1024 * 1024 // 5MB
});

logger.info('Server started', { port: 3000 });
logger.error('Database connection failed', { error: 'Connection refused' });
logger.warn('High memory usage', { memory: process.memoryUsage() });
logger.debug('Request received', { method: 'GET', url: '/api/users' });`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    priority: null
  },

  // Express.js Coding Questions
  {
    id: 110,
    category: 'Express.js',
    question: 'Build a REST API with Express',
    difficulty: 'Medium',
    explanation: 'Create a complete CRUD REST API using Express.js with proper routing, middleware, and error handling for a resource management system.',
    solution: `const express = require('express');
const app = express();

app.use(express.json());

// In-memory storage (use database in production)
let items = [
  { id: 1, name: 'Item 1', description: 'First item' },
  { id: 2, name: 'Item 2', description: 'Second item' }
];
let nextId = 3;

// GET all items
app.get('/api/items', (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  
  let filteredItems = items;
  
  // Search functionality
  if (search) {
    filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  
  res.json({
    data: paginatedItems,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(filteredItems.length / limit),
      totalItems: filteredItems.length
    }
  });
});

// GET single item
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

// POST create new item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  
  // Validation
  if (!name || !description) {
    return res.status(400).json({ 
      error: 'Name and description are required' 
    });
  }
  
  const newItem = {
    id: nextId++,
    name,
    description,
    createdAt: new Date().toISOString()
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update entire item
app.put('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const { name, description } = req.body;
  
  if (!name || !description) {
    return res.status(400).json({ 
      error: 'Name and description are required' 
    });
  }
  
  items[itemIndex] = {
    ...items[itemIndex],
    name,
    description,
    updatedAt: new Date().toISOString()
  };
  
  res.json(items[itemIndex]);
});

// PATCH partial update
app.patch('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const updates = req.body;
  
  // Only update provided fields
  if (updates.name) items[itemIndex].name = updates.name;
  if (updates.description) items[itemIndex].description = updates.description;
  items[itemIndex].updatedAt = new Date().toISOString();
  
  res.json(items[itemIndex]);
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deletedItem = items.splice(itemIndex, 1)[0];
  res.json({ message: 'Item deleted', item: deletedItem });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    timeComplexity: 'O(n) for search operations',
    spaceComplexity: 'O(n)',
    priority: null
  },
  {
    id: 111,
    category: 'Express.js',
    question: 'Implement Authentication Middleware',
    difficulty: 'Medium',
    explanation: 'Create JWT-based authentication middleware that protects routes and validates user tokens.',
    solution: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const TOKEN_EXPIRY = '1h';

// Mock user database
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'admin'
  },
  {
    id: 2,
    email: 'test@example.com',
    password: bcrypt.hashSync('test123', 10),
    role: 'user'
  }
];

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: TOKEN_EXPIRY }
  );
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Authorization middleware (role-based)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

// Login route
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find user
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate token
  const token = generateToken(user);
  
  res.json({
    token,
    expiresIn: TOKEN_EXPIRY,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
});

// Public route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Protected route (any authenticated user)
app.get('/profile', authenticate, (req, res) => {
  res.json({
    message: 'Protected profile data',
    user: req.user
  });
});

// Admin-only route
app.get('/admin/dashboard', authenticate, authorize('admin'), (req, res) => {
  res.json({
    message: 'Admin dashboard',
    stats: { totalUsers: users.length }
  });
});

// Refresh token endpoint
app.post('/auth/refresh', authenticate, (req, res) => {
  const newToken = generateToken(req.user);
  res.json({ token: newToken, expiresIn: TOKEN_EXPIRY });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    timeComplexity: 'O(1) for token verification',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 112,
    category: 'Express.js',
    question: 'Create File Upload Handler',
    difficulty: 'Medium',
    explanation: 'Implement a secure file upload system with validation, size limits, and multiple storage options.',
    solution: `const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const app = express();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = crypto.randomBytes(8).toString('hex');
    const ext = path.extname(file.originalname);
    cb(null, \`\${uniqueSuffix}\${ext}\`);
  }
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'application/pdf': ['.pdf']
  };
  
  const allowedMimeTypes = Object.keys(allowedTypes);
  const extname = path.extname(file.originalname).toLowerCase();
  
  // Check MIME type
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  
  // Check extension matches MIME type
  const validExtensions = allowedTypes[file.mimetype];
  if (!validExtensions.includes(extname)) {
    return cb(new Error('File extension does not match MIME type'), false);
  }
  
  cb(null, true);
};

// Configure multer with limits
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: fileFilter
});

// Single file upload
app.post('/upload/single', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
      url: \`/uploads/\${req.file.filename}\`
    }
  });
});

// Multiple file upload
app.post('/upload/multiple', upload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  
  const files = req.files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
    url: \`/uploads/\${file.filename}\`
  }));
  
  res.json({
    message: \`\${files.length} files uploaded successfully\`,
    files
  });
});

// Upload with additional metadata
app.post('/upload/profile-picture', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const { userId } = req.body;
  
  // Validate userId
  if (!userId) {
    // Delete uploaded file
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  res.json({
    message: 'Profile picture uploaded',
    userId,
    file: {
      filename: req.file.filename,
      url: \`/uploads/\${req.file.filename}\`
    }
  });
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Error handling for multer
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size exceeds 5MB limit' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum 5 files allowed' });
    }
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({ error: err.message });
  }
  
  next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    timeComplexity: 'O(n) where n is file size',
    spaceComplexity: 'O(n) for file storage',
    priority: null
  },
  {
    id: 113,
    category: 'Express.js',
    question: 'Implement Rate Limiting',
    difficulty: 'Easy',
    explanation: 'Create a custom rate limiting middleware that restricts the number of requests from a single IP address within a specified time window.',
    solution: `const express = require('express');
const app = express();

// Custom rate limiter
const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    maxRequests = 100,
    message = 'Too many requests, please try again later',
    statusCode = 429
  } = options;
  
  // Store to track requests: { ip: { count, resetTime } }
  const requestStore = new Map();
  
  // Cleanup interval to remove expired entries
  const cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of requestStore.entries()) {
      if (now > data.resetTime) {
        requestStore.delete(ip);
      }
    }
  }, 60000); // Clean up every minute
  
  // Prevent cleanup from keeping process alive
  cleanupInterval.unref();
  
  return (req, res, next) => {
    const clientIp = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    // Get or create entry for this IP
    let requestData = requestStore.get(clientIp);
    
    if (!requestData || now > requestData.resetTime) {
      // New window
      requestData = {
        count: 1,
        resetTime: now + windowMs
      };
      requestStore.set(clientIp, requestData);
    } else {
      // Existing window
      requestData.count++;
    }
    
    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - requestData.count));
    res.setHeader('X-RateLimit-Reset', new Date(requestData.resetTime).toISOString());
    
    // Check if limit exceeded
    if (requestData.count > maxRequests) {
      return res.status(statusCode).json({
        error: message,
        retryAfter: Math.ceil((requestData.resetTime - now) / 1000)
      });
    }
    
    next();
  };
};

// Apply rate limiter
const limiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100
});

app.use(limiter);

// Stricter rate limiter for auth endpoints
const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 5,
  message: 'Too many login attempts, please try again after 15 minutes'
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome!' });
});

app.post('/auth/login', authLimiter, (req, res) => {
  res.json({ message: 'Login successful' });
});

app.get('/api/data', (req, res) => {
  res.json({ data: 'Some data' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    timeComplexity: 'O(1) per request',
    spaceComplexity: 'O(n) where n is number of unique IPs',
    priority: null
  },
  {
    id: 114,
    category: 'Express.js',
    question: 'Build Request Validation Middleware',
    difficulty: 'Medium',
    explanation: 'Create a flexible validation middleware that validates request body, query parameters, and route parameters using schema definitions.',
    solution: `const express = require('express');
const app = express();

app.use(express.json());

// Validation helper functions
const validators = {
  required: (value, fieldName) => {
    if (value === undefined || value === null || value === '') {
      throw new Error(\`\${fieldName} is required\`);
    }
    return true;
  },
  
  isEmail: (value, fieldName) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error(\`\${fieldName} must be a valid email\`);
    }
    return true;
  },
  
  minLength: (value, min, fieldName) => {
    if (String(value).length < min) {
      throw new Error(\`\${fieldName} must be at least \${min} characters\`);
    }
    return true;
  },
  
  maxLength: (value, max, fieldName) => {
    if (String(value).length > max) {
      throw new Error(\`\${fieldName} must be at most \${max} characters\`);
    }
    return true;
  },
  
  isNumber: (value, fieldName) => {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error(\`\${fieldName} must be a number\`);
    }
    return true;
  },
  
  min: (value, minValue, fieldName) => {
    if (Number(value) < minValue) {
      throw new Error(\`\${fieldName} must be at least \${minValue}\`);
    }
    return true;
  },
  
  max: (value, maxValue, fieldName) => {
    if (Number(value) > maxValue) {
      throw new Error(\`\${fieldName} must be at most \${maxValue}\`);
    }
    return true;
  },
  
  isIn: (value, allowedValues, fieldName) => {
    if (!allowedValues.includes(value)) {
      throw new Error(\`\${fieldName} must be one of: \${allowedValues.join(', ')}\`);
    }
    return true;
  }
};

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const errors = [];
    
    // Determine which part of request to validate
    const dataToValidate = {
      body: req.body,
      query: req.query,
      params: req.params
    };
    
    // Validate each field in schema
    for (const [location, rules] of Object.entries(schema)) {
      const data = dataToValidate[location];
      
      if (!data && Object.keys(rules).length > 0) {
        errors.push(\`No \${location} provided\`);
        continue;
      }
      
      for (const [field, fieldRules] of Object.entries(rules)) {
        try {
          const value = data[field];
          
          // Check if field is required
          if (fieldRules.required) {
            validators.required(value, field);
          }
          
          // Skip further validation if value is empty and not required
          if (value === undefined || value === null || value === '') {
            continue;
          }
          
          // Apply validation rules
          if (fieldRules.email) {
            validators.isEmail(value, field);
          }
          
          if (fieldRules.minLength) {
            validators.minLength(value, fieldRules.minLength, field);
          }
          
          if (fieldRules.maxLength) {
            validators.maxLength(value, fieldRules.maxLength, field);
          }
          
          if (fieldRules.isNumber) {
            validators.isNumber(value, field);
          }
          
          if (fieldRules.min !== undefined) {
            validators.min(value, fieldRules.min, field);
          }
          
          if (fieldRules.max !== undefined) {
            validators.max(value, fieldRules.max, field);
          }
          
          if (fieldRules.isIn) {
            validators.isIn(value, fieldRules.isIn, field);
          }
          
        } catch (error) {
          errors.push(error.message);
        }
      }
    }
    
    // If there are errors, return 400
    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
    }
    
    next();
  };
};

// Example: User registration with validation
const registerSchema = {
  body: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minLength: 8,
      maxLength: 100
    },
    age: {
      isNumber: true,
      min: 18,
      max: 120
    },
    role: {
      isIn: ['user', 'admin', 'moderator']
    }
  }
};

app.post('/register', validate(registerSchema), (req, res) => {
  const { name, email, password } = req.body;
  
  // Process registration
  res.status(201).json({
    message: 'User registered successfully',
    user: { name, email }
  });
});

// Example: Product creation with validation
const productSchema = {
  body: {
    name: {
      required: true,
      minLength: 3,
      maxLength: 100
    },
    price: {
      required: true,
      isNumber: true,
      min: 0
    },
    category: {
      required: true,
      isIn: ['electronics', 'clothing', 'books', 'food']
    }
  },
  query: {
    page: {
      isNumber: true,
      min: 1
    },
    limit: {
      isNumber: true,
      min: 1,
      max: 100
    }
  }
};

app.post('/products', validate(productSchema), (req, res) => {
  res.status(201).json({
    message: 'Product created',
    product: req.body
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    timeComplexity: 'O(n) where n is number of validation rules',
    spaceComplexity: 'O(1)',
    priority: null
  },
  {
    id: 115,
    category: 'Express.js',
    question: 'Implement WebSocket Chat Server',
    difficulty: 'Hard',
    explanation: 'Build a real-time chat server using Express and WebSocket (ws library) with rooms, user management, and message broadcasting.',
    solution: `const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients and rooms
const clients = new Map(); // ws -> { username, room }
const rooms = new Map();   // roomName -> Set of ws

// Broadcast message to room
const broadcastToRoom = (room, message, senderWs) => {
  const roomClients = rooms.get(room);
  if (!roomClients) return;
  
  const data = JSON.stringify(message);
  
  roomClients.forEach(client => {
    if (client !== senderWs && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Broadcast to all clients in room including sender
const broadcastToRoomAll = (room, message) => {
  const roomClients = rooms.get(room);
  if (!roomClients) return;
  
  const data = JSON.stringify(message);
  
  roomClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('message', (rawMessage) => {
    try {
      const message = JSON.parse(rawMessage);
      const clientInfo = clients.get(ws);
      
      switch (message.type) {
        case 'join':
          // User joins a room
          const { username, room } = message;
          
          // Store client info
          clients.set(ws, { username, room });
          
          // Add to room
          if (!rooms.has(room)) {
            rooms.set(room, new Set());
          }
          rooms.get(room).add(ws);
          
          // Notify room members
          broadcastToRoomAll(room, {
            type: 'system',
            message: \`\${username} joined the room\`,
            timestamp: new Date().toISOString(),
            users: Array.from(rooms.get(room)).map(
              clientWs => clients.get(clientWs)?.username
            ).filter(Boolean)
          });
          
          ws.send(JSON.stringify({
            type: 'joined',
            room,
            message: \`Successfully joined \${room}\`
          }));
          break;
          
        case 'chat':
          // Send chat message
          if (!clientInfo) {
            ws.send(JSON.stringify({
              type: 'error',
              message: 'You must join a room first'
            }));
            return;
          }
          
          const chatMessage = {
            type: 'chat',
            username: clientInfo.username,
            message: message.content,
            timestamp: new Date().toISOString()
          };
          
          broadcastToRoomAll(clientInfo.room, chatMessage);
          break;
          
        case 'typing':
          // Typing indicator
          if (clientInfo) {
            broadcastToRoom(clientInfo.room, {
              type: 'typing',
              username: clientInfo.username
            }, ws);
          }
          break;
          
        default:
          ws.send(JSON.stringify({
            type: 'error',
            message: 'Unknown message type'
          }));
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  });
  
  ws.on('close', () => {
    const clientInfo = clients.get(ws);
    
    if (clientInfo) {
      const { username, room } = clientInfo;
      
      // Remove from room
      const roomClients = rooms.get(room);
      if (roomClients) {
        roomClients.delete(ws);
        
        // Notify remaining members
        broadcastToRoomAll(room, {
          type: 'system',
          message: \`\${username} left the room\`,
          timestamp: new Date().toISOString(),
          users: Array.from(roomClients).map(
            clientWs => clients.get(clientWs)?.username
          ).filter(Boolean)
        });
        
        // Clean up empty rooms
        if (roomClients.size === 0) {
          rooms.delete(room);
        }
      }
      
      // Remove client
      clients.delete(ws);
    }
    
    console.log('Client disconnected');
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// HTTP endpoint for health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    connectedClients: clients.size,
    activeRooms: rooms.size
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Chat server running on port \${PORT}\`);
});`,
    timeComplexity: 'O(n) for broadcasting where n is room size',
    spaceComplexity: 'O(n) for storing connections',
    priority: null
  },
  // Testing (Jest & RTL)
  {
    id: 201,
    category: 'Testing (Jest & RTL)',
    question: 'Write a Jest test for a simple sum function',
    difficulty: 'Easy',
    explanation: 'Test a basic utility function using Jest\'s describe, it, and expect APIs. Cover happy path and edge cases.',
    solution: `// Function to test
function sum(a, b) {
  return a + b;
}

// Jest tests
describe('sum function', () => {
  it('should add two positive numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('should add negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  it('should add zero', () => {
    expect(sum(0, 5)).toBe(5);
  });

  it('should handle floating point numbers', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'high'
  },
  {
    id: 202,
    category: 'Testing (Jest & RTL)',
    question: 'Test an async function with Jest',
    difficulty: 'Medium',
    explanation: 'Test asynchronous code using async/await, .resolves/.rejects, and done callback patterns in Jest.',
    solution: `// Async function to test
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network error');
  }
  return response.json();
}

// Jest tests
describe('fetchData', () => {
  it('should fetch data successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'test' })
      })
    );

    const result = await fetchData('https://api.example.com');
    expect(result).toEqual({ data: 'test' });
    expect(fetch).toHaveBeenCalledWith('https://api.example.com');
  });

  it('should throw error on network failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false
      })
    );

    await expect(fetchData('https://api.example.com'))
      .rejects
      .toThrow('Network error');
  });

  it('should work with .resolves matcher', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1 })
      })
    );

    return expect(fetchData('https://api.example.com'))
      .resolves
      .toEqual({ id: 1 });
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'high'
  },
  {
    id: 203,
    category: 'Testing (Jest & RTL)',
    question: 'Mock a module in Jest',
    difficulty: 'Medium',
    explanation: 'Use jest.mock() to mock external dependencies and control their behavior in tests.',
    solution: `// Module to test
import axios from 'axios';

export async function getUser(userId) {
  const response = await axios.get(\`/users/\${userId}\`);
  return response.data;
}

// Jest tests with mocking
jest.mock('axios');

describe('getUser', () => {
  it('should fetch user data', async () => {
    const mockUser = { id: 1, name: 'John' };
    axios.get.mockResolvedValue({ data: mockUser });

    const result = await getUser(1);
    
    expect(result).toEqual(mockUser);
    expect(axios.get).toHaveBeenCalledWith('/users/1');
  });

  it('should handle API errors', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    await expect(getUser(1)).rejects.toThrow('API Error');
  });

  it('should call API only once', async () => {
    const mockUser = { id: 1, name: 'John' };
    axios.get.mockResolvedValue({ data: mockUser });

    await getUser(1);
    await getUser(1);
    
    expect(axios.get).toHaveBeenCalledTimes(2);
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'high'
  },
  {
    id: 204,
    category: 'Testing (Jest & RTL)',
    question: 'Test a React component with React Testing Library',
    difficulty: 'Medium',
    explanation: 'Use @testing-library/react to render components, query elements, and test user interactions following best practices.',
    solution: `import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component to test
function Counter() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)} aria-label="reset">Reset</button>
    </div>
  );
}

// RTL tests
describe('Counter component', () => {
  it('should render initial count', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('should increment count on button click', () => {
    render(<Counter />);
    const incrementButton = screen.getByText('Increment');
    
    fireEvent.click(incrementButton);
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
    
    fireEvent.click(incrementButton);
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
  });

  it('should reset count', () => {
    render(<Counter />);
    const incrementButton = screen.getByText('Increment');
    const resetButton = screen.getByLabelText('reset');
    
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(screen.getByText('Count: 2')).toBeInTheDocument();
    
    fireEvent.click(resetButton);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('should have buttons with correct roles', () => {
    render(<Counter />);
    expect(screen.getByRole('button', { name: 'Increment' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'reset' })).toBeInTheDocument();
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'high'
  },
  {
    id: 205,
    category: 'Testing (Jest & RTL)',
    question: 'Test form validation with React Testing Library',
    difficulty: 'Hard',
    explanation: 'Test form inputs, validation messages, error states, and submission handling using user-event and RTL queries.',
    solution: `import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Component to test
function LoginForm({ onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.includes('@')) {
      newErrors.email = 'Invalid email';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span role="alert">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span role="alert">{errors.password}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

// RTL tests
describe('LoginForm', () => {
  it('should render form fields', () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should show validation errors for invalid input', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);
    
    await user.click(screen.getByRole('button', { name: 'Login' }));
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid email');
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Login' }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('should clear errors on valid input', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);
    
    // Trigger validation error
    await user.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(screen.getAllByRole('alert')).toHaveLength(2);
    });
    
    // Fix email
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await waitFor(() => {
      expect(screen.queryByText('Invalid email')).not.toBeInTheDocument();
    });
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'high'
  },
  {
    id: 206,
    category: 'Testing (Jest & RTL)',
    question: 'Test custom hooks with @testing-library/react-hooks',
    difficulty: 'Hard',
    explanation: 'Use renderHook from @testing-library/react to test custom hooks in isolation, including state updates and side effects.',
    solution: `import { renderHook, act } from '@testing-library/react';

// Custom hook to test
function useCounter(initialValue = 0) {
  const [count, setCount] = React.useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

// Hook tests
describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });

  it('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.count).toBe(12);
    
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(10);
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'high'
  },
  {
    id: 207,
    category: 'Testing (Jest & RTL)',
    question: 'Test API calls with mocked fetch in Jest',
    difficulty: 'Medium',
    explanation: 'Mock the fetch API or axios to test components that make HTTP requests without actual network calls.',
    solution: `import React, { useEffect, useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component to test
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div role="alert">Error: {error}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Tests with mocked fetch
describe('UserList', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    global.fetch.mockImplementation(() => new Promise(() => {}));
    render(<UserList />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display users after successful fetch', async () => {
    const mockUsers = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers
    });
    
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('should show error message on fetch failure', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network Error'));
    
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Error: Network Error');
    });
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'high'
  },
  {
    id: 208,
    category: 'Testing (Jest & RTL)',
    question: 'Test component with context provider',
    difficulty: 'Medium',
    explanation: 'Wrap components with context providers in tests to provide required context values and test context-dependent behavior.',
    solution: `import React, { createContext, useContext } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Context setup
const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Component to test
function ThemedButton() {
  const { theme } = useContext(ThemeContext);
  return (
    <button className={\`btn-\${theme}\`}>
      Current Theme: {theme}
    </button>
  );
}

// Tests with context
describe('ThemedButton', () => {
  it('should render with light theme by default', () => {
    render(
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    );
    
    expect(screen.getByText('Current Theme: light')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('btn-light');
  });

  it('should render with dark theme when provided', () => {
    const CustomThemeProvider = ({ children }) => (
      <ThemeContext.Provider value={{ theme: 'dark' }}>
        {children}
      </ThemeContext.Provider>
    );
    
    render(
      <CustomThemeProvider>
        <ThemedButton />
      </CustomThemeProvider>
    );
    
    expect(screen.getByText('Current Theme: dark')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('btn-dark');
  });

  it('should throw error without provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<ThemedButton />)).toThrow();
    
    consoleError.mockRestore();
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'medium'
  },
  {
    id: 209,
    category: 'Testing (Jest & RTL)',
    question: 'Test component with props and callbacks',
    difficulty: 'Easy',
    explanation: 'Test that components correctly receive props, render based on props, and call callback functions when expected.',
    solution: `import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component to test
function Button({ label, onClick, disabled = false, variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {label}
    </button>
  );
}

// Tests
describe('Button component', () => {
  it('should render with correct label', () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button label="Click Me" onClick={() => {}} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should apply correct variant class', () => {
    render(<Button label="Click Me" onClick={() => {}} variant="danger" />);
    expect(screen.getByRole('button')).toHaveClass('btn-danger');
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} disabled />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'high'
  },
  {
    id: 210,
    category: 'Testing (Jest & RTL)',
    question: 'Test conditional rendering and UI states',
    difficulty: 'Medium',
    explanation: 'Test different UI states (loading, error, empty, success) and conditional rendering logic in components.',
    solution: `import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component to test
function DataDisplay({ data, loading, error }) {
  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }
  
  if (error) {
    return <div role="alert">Error: {error}</div>;
  }
  
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  
  return (
    <ul data-testid="data-list">
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// Tests for different states
describe('DataDisplay', () => {
  it('should show loading state', () => {
    render(<DataDisplay loading={true} data={[]} error={null} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should show error message', () => {
    render(<DataDisplay loading={false} data={[]} error="Failed to load" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Error: Failed to load');
  });

  it('should show empty state', () => {
    render(<DataDisplay loading={false} data={[]} error={null} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should render data list', () => {
    const mockData = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];
    
    render(<DataDisplay loading={false} data={mockData} error={null} />);
    
    expect(screen.getByTestId('data-list')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should prioritize error over loading', () => {
    render(<DataDisplay loading={true} data={[]} error="Error occurred" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'high'
  },
  {
    id: 211,
    category: 'Testing (Jest & RTL)',
    question: 'Test snapshot and cleanup in useEffect',
    difficulty: 'Hard',
    explanation: 'Test components with useEffect hooks, including timers, intervals, subscriptions, and cleanup functions using jest.useFakeTimers().',
    solution: `import React, { useEffect, useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';

// Component to test
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return <div data-testid="timer">Seconds: {seconds}</div>;
}

// Tests with fake timers
describe('Timer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should start at 0', () => {
    render(<Timer />);
    expect(screen.getByTestId('timer')).toHaveTextContent('Seconds: 0');
  });

  it('should increment every second', () => {
    render(<Timer />);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByTestId('timer')).toHaveTextContent('Seconds: 1');
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByTestId('timer')).toHaveTextContent('Seconds: 3');
  });

  it('should cleanup interval on unmount', () => {
    const clearInterval = jest.spyOn(global, 'clearInterval');
    const { unmount } = render(<Timer />);
    
    unmount();
    expect(clearInterval).toHaveBeenCalled();
    
    clearInterval.mockRestore();
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'medium'
  },
  {
    id: 212,
    category: 'Testing (Jest & RTL)',
    question: 'Test accessibility features with RTL',
    difficulty: 'Medium',
    explanation: 'Test ARIA attributes, keyboard navigation, focus management, and screen reader compatibility using jest-axe and RTL queries.',
    solution: `import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

// Accessible component to test
function AccessibleModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onKeyDown={(e) => {
        if (e.key === 'Escape') onClose();
      }}
    >
      <h2 id="modal-title">{title}</h2>
      <div>{children}</div>
      <button onClick={onClose} aria-label="Close modal">
        ×
      </button>
    </div>
  );
}

// Accessibility tests
describe('AccessibleModal', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <AccessibleModal isOpen={true} onClose={() => {}} title="Test">
        <p>Content</p>
      </AccessibleModal>
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <AccessibleModal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Content</p>
      </AccessibleModal>
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('should close on Escape key', () => {
    const handleClose = jest.fn();
    render(
      <AccessibleModal isOpen={true} onClose={handleClose} title="Test">
        <p>Content</p>
      </AccessibleModal>
    );
    
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('should have accessible close button', () => {
    render(
      <AccessibleModal isOpen={true} onClose={() => {}} title="Test">
        <p>Content</p>
      </AccessibleModal>
    );
    
    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toBeInTheDocument();
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'medium'
  },
  {
    id: 213,
    category: 'Testing (Jest & RTL)',
    question: 'Test Redux store integration',
    difficulty: 'Hard',
    explanation: 'Test components connected to Redux store by providing a mock store with predefined state and testing dispatch actions.',
    solution: `import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

// Simple reducer
const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'increment':
      return { value: state.value + 1 };
    case 'decrement':
      return { value: state.value - 1 };
    default:
      return state;
  }
};

// Connected component
function CounterDisplay() {
  const value = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div>
      <span data-testid="count">{value}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}

// Helper to create test store
function createStore(preloadedState = {}) {
  return configureStore({
    reducer: { counter: counterReducer },
    preloadedState
  });
}

// Tests with Redux
describe('CounterDisplay with Redux', () => {
  it('should display initial count from store', () => {
    const store = createStore({ counter: { value: 5 } });
    
    render(
      <Provider store={store}>
        <CounterDisplay />
      </Provider>
    );
    
    expect(screen.getByTestId('count')).toHaveTextContent('5');
  });

  it('should increment count', () => {
    const store = createStore({ counter: { value: 0 } });
    
    render(
      <Provider store={store}>
        <CounterDisplay />
      </Provider>
    );
    
    fireEvent.click(screen.getByText('+'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('should decrement count', () => {
    const store = createStore({ counter: { value: 10 } });
    
    render(
      <Provider store={store}>
        <CounterDisplay />
      </Provider>
    );
    
    fireEvent.click(screen.getByText('-'));
    expect(screen.getByTestId('count')).toHaveTextContent('9');
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'medium'
  },
  {
    id: 214,
    category: 'Testing (Jest & RTL)',
    question: 'Test error boundaries',
    difficulty: 'Hard',
    explanation: 'Test React error boundaries to ensure they catch errors in child components and display fallback UI correctly.',
    solution: `import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Error Boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Component that throws error
function BrokenComponent() {
  throw new Error('Component crashed!');
}

// Tests
describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <div>Normal Content</div>
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Normal Content')).toBeInTheDocument();
  });

  it('should show fallback UI when child throws error', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Component crashed!')).toBeInTheDocument();
  });

  it('should not show children when error occurs', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );
    
    expect(screen.queryByText('Normal Content')).not.toBeInTheDocument();
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'medium'
  },
  {
    id: 215,
    category: 'Testing (Jest & RTL)',
    question: 'Test snapshot with React.memo and useMemo',
    difficulty: 'Hard',
    explanation: 'Verify that React.memo prevents unnecessary re-renders and useMemo caches expensive calculations correctly.',
    solution: `import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Expensive calculation
function expensiveCalc(num) {
  console.log('Calculating...');
  return num * 2;
}

// Memoized component
const ExpensiveComponent = React.memo(({ value }) => {
  console.log('ExpensiveComponent rendered');
  return <div data-testid="expensive">{value}</div>;
});

// Parent component with useMemo
function Parent({ number }) {
  const doubled = React.useMemo(() => expensiveCalc(number), [number]);
  
  return (
    <div>
      <ExpensiveComponent value={doubled} />
    </div>
  );
}

// Tests
describe('Performance optimization', () => {
  it('should memoize expensive calculation', () => {
    const calcSpy = jest.spyOn(global, 'expensiveCalc' || {}).mockImplementation(expensiveCalc);
    
    const { rerender } = render(<Parent number={5} />);
    expect(calcSpy).toHaveBeenCalledTimes(1);
    
    // Re-render with same prop
    rerender(<Parent number={5} />);
    expect(calcSpy).toHaveBeenCalledTimes(1); // Should not recalculate
    
    calcSpy.mockRestore();
  });

  it('should recalculate when dependency changes', () => {
    const { rerender } = render(<Parent number={5} />);
    
    rerender(<Parent number={10} />);
    expect(screen.getByTestId('expensive')).toHaveTextContent('20');
  });

  it('should prevent child re-render with React.memo', () => {
    const renderSpy = jest.fn();
    const MemoizedChild = React.memo(({ value }) => {
      renderSpy();
      return <div>{value}</div>;
    });
    
    const TestParent = ({ val }) => (
      <div>
        <MemoizedChild value={val} />
      </div>
    );
    
    const { rerender } = render(<TestParent val={1} />);
    expect(renderSpy).toHaveBeenCalledTimes(1);
    
    // Re-render with different unrelated prop
    rerender(<TestParent val={1} />);
    expect(renderSpy).toHaveBeenCalledTimes(1); // Should not re-render
  });
});`,
    timeComplexity: 'O(1) per test',
    spaceComplexity: 'O(1)',
    priority: 'low'
  }
]
