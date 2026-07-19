let nums = [1, 2, 3];

let res = [];
const n = nums.length;

// Iterate through every possible mask
for (let mask = 0; mask < (1 << n); mask++) {
    let subset = [];

    // Check every bit
    for (let i = 0; i < n; i++) {

        // If i-th bit is ON,
        // include nums[i] in the subset.
        if ((mask & (1 << i))) {
            subset.push(nums[i]);
        }
    }
    res.push(subset);
}

console.log(res);

/*
Output:

[
  [],                     //000
  [1],                    //001
  [2],                    //010
  [1,2],                  //011
  [3],                    //100
  [1,3],                  //101
  [2,3],                  //110
  [1,2,3]                 //111
]
*/
/*
==================== SUBSET GENERATION (BITMASK) ====================

Idea:
Every element has two choices:
1. Include
2. Exclude

For an array of size n,

Total subsets = 2^n

Represent each subset using a binary number (mask).

------------------------------------------------------------------

Example:

nums = [1, 2, 3]

Mask = 5

5 = 101₂

Bit Position:

Bit 2  Bit 1  Bit 0
  1      0      1

Subset:

[1, 3]

------------------------------------------------------------------

Bit Check:

(mask & (1 << i))

1 << i  -> Turns ON only the i-th bit.

If result != 0
→ include nums[i]

Else
→ skip it.

------------------------------------------------------------------

Loop:

Outer Loop:
Iterates through all masks.

0 → (2^n - 1)

Inner Loop:
Checks every bit of the current mask.

------------------------------------------------------------------

Complexity:

Time : O(n × 2^n)

Space : O(n × 2^n)   // storing all subsets

==================================================================
*/