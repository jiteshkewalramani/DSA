// ============= src/config/routes.js =============
// Centralized routing configuration for easy management and SEO

export const ROUTES = {
  HOME: '/',
  BST: '/binary-search-tree',
  SORTING: '/sorting-algorithms',
  STACK: '/stack',
  QUEUE: '/queue',
  LINKED_LIST: '/linked-list',
  GRAPH: '/graph-algorithms',
  HEAP: '/heap',
  HASH_TABLE: '/hash-table',
  AVL: '/avl-tree',
  DP: '/dynamic-programming',
};

// Map topic IDs to routes
export const TOPIC_ROUTES = {
  bst: ROUTES.BST,
  sorting: ROUTES.SORTING,
  stack: ROUTES.STACK,
  queue: ROUTES.QUEUE,
  linkedlist: ROUTES.LINKED_LIST,
  graph: ROUTES.GRAPH,
  heap: ROUTES.HEAP,
  hashtable: ROUTES.HASH_TABLE,
  avl: ROUTES.AVL,
  dp: ROUTES.DP,
};

// Reverse mapping: routes to topic IDs
export const ROUTE_TO_TOPIC = Object.entries(TOPIC_ROUTES).reduce(
  (acc, [topicId, route]) => {
    acc[route] = topicId;
    return acc;
  },
  {}
);

// SEO metadata for each route
export const SEO_DATA = {
  [ROUTES.HOME]: {
    title: 'DSA Visualizer - Interactive Data Structures & Algorithms Learning',
    description: 'Learn data structures and algorithms through interactive visualizations. Master BST, sorting, stacks, queues, graphs, and more with step-by-step animations.',
    keywords: 'data structures, algorithms, visualizer, DSA, programming, learning, interactive, binary search tree, sorting, graph algorithms',
    ogImage: '/og-home.png',
  },
  [ROUTES.BST]: {
    title: 'Binary Search Tree Visualizer - Interactive BST Learning',
    description: 'Visualize Binary Search Tree operations including insert, search, and delete. Learn BST concepts with interactive step-by-step animations and code execution.',
    keywords: 'binary search tree, BST, tree data structure, BST visualizer, insert, search, delete, tree traversal',
    ogImage: '/og-bst.png',
  },
  [ROUTES.SORTING]: {
    title: 'Sorting Algorithms Visualizer - Bubble Sort, Quick Sort',
    description: 'Watch sorting algorithms in action with animated visualizations. Learn bubble sort, quick sort with detailed comparisons, swaps, and time complexity analysis.',
    keywords: 'sorting algorithms, bubble sort, quick sort, merge sort, algorithm visualization, sorting visualizer, comparison sort',
    ogImage: '/og-sorting.png',
  },
  [ROUTES.STACK]: {
    title: 'Stack Visualizer - LIFO Data Structure Animation',
    description: 'Interactive stack data structure visualization. Learn push, pop, peek operations with step-by-step code execution and LIFO principle demonstration.',
    keywords: 'stack, LIFO, data structure, push, pop, peek, stack operations, stack visualizer',
    ogImage: '/og-stack.png',
  },
  [ROUTES.QUEUE]: {
    title: 'Queue Visualizer - FIFO Data Structure Animation',
    description: 'Visualize queue data structure operations. Learn enqueue, dequeue with interactive animations demonstrating FIFO (First In First Out) principle.',
    keywords: 'queue, FIFO, data structure, enqueue, dequeue, queue operations, queue visualizer',
    ogImage: '/og-queue.png',
  },
  [ROUTES.LINKED_LIST]: {
    title: 'Linked List Visualizer - Dynamic List Operations',
    description: 'Interactive linked list visualization showing node connections, insertions, and deletions. Master singly and doubly linked list concepts.',
    keywords: 'linked list, singly linked list, doubly linked list, node, pointer, linked list operations',
    ogImage: '/og-linkedlist.png',
  },
  [ROUTES.GRAPH]: {
    title: 'Graph Algorithms Visualizer - BFS & DFS Traversal',
    description: 'Visualize graph traversal algorithms including Breadth-First Search (BFS) and Depth-First Search (DFS) with interactive step-by-step execution.',
    keywords: 'graph algorithms, BFS, DFS, breadth first search, depth first search, graph traversal, graph visualizer',
    ogImage: '/og-graph.png',
  },
  [ROUTES.HEAP]: {
    title: 'Heap Visualizer - Min Heap & Max Heap Operations',
    description: 'Learn heap data structure with interactive visualizations. Understand heapify, insert, extract operations for min heap and max heap.',
    keywords: 'heap, min heap, max heap, priority queue, heapify, heap operations, binary heap',
    ogImage: '/og-heap.png',
  },
  [ROUTES.HASH_TABLE]: {
    title: 'Hash Table Visualizer - Hashing & Collision Resolution',
    description: 'Visualize hash table operations, hash functions, and collision handling. Learn chaining and open addressing with interactive examples.',
    keywords: 'hash table, hash map, hashing, collision resolution, chaining, hash function, dictionary',
    ogImage: '/og-hashtable.png',
  },
  [ROUTES.AVL]: {
    title: 'AVL Tree Visualizer - Self-Balancing BST',
    description: 'Interactive AVL tree visualization showing rotations, balance factors, and self-balancing operations. Learn left, right, and double rotations.',
    keywords: 'AVL tree, self-balancing tree, tree rotation, balance factor, balanced BST, AVL operations',
    ogImage: '/og-avl.png',
  },
  [ROUTES.DP]: {
    title: 'Dynamic Programming Visualizer - DP Solutions',
    description: 'Visualize dynamic programming solutions with tabulation and memoization. Learn Fibonacci, coin change, and other classic DP problems.',
    keywords: 'dynamic programming, DP, memoization, tabulation, optimization, DP visualizer, Fibonacci, coin change',
    ogImage: '/og-dp.png',
  },
};
