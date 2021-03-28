"use strict";

(function (global, document, $) {
  const head = document.getElementsByTagName('HEAD')[0]
  const body = $('body')

  function getId(e, id){
    return Number(e.target.id.slice(id.length, e.target.id.length))
  }

  const BSTlink = document.createElement('link')
  BSTlink.rel = 'stylesheet'
  BSTlink.type = 'text/css'
  BSTlink.href = './data_structures/csl.bst/styles.css'
  head.appendChild(BSTlink)

  function createBSTIntro() {
    const BSTintroForm = document.createElement('form')
    const BSTTitle = document.createElement('input')
    BSTTitle.type = "submit"
    BSTTitle.id = "BSTTitle"
    BSTTitle.value = "BST"

    const BST_INTRO = "Binary Search Trees or BST for short are a particular application of binary trees. BST has at most two nodes (like all binary trees). However, the values are in such a way that the left children value must be less than the parent, and the right children is must be higher."

    BSTintroForm.addEventListener('submit', handleIntro)

    function handleIntro(e) {
      e.preventDefault();
      alert(BST_INTRO)
    }
    BSTintroForm.appendChild(BSTTitle)
    body.append(BSTintroForm)
  }

  let BSTstate = {
    CircleStyle: 'border-radius: 50%; height: 25px; width: 25px; background: #fff; border: 1px solid #000;color: #000;text-align: center;font: 20px Arial, sans-serif; display: inline-block',
  }

  let numBst = 0
  let bsts = []

  const LEFT = 0;
  const RIGHT = 1;

  class TreeNode {
    constructor(value) {
      this.value = value;
      this.descendents = [];
      this.parent = null;
    }

    get left() {
      return this.descendents[LEFT];
    }

    set left(node) {
      this.descendents[LEFT] = node;
      if (node) {
        node.parent = this;
      }
    }

    get right() {
      return this.descendents[RIGHT];
    }

    set right(node) {
      this.descendents[RIGHT] = node;
      if (node) {
        node.parent = this;
      }
    }
  }

  class CSL_BST {
    constructor(showIntro = false) {
      this.root = null;
      this.size = 0;
      if (showIntro) {
        createBSTIntro()
      }
      numBst++;
    }

    add(value) {
      const newNode = new TreeNode(value);

      if (this.root) {
        const {
          found,
          parent
        } = this.findNodeAndParent(value);
        if (found) { // duplicated: value already exist on the tree
          found.meta.multiplicity = (found.meta.multiplicity || 1) + 1;
        } else if (value < parent.value) {
          parent.left = newNode;
        } else {
          parent.right = newNode;
        }
      } else {
        this.root = newNode;
      }

      this.size += 1;
      return newNode;
    }

    find(value) {
      const {
        found,
        _
      } = this.findNodeAndParent(value);
      return found
    }

    remove(value) {
      const nodeToRemove = this.find(value);
      if (!nodeToRemove) return false;

      // Combine left and right children into one subtree without nodeToRemove
      const nodeToRemoveChildren = this.combineLeftIntoRightSubtree(nodeToRemove);

      if (nodeToRemove.meta.multiplicity && nodeToRemove.meta.multiplicity > 1) {
        nodeToRemove.meta.multiplicity -= 1; // handle duplicated
      } else if (nodeToRemove === this.root) {
        // Replace (root) node to delete with the combined subtree.
        this.root = nodeToRemoveChildren;
        this.root.parent = null; // clearing up old parent
      } else {
        const side = nodeToRemove.isParentLeftChild ? 'left' : 'right';
        const {
          parent
        } = nodeToRemove; // get parent
        // Replace node to delete with the combined subtree.
        parent[side] = nodeToRemoveChildren;
      }

      this.size -= 1;
      return true;
    }
    getMax() {
      /* ... */ }
    getMin() {
      /* ... */ }

    findNodeAndParent(value) {
      let node = this.root;
      let parent;

      while (node) {
        if (node.value === value) {
          break;
        }
        parent = node;
        node = (value >= node.value) ? node.right : node.left;
      }

      return {
        found: node,
        parent
      };
    }

    combineLeftIntoRightSubtree(node) {
      if (node.right) {
        const leftmost = this.getLeftmost(node.right);
        leftmost.left = node.left;
        return node.right;
      }
      return node.left;
    }
  }
  global.CSL_BST = global.CSL_BST || CSL_BST

})(window, window.document, $);