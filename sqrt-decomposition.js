const nums = [3, 5, 6, 8, 5, 4, 8, 3, 2, 1];

/*
Query format:
[0, l, r] → range sum query
[1, idx, val] → point update (nums[idx] = val)
*/
const queries = [
  [0, 1, 5],
  [0, 0, 3],
  [1, 1, 5],
  [0, 1, 5],
  [1, 4, 10],
  [0, 0, 7],
];

/*
Divide array into blocks of size ≈ √n
Store sum of each block

n = 10 → √n ≈ 4
*/

let blockSize = Math.ceil(Math.sqrt(nums.length));
let blocks = new Array(Math.ceil(nums.length / blockSize)).fill(0);

/*
Precompute block sums
Block 0: [3,5,6,8] → 22
Block 1: [5,4,8,3] → 20
Block 2: [2,1]     → 3
*/
for (let i = 0; i < nums.length; i++) {
  blocks[Math.floor(i / blockSize)] += nums[i];
}

const sum = (l, r) => {
  let res = 0;
  let leftBlock = Math.floor(l / blockSize);
  let rightBlock = Math.floor(r / blockSize);

  if (leftBlock === rightBlock) {
    for (let i = l; i <= r; i++) {
      res += nums[i];
    }
    return res;
  } else {
    // from l to endIndex of leftBlock(1. Left partial block)
    let endOfLeftBlock = (leftBlock + 1) * blockSize - 1;
    for (let i = l; i <= endOfLeftBlock; i++) {
      res += nums[i];
    }

    // 2. Full blocks in between (fast access)
    for (let i = leftBlock + 1; i <= rightBlock - 1; i++) {
      res += blocks[i];
    }

    //from startIndex of rightBlock to r(3. Right partial block)
    let startOfRightBlock = rightBlock * blockSize;
    for (let i = startOfRightBlock; i <= r; i++) {
      res += nums[i];
    }

    return res;
  }
};

const update = (idx, val) => {
  let blockIndex = Math.floor(idx / blockSize);
  // remove old value
  blocks[blockIndex] -= nums[idx];
  // add new value
  blocks[blockIndex] += val;
  // update original array
  nums[idx] = val;
};

for (let i = 0; i < queries.length; i++) {
  let q = queries[i][0];
  if (q === 0) {
    let l = queries[i][1];
    let r = queries[i][2];
    console.log(sum(l, r));
  } else {
    let idx = queries[i][1];
    let val = queries[i][2];
    update(idx, val);
  }
}

/*
-----------------------------------
Square Root Decomposition
-----------------------------------

Definition:
A technique to optimize range queries by dividing the array into blocks of size ≈ √n
and storing precomputed information (like sum) for each block.

Key Idea:
Instead of iterating entire range → use block sums for faster computation.

Steps:
1. Divide array into √n sized blocks
2. Precompute sum of each block
3. For query (l, r):
   - Traverse left partial block
   - Add full block sums
   - Traverse right partial block
4. For update:
   - Update element
   - Adjust corresponding block sum

Query Types:
[0, l, r] → Range Sum Query
[1, idx, val] → Point Update

Time Complexity:
- Preprocessing: O(n)
- Range Query: O(√n)
- Update: O(1)

Space Complexity:
- Extra Space: O(√n) (for block array)

When to Use:
- When both queries and updates exist
- When n is large and O(n) per query is too slow

Note: Mo's Algorithm and Sqrt Decomposition are different. 
Mo's algorithm is used for offline range queries.
While Sqrt Decomposition is used for online range queries.
*/
