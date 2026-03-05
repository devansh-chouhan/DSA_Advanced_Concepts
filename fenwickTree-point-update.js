class FenwickTree {
    constructor(nums) {
        this.n = nums.length;
        this.fen = new Array(this.n + 1).fill(0);

        // build tree
        for (let i = 0; i < this.n; i++) {
            this.update(i + 1, nums[i]);
        }
    }

    update(i, val) {
        while (i <= this.n) {
            this.fen[i] += val;
            i += (i & -i);
        }
    }

    query(i) {
        let sum = 0;
        while (i > 0) {
            sum += this.fen[i];
            i -= (i & -i);
        }
        return sum;
    }

    rangeQuery(l, r) {
        return this.query(r) - this.query(l - 1);
    }
}

let nums = [3, 2, 4, 6, 1, 3, 5, 4];

let ft = new FenwickTree(nums);

console.log(ft.fen);
console.log(ft.rangeQuery(2, 5));


// Fenwick Tree (Binary Indexed Tree)
// Supports:
// 1. Point Update - O(log n)
// 2. Range Sum Query - O(log n)