const nums = [1, 2, 4];
let n = nums.length;

let res = new Set();
let feasible = new Set();
for (let i = 0; i < n; i++) {
    let newfeasible = new Set();
    for (let val of feasible) {
        newfeasible.add(val | nums[i]);
    }
    newfeasible.add(nums[i]);
    for (let val of newfeasible) {
        res.add(val);
    }
    feasible = newfeasible;
}

console.log(res.size);


/**
 * ======================== DISTINCT BITWISE ORs, ANDs, GCDs OF SUBARRAYS ========================
 *
 * Problem:
 * Find the number of DISTINCT bitwise OR , AND , GCD results
 * possible from all contiguous subarrays.
 *
 *
 * Example:
 *
 * nums = [1, 2, 4]
 *
 * Subarrays:
 *
 * [1]       -> 1
 * [2]       -> 2
 * [4]       -> 4
 * [1,2]     -> 3
 * [2,4]     -> 6
 * [1,2,4]   -> 7
 *
 * Distinct results = {1,2,3,4,6,7}
 * Answer = 6
 *
 *
 * ======================== KEY IDEA ========================
 *
 * Instead of generating every subarray, we maintain
 * all DISTINCT OR values of subarrays ending at the
 * previous index.
 *
 * For every nums[i]:
 *
 *     1. Extend every previous subarray:
 *
 *        val | nums[i]
 *
 *     2. Start a new subarray:
 *
 *        nums[i]
 *
 *     3. Store these values in a Set to remove duplicates.
 *
 *
 * feasible:
 * Stores distinct OR values of subarrays ending
 * at the CURRENT position.
 *
 * res:
 * Stores distinct OR values from ALL subarrays.
 * 
 * ======================== PATTERN TO REMEMBER ========================
 *
 * "Maintain distinct states of subarrays ending HERE,
 * extend them with the current element,
 * add the current element itself,
 * and store everything globally."
 *
 * This pattern is useful for:
 *
 * - Bitwise OR / AND
 * - GCD of subarrays
 * - Other problems where the number of distinct states
 *   per index remains small.
 */


