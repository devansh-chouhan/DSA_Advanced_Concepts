class MinBinaryHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  top() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];

    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.heap[parentIdx];
      if (element >= parent) break;
      this.heap[parentIdx] = element;
      this.heap[idx] = parent;
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
        if (leftChild < this.heap[smallestIdx]) {
          smallestIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (rightChild < this.heap[smallestIdx]) {
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

let heap = new MinBinaryHeap();
heap.push(5);
heap.push(3);
heap.push(8);
heap.push(4);
heap.push(7);
console.log(heap.heap);
console.log(heap.size());
console.log(heap.top());

console.log(heap.pop());
console.log(heap.heap);

console.log(heap.pop());
console.log(heap.heap);

console.log(heap.pop());
console.log(heap.heap);
