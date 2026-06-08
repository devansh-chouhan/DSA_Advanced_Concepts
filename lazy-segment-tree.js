let nums = [2, 3, 2, 5, 1, 6];
let n = nums.length;

let st = new Array(4 * n).fill(0);
let lazy = new Array(4 * n).fill(0);

function build(i, l, r) {
  if (l === r) {
    st[i] = nums[l];
    return;
  }

  let mid = (l + r) >> 1;
  build(2 * i + 1, l, mid);
  build(2 * i + 2, mid + 1, r);
  st[i] = st[2 * i + 1] + st[2 * i + 2];
}
build(0, 0, n - 1);

function update(i, l, r, start, end, val) {
  // Apply pending lazy update
  if (lazy[i] !== 0) {
    st[i] += (end - start + 1) * lazy[i];
    if (start !== end) {
      lazy[2 * i + 1] += lazy[i];
      lazy[2 * i + 2] += lazy[i];
    }
    lazy[i] = 0;
  }

  // No Overlap
  if (r < start || l > end) return;

  // Complete Overlap
  if (start >= l && end <= r) {
    st[i] += (end - start + 1) * val;
    if (start !== end) {
      lazy[2 * i + 1] += val;
      lazy[2 * i + 2] += val;
    }
    return;
  }

  // Partial overlap
  let mid = (start + end) >> 1;
  update(2 * i + 1, l, r, start, mid, val);
  update(2 * i + 2, l, r, mid + 1, end, val);
  st[i] = st[2 * i + 1] + st[2 * i + 2];
}

function query(i, l, r, start, end) {
  // Apply pending lazy update
  if (lazy[i] !== 0) {
    st[i] += (end - start + 1) * lazy[i];
    if (start !== end) {
      lazy[2 * i + 1] += lazy[i];
      lazy[2 * i + 2] += lazy[i];
    }
    lazy[i] = 0;
  }

  // No Overlap
  if (r < start || end < l) return 0;

  // Complete Overlap
  if (start >= l && end <= r) return st[i];

  // Partial overlap
  let mid = (start + end) >> 1;
  let left = query(2 * i + 1, l, r, start, mid);
  let right = query(2 * i + 2, l, r, mid + 1, end);
  return left + right;
}

update(0, 2, 5, 0, n - 1, 5);
console.log(query(0, 2, 5, 0, n - 1)); // 34

/*
Lazy Propagation (Segment Tree)

Lazy Propagation is an optimization that allows
range updates in O(log n) time instead of O(n).

Used For:
- Range Updates
- Range Sum Queries
- Multiple Updates + Queries

Time:
Build         O(n)
Range Update  O(log n)
Range Query   O(log n)

Space:
O(4n)
*/
