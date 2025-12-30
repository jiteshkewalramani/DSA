// Binary Search Tree Node
export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
  }
}

// Binary Search Tree
export class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    this.root = this._insertRec(this.root, value);
  }

  _insertRec(node, value) {
    if (node === null) {
      return new TreeNode(value);
    }
    if (value < node.value) {
      node.left = this._insertRec(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertRec(node.right, value);
    }
    return node;
  }
}

// AVL Tree Node
export class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.x = 0;
    this.y = 0;
  }
}

// AVL Tree
export class AVLTree {
  constructor() {
    this.root = null;
  }

  height(node) {
    return node ? node.height : 0;
  }

  updateHeight(node) {
    if (node) {
      node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    }
  }

  getBalance(node) {
    return node ? this.height(node.left) - this.height(node.right) : 0;
  }

  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  insert(value) {
    this.root = this._insertRec(this.root, value);
  }

  _insertRec(node, value) {
    if (!node) return new AVLNode(value);

    if (value < node.value) {
      node.left = this._insertRec(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertRec(node.right, value);
    } else {
      return node;
    }

    this.updateHeight(node);
    const balance = this.getBalance(node);

    if (balance > 1 && value < node.left.value) {
      return this.rotateRight(node);
    }

    if (balance < -1 && value > node.right.value) {
      return this.rotateLeft(node);
    }

    if (balance > 1 && value > node.left.value) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    if (balance < -1 && value < node.right.value) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }
}

// Utility function to copy tree
export const copyTree = (node, NodeClass = TreeNode) => {
  if (!node) return null;
  const newNode = new NodeClass(node.value);
  if (node.height !== undefined) newNode.height = node.height;
  newNode.left = copyTree(node.left, NodeClass);
  newNode.right = copyTree(node.right, NodeClass);
  return newNode;
};

// Calculate positions for tree visualization
export const calculateTreePositions = (node, x, y, offset) => {
  if (!node) return;
  node.x = x;
  node.y = y;
  if (node.left) calculateTreePositions(node.left, x - offset, y + 70, offset / 2);
  if (node.right) calculateTreePositions(node.right, x + offset, y + 70, offset / 2);
};