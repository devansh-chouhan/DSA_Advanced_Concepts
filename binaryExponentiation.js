function pow(a, b) {
    // Base case: if base is 0, result is always 0 (except 0^0 case)
    if (a === 0) return 0;

    // Base case: anything power 0 = 1
    if (b === 0) return 1;

    // Recursively compute a^(b/2)
    // We divide the problem into smaller subproblems
    let half = pow(a, Math.floor(b / 2));

    // Square the result of half
    // This handles the case when b is even
    let res = half * half;

    // If exponent is odd (last bit is 1)
    // Multiply one extra 'a'
    if ((b & 1) === 1) res *= a;

    // Return final result
    return res;
}

// Example usage
console.log(pow(3, 5)); // 243


/*
==================== BINARY EXPONENTIATION ====================

Definition:
Binary Exponentiation (also called Fast Exponentiation)
is an efficient way to compute a^b in O(log b) time.

Key Idea:
- Divide the exponent by 2 at every step
- Square the result instead of multiplying repeatedly

Rules:
1. If b is even:
   a^b = (a^(b/2))^2

2. If b is odd:
   a^b = a * (a^((b-1)/2))^2

Bit Trick:
- (b & 1) checks if b is odd

Time Complexity:
- O(log b)

Space Complexity:
- O(log b) (due to recursion stack)

===============================================================
*/