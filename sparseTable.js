let nums = [4 , 1 , 3 , 2 , 5 , 1 , 8 , 6];
let n = nums.length;
let log = Math.floor(Math.log2(n)) + 1;

let st = Array.from({length : n} , () => Array(log).fill(0));

for(let i = 0 ; i < n ; i++){
    st[i][0] = nums[i];
}

for(let j = 1 ; j < log ; j++){
    for(let i = 0 ; i <= n - (1 << j) ; i++){
        st[i][j] = Math.min(st[i][j - 1] , st[i + (1 << (j - 1))][j - 1]);
    }
}

function query(l , r){
    let k = Math.floor(Math.log2(r - l + 1));
    return Math.min(st[l][k] , st[r - (1 << k) + 1][k]);
}

console.log(query(0 , 0));
console.log(query(6 , 7));
console.log(query(2 , 4));

/*Sparse Table is a data structure used for answering range queries efficiently on static arrays (arrays that do not change after preprocessing).

It is most commonly used for:
Range Minimum Query (RMQ)
Range Maximum Query
GCD of a range
AND / OR of a range

| Operation     | Complexity     |
| ------------- | -------------- |
| Preprocessing | **O(n log n)** |
| Query         | **O(1)**       |
| Space         | **O(n log n)** |


Sparse tables work best when the operation is idempotent, meaning:
| Operation  | Idempotent? |
| ---------- | ----------- |
| `min(x,x)` | ✅ Yes       |
| `max(x,x)` | ✅ Yes       |
| `gcd(x,x)` | ✅ Yes       |
| `sum(x,x)` | ❌ No        |*/




