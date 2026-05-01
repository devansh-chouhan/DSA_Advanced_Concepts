let nums = [2, 5, 6, 3, 1, 3, 5];

// if array has length of power of 2 then use 2 * n else 4 * n
let segTree = new Array(4 * nums.length).fill(0);

const buildTree = (i, l, r) => {
  if (l === r) {
    segTree[i] = nums[l];
    return;
  }

  const mid = (l + r) >> 1;
  buildTree(2 * i + 1, l, mid);
  buildTree(2 * i + 2, mid + 1, r);
  segTree[i] = segTree[2 * i + 1] + segTree[2 * i + 2];
};

function query(i, l, r, start, end) {
  if (r < start || l > end) return 0; // no overlap
  if (l <= start && end <= r) return segTree[i]; // complete overlap

  //partial overlap
  const mid = (start + end) >> 1;
  const left = query(2 * i + 1, l, r, start, mid);
  const right = query(2 * i + 2, l, r, mid + 1, end);
  return left + right;
}

function update(i, idx, val, start, end) {
  if (start === end) {
    segTree[i] = val;
    return;
  }

  const mid = (start + end) >> 1;
  if (idx <= mid) {
    update(2 * i + 1, idx, val, start, mid);
  } else {
    update(2 * i + 2, idx, val, mid + 1, end);
  }
  segTree[i] = segTree[2 * i + 1] + segTree[2 * i + 2];
}

buildTree(0, 0, nums.length - 1); // build segTree
console.log(query(0, 4, 5, 0, nums.length - 1)); // query sum in range [4, 5]
update(0, 3, 10, 0, nums.length - 1); // update index 3 with value 10
console.log(query(0, 1, 3, 0, nums.length - 1)); // query sum in range [1, 3]

/*
-----------------------------------
Segment Tree (Range Sum + Point Update)
-----------------------------------

Definition:
A tree-based data structure used to efficiently perform range queries 
(like sum, min, max) and updates on an array.

Key Idea:
- Divide the array into segments recursively
- Each node stores information (here: sum) of a segment
- Root → entire array
- Leaves → individual elements

Tree Representation:
- Stored using array (like heap)
- For node at index i:
    left child  → 2*i + 1
    right child → 2*i + 2

Size of Segment Tree:
- If n is power of 2 → size = 2*n
- Else → safe size = 4*n

-----------------------------------
Operations
-----------------------------------

1. Build Tree:
- Recursively divide array into halves
- Leaf node → store element
- Internal node → sum of left + right child

Time Complexity: O(n)

-----------------------------------

2. Range Query (l, r):
Cases:
1. No Overlap:
   current segment completely outside query → return 0

2. Complete Overlap:
   current segment fully inside query → return node value

3. Partial Overlap:
   split into left + right and combine

Time Complexity: O(log n)

-----------------------------------

3. Point Update (idx, val):
- Go to leaf node and update value
- While returning, update all parent nodes

Time Complexity: O(log n)

-----------------------------------

Function Meaning:
buildTree(i, l, r)
→ builds tree for range [l, r] at index i

query(i, l, r, start, end)
→ returns sum in range [l, r]
(start, end = current segment range)

update(i, idx, val, start, end)
→ updates nums[idx] = val

-----------------------------------

Example:
nums = [2, 5, 6, 3, 1, 3, 5]

Query:
query(0, 4, 5, 0, n-1)
→ sum of elements from index 4 to 5

Update:
update(0, 3, 10, 0, n-1)
→ nums[3] = 10

-----------------------------------

Time Complexity Summary:
- Build: O(n)
- Query: O(log n)
- Update: O(log n)

Space Complexity:
- O(4n)

-----------------------------------

When to Use:
- Frequent range queries + updates
- Need faster than O(n) per query

-----------------------------------

Important Notes:
- Works for sum, min, max, gcd, etc.
- For range updates → use Lazy Propagation
- Segment Tree is faster than √n approach for large inputs

-----------------------------------
*/
