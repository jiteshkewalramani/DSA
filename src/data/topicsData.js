// ============= src/data/topicsData.js =============
export const topics = [
  {
    id: 'bst',
    name: 'Binary Search Tree',
    description: 'Visualize BST operations',
    icon: '🌳',
    color: 'from-blue-600 to-blue-500',
    concept: `A Binary Search Tree is a node-based data structure where:
• Left subtree contains nodes with values less than parent
• Right subtree contains nodes with values greater than parent
• Both left and right subtrees are also BSTs

Time Complexity:
• Average: O(log n) for search, insert, delete
• Worst: O(n) when tree becomes skewed

Space Complexity: O(n)

Applications:
• Database indexing
• File systems
• Expression trees
• Priority queues`,
    pseudoCode: {
      insert: `function insert(node, value):
    if node is null:
        return new Node(value)
    
    if value < node.value:
        node.left = insert(node.left, value)
    else if value > node.value:
        node.right = insert(node.right, value)
    
    return node`,
      search: `function search(node, value):
    if node is null:
        return false
    
    if value == node.value:
        return true
    else if value < node.value:
        return search(node.left, value)
    else:
        return search(node.right, value)`
    }
  },
  {
    id: 'sorting',
    name: 'Sorting Algorithms',
    description: 'Watch sorting in action',
    icon: '📊',
    color: 'from-green-600 to-green-500',
    concept: `Sorting algorithms arrange elements in a specific order.

Bubble Sort:
• Repeatedly swaps adjacent elements if they're in wrong order
• Time: O(n²), Space: O(1)
• Stable, Simple but inefficient for large datasets

Quick Sort:
• Divide and conquer using pivot element
• Time: O(n log n) average, O(n²) worst
• Space: O(log n), Not stable but very efficient

Color Legend:
• Blue: Unsorted elements
• Orange: Currently comparing
• Green: Sorted elements`,
    pseudoCode: {
      bubble: `function bubbleSort(array):
    n = array.length
    for i from 0 to n-1:
        for j from 0 to n-i-2:
            if array[j] > array[j+1]:
                swap(array[j], array[j+1])`,
      quick: `function quickSort(array, low, high):
    if low < high:
        pivot = partition(array, low, high)
        quickSort(array, low, pivot-1)
        quickSort(array, pivot+1, high)

function partition(array, low, high):
    pivot = array[high]
    i = low - 1
    for j from low to high-1:
        if array[j] < pivot:
            i++
            swap(array[i], array[j])
    swap(array[i+1], array[high])
    return i + 1`
    }
  },
  {
    id: 'stack',
    name: 'Stack',
    description: 'LIFO data structure',
    icon: '📚',
    color: 'from-purple-600 to-purple-500',
    concept: `Stack follows LIFO (Last In First Out) principle.

Key Operations:
• Push: Add element to top - O(1)
• Pop: Remove element from top - O(1)
• Peek: View top element - O(1)
• isEmpty: Check if empty - O(1)

Applications:
• Function call stack
• Undo/Redo operations
• Expression evaluation
• Backtracking algorithms
• Browser history`,
    pseudoCode: {
      push: `function push(stack, item):
    stack.add(item)
    top = top + 1
    size = size + 1`,
      pop: `function pop(stack):
    if isEmpty(stack):
        return error "Stack Underflow"
    item = stack[top]
    top = top - 1
    size = size - 1
    return item`,
      peek: `function peek(stack):
    if isEmpty(stack):
        return error "Stack is empty"
    return stack[top]`
    }
  },
  {
    id: 'queue',
    name: 'Queue',
    description: 'FIFO data structure',
    icon: '🚶',
    color: 'from-pink-600 to-pink-500',
    concept: `Queue follows FIFO (First In First Out) principle.

Key Operations:
• Enqueue: Add element to rear - O(1)
• Dequeue: Remove element from front - O(1)
• Front: View front element - O(1)
• isEmpty: Check if empty - O(1)

Applications:
• CPU scheduling
• Breadth-First Search
• Printer queue
• Request handling in servers
• Message queues`,
    pseudoCode: {
      enqueue: `function enqueue(queue, item):
    queue.add(item)
    rear = rear + 1
    size = size + 1`,
      dequeue: `function dequeue(queue):
    if isEmpty(queue):
        return error "Queue Underflow"
    item = queue[front]
    front = front + 1
    size = size - 1
    return item`
    }
  },
  {
    id: 'linkedlist',
    name: 'Linked List',
    description: 'Dynamic linear structure',
    icon: '🔗',
    color: 'from-teal-600 to-teal-500',
    concept: `Linked List is a linear data structure with nodes.

Each node contains:
• Data field
• Pointer to next node

Types:
• Singly Linked: One direction pointer
• Doubly Linked: Two direction pointers
• Circular: Last node points to first

Time Complexity:
• Access: O(n)
• Insert at head: O(1)
• Insert at tail: O(n) or O(1) with tail pointer
• Delete: O(n)

Advantages:
• Dynamic size
• Easy insertion/deletion`,
    pseudoCode: {
      addHead: `function addHead(list, value):
    newNode = new Node(value)
    newNode.next = list.head
    list.head = newNode
    size = size + 1`,
      addTail: `function addTail(list, value):
    newNode = new Node(value)
    if list.head is null:
        list.head = newNode
    else:
        current = list.head
        while current.next is not null:
            current = current.next
        current.next = newNode
    size = size + 1`,
      remove: `function removeHead(list):
    if list.head is null:
        return error "List is empty"
    list.head = list.head.next
    size = size - 1`
    }
  },
  {
    id: 'graph',
    name: 'Graph Algorithms',
    description: 'BFS, DFS traversals',
    icon: '🕸️',
    color: 'from-orange-600 to-orange-500',
    concept: `Graph is a non-linear data structure with vertices and edges.

BFS (Breadth-First Search):
• Explores level by level
• Uses Queue
• Time: O(V + E), Space: O(V)
• Finds shortest path in unweighted graph

DFS (Depth-First Search):
• Explores depth first
• Uses Stack/Recursion
• Time: O(V + E), Space: O(V)
• Used in cycle detection, topological sort

Color Legend:
• Blue: Unvisited
• Orange: Currently exploring
• Green: Visited`,
    pseudoCode: {
      bfs: `function BFS(graph, start):
    queue = new Queue()
    visited = new Set()
    
    queue.enqueue(start)
    visited.add(start)
    
    while queue is not empty:
        node = queue.dequeue()
        process(node)
        
        for each neighbor of node:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)`,
      dfs: `function DFS(graph, node, visited):
    visited.add(node)
    process(node)
    
    for each neighbor of node:
        if neighbor not in visited:
            DFS(graph, neighbor, visited)`
    }
  },
  {
    id: 'heap',
    name: 'Heap',
    description: 'Min/Max heap operations',
    icon: '⛰️',
    color: 'from-violet-600 to-violet-500',
    concept: `Heap is a complete binary tree with heap property.

Min Heap: Parent ≤ Children
Max Heap: Parent ≥ Children

Operations:
• Insert: O(log n) - Add at end, heapify up
• Extract: O(log n) - Remove root, heapify down
• Peek: O(1) - View root

Applications:
• Priority Queue
• Heap Sort
• Dijkstra's Algorithm
• K-th largest/smallest element

Array Representation:
• Parent: (i-1)/2
• Left Child: 2*i + 1
• Right Child: 2*i + 2`,
    pseudoCode: {
      insert: `function insert(heap, value):
    heap.add(value)
    heapifyUp(heap, heap.size - 1)

function heapifyUp(heap, index):
    parent = (index - 1) / 2
    if parent >= 0 and heap[index] < heap[parent]:
        swap(heap[index], heap[parent])
        heapifyUp(heap, parent)`,
      extract: `function extractMin(heap):
    if heap is empty:
        return error
    
    min = heap[0]
    heap[0] = heap[heap.size - 1]
    heap.removeLast()
    heapifyDown(heap, 0)
    return min

function heapifyDown(heap, index):
    smallest = index
    left = 2 * index + 1
    right = 2 * index + 2
    
    if left < size and heap[left] < heap[smallest]:
        smallest = left
    if right < size and heap[right] < heap[smallest]:
        smallest = right
    
    if smallest != index:
        swap(heap[index], heap[smallest])
        heapifyDown(heap, smallest)`
    }
  },
  {
    id: 'hashtable',
    name: 'Hash Table',
    description: 'Collision handling with chaining',
    icon: '🗂️',
    color: 'from-amber-600 to-amber-500',
    concept: `Hash Table uses hash function to map keys to indices.

Hash Function:
• Converts key to array index
• Should distribute keys uniformly
• Our function: Sum of ASCII values % table size

Collision Handling:
• Chaining: Store multiple items at same index using linked list
• Open Addressing: Find next available slot

Time Complexity:
• Average: O(1) for insert, search, delete
• Worst: O(n) with many collisions

Load Factor: n/m (n=items, m=buckets)
• Good load factor: 0.7-0.8`,
    pseudoCode: {
      insert: `function insert(hashTable, key, value):
    index = hashFunction(key)
    
    // Check if key exists
    for item in hashTable[index]:
        if item.key == key:
            item.value = value
            return
    
    // Add new item
    hashTable[index].add({key, value})`,
      search: `function search(hashTable, key):
    index = hashFunction(key)
    
    for item in hashTable[index]:
        if item.key == key:
            return item.value
    
    return null`,
      hashFunction: `function hashFunction(key):
    hash = 0
    for each character in key:
        hash = hash + ASCII(character)
    return hash % tableSize`
    }
  },
  {
    id: 'avl',
    name: 'AVL Tree',
    description: 'Self-balancing BST',
    icon: '⚖️',
    color: 'from-emerald-600 to-emerald-500',
    concept: `AVL Tree is a self-balancing Binary Search Tree.

Balance Factor = Height(Left) - Height(Right)

For every node: |Balance Factor| ≤ 1

Rotations (to maintain balance):
• Left Rotation (LL): Right-heavy tree
• Right Rotation (RR): Left-heavy tree
• Left-Right Rotation (LR): Left-right case
• Right-Left Rotation (RL): Right-left case

Time Complexity:
• Search, Insert, Delete: O(log n) guaranteed

Color Legend:
• Green: Balanced (|BF| ≤ 1)
• Red: Unbalanced (|BF| > 1)

Better than BST for search-heavy operations.`,
    pseudoCode: {
      insert: `function insert(node, value):
    // Standard BST insert
    if node is null:
        return new Node(value)
    
    if value < node.value:
        node.left = insert(node.left, value)
    else:
        node.right = insert(node.right, value)
    
    // Update height
    node.height = 1 + max(height(node.left), 
                          height(node.right))
    
    // Get balance factor
    balance = getBalance(node)
    
    // Left Heavy (LL)
    if balance > 1 and value < node.left.value:
        return rotateRight(node)
    
    // Right Heavy (RR)
    if balance < -1 and value > node.right.value:
        return rotateLeft(node)
    
    // Left-Right (LR)
    if balance > 1 and value > node.left.value:
        node.left = rotateLeft(node.left)
        return rotateRight(node)
    
    // Right-Left (RL)
    if balance < -1 and value < node.right.value:
        node.right = rotateRight(node.right)
        return rotateLeft(node)
    
    return node`,
      rotate: `function rotateRight(y):
    x = y.left
    T2 = x.right
    
    // Perform rotation
    x.right = y
    y.left = T2
    
    // Update heights
    updateHeight(y)
    updateHeight(x)
    
    return x

function rotateLeft(x):
    y = x.right
    T2 = y.left
    
    // Perform rotation
    y.left = x
    x.right = T2
    
    // Update heights
    updateHeight(x)
    updateHeight(y)
    
    return y`
    }
  },
  {
    id: 'dp',
    name: 'Dynamic Programming',
    description: 'Visualize DP solutions',
    icon: '🧮',
    color: 'from-indigo-600 to-indigo-500',
    concept: `Dynamic Programming solves problems by breaking them into subproblems.

Key Concepts:
• Overlapping Subproblems: Same subproblems solved multiple times
• Optimal Substructure: Optimal solution contains optimal solutions to subproblems

Approaches:
1. Top-Down (Memoization): Recursion + Cache
2. Bottom-Up (Tabulation): Iterative + Table

Steps to Solve:
1. Define the subproblem
2. Find recurrence relation
3. Identify base cases
4. Compute in correct order (or cache)

Time vs Space tradeoff: Store results to avoid recomputation

Color Legend:
• Gray: Not computed yet
• Blue: Computed value
• Red: Impossible/Invalid`,
    pseudoCode: {
      fibonacci: `function fibonacci(n):
    // Create DP table
    dp = array of size n+1
    
    // Base cases
    dp[0] = 0
    dp[1] = 1
    
    // Fill table bottom-up
    for i from 2 to n:
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

// Recurrence: F(n) = F(n-1) + F(n-2)
// Time: O(n), Space: O(n)`,
      coinChange: `function coinChange(coins, amount):
    // Create DP table
    dp = array of size amount+1
    fill dp with infinity
    dp[0] = 0
    
    // Fill table
    for i from 1 to amount:
        for coin in coins:
            if i >= coin:
                dp[i] = min(dp[i], 
                           dp[i-coin] + 1)
    
    return dp[amount] if dp[amount] != infinity
           else -1

// Recurrence: dp[i] = min(dp[i-coin] + 1)
// Time: O(amount * coins), Space: O(amount)`
    }
  }
];