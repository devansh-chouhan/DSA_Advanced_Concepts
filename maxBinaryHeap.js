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

      if (element <= parent) break;
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
        if (leftChild > this.heap[largestIdx]) {
          largestIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (rightChild > this.heap[largestIdx]) {
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

let heap = new MaxBinaryHeap();
heap.push(5);
heap.push(3);
heap.push(10);
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
