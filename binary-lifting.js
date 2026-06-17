class BinaryLifting {
  constructor(parent) {
    this.parent = parent;
    this.n = parent.length;
    this.LOG = Math.floor(Math.log2(this.n)) + 1;
    this.up = Array.from({ length: this.n }, () => Array(this.LOG).fill(-1));

    for (let i = 0; i < this.n; i++) {
      this.up[i][0] = this.parent[i];
    }

    for (let j = 1; j < this.LOG; j++) {
      for (let i = 0; i < this.n; i++) {
        let ancestor = this.up[i][j - 1];
        if (ancestor !== -1) {
          this.up[i][j] = this.up[ancestor][j - 1];
        }
      }
    }
  }

  getAncestor(node, k) {
    for (let j = 0; j < this.LOG; j++) {
      if (k & (1 << j)) {
        node = this.up[node][j];
        if (node === -1) return -1;
      }
    }
    return node;
  }
}

const bl = new BinaryLifting([-1, 0, 0, 1, 1, 2, 2]);

console.log(bl.getAncestor(2, 2)); //-1
console.log(bl.getAncestor(2, 1)); //0
console.log(bl.getAncestor(4, 2)); //0
console.log(bl.getAncestor(6, 1)); //2

// Example Tree:
//
//             0
//           /   \
//          1     2
//         / \   / \
//        3   4 5   6
//
// Parent Array:
// [-1, 0, 0, 1, 1, 2, 2]

/*
==================== BINARY LIFTING ====================

Definition:
Binary Lifting is a preprocessing technique used
to answer ancestor queries efficiently on trees.

Core Idea:
Instead of moving upward one node at a time,
precompute jumps of powers of two.

up[node][j] = 2^j-th ancestor of node

Examples:

j = 0 → 1 jump
j = 1 → 2 jumps
j = 2 → 4 jumps
j = 3 → 8 jumps

Transition Formula:

up[node][j]
=
up[ up[node][j - 1] ][j - 1]

Meaning:
To jump 2^j levels,
jump 2^(j-1) levels twice.

---------------------------------------------------------

Query Idea:

Represent k in binary.

Example:

k = 13

13 = 1101₂
   = 8 + 4 + 1

Therefore:

13th ancestor
=
8th ancestor
→ 4th ancestor
→ 1st ancestor

Bit Trick:

(k & (1 << j))

Checks if the j-th bit of k is set.

If true:
jump upward by 2^j levels.

---------------------------------------------------------

Complexities:

Preprocessing:
O(N log N)

Query:
O(log N)

Space:
O(N log N)

========================================================
*/
