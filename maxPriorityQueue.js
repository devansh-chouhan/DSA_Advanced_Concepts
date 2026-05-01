class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class MaxBinaryHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  top() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  push(val, priority) {
    let newNode = new Node(val, priority);
    this.heap.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);

      if (this.heap[idx].priority <= this.heap[parentIdx].priority) break;
      [this.heap[idx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[idx],
      ];
      idx = parentIdx;
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return max;
  }

  bubbleDown() {
    let idx = 0;
    let length = this.heap.length;
    while (true) {
      let leftChild, rightChild;
      let largestIdx = idx;
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild.priority > this.heap[largestIdx].priority) {
          largestIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (rightChild.priority > this.heap[largestIdx].priority) {
          largestIdx = rightChildIdx;
        }
      }
      if (largestIdx === idx) break;
      [this.heap[idx], this.heap[largestIdx]] = [
        this.heap[largestIdx],
        this.heap[idx],
      ];
      idx = largestIdx;
    }
  }
}

let pq = new MaxBinaryHeap();
pq.push("B", 1);
pq.push("C", 4);
pq.push("A", 6);
pq.push("D", 2);

console.log(pq.heap);
