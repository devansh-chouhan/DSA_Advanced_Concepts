class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class MinBinaryHeap {
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

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[idx].priority >= this.heap[parentIdx].priority) break;
      [this.heap[idx], this.heap[parentIdx]] = [
        this.heap[parentIdx],
        this.heap[idx],
      ];
      idx = parentIdx;
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  bubbleDown() {
    let idx = 0;
    const length = this.heap.length;
    while (true) {
      let leftChild, rightChild;
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let smallestIdx = idx;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild.priority < this.heap[smallestIdx].priority) {
          smallestIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (rightChild.priority < this.heap[smallestIdx].priority) {
          smallestIdx = rightChildIdx;
        }
      }

      if (smallestIdx === idx) break;
      [this.heap[idx], this.heap[smallestIdx]] = [
        this.heap[smallestIdx],
        this.heap[idx],
      ];
      idx = smallestIdx;
    }
  }
}

let pq = new MinBinaryHeap();
pq.push(new Node("B", 1));
pq.push(new Node("C", 4));
pq.push(new Node("A", 6));
pq.push(new Node("D", 2));

console.log(pq.heap);
