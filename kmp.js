function KMP(txt, pattern) {
    let n = txt.length;
    let m = pattern.length;

    if (m === 0 || m > n) return [];

    // BUILD THE LPS ARRAY

    let LPS = new Array(m).fill(0);
    LPS[0] = 0;
    let i = 1;
    let len = 0;

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len += 1;
            LPS[i] = len;
            i += 1;
        } else {
            if (len > 0) {
                len = LPS[len - 1];
            } else {
                LPS[i] = 0;
                i += 1;
            }
        }
    }


    // SEARCH FOR THE PATTERN IN THE TEXT

    i = 0;
    let j = 0;
    let res = [];
    while (j < n) {
        if (pattern[i] === txt[j]) {
            i += 1;
            j += 1;
        }

        if (i === m) {
            res.push(j - i);
            i = LPS[i - 1];
        } else if (j < n && pattern[i] !== txt[j]) {
            if (i > 0) {
                i = LPS[i - 1];
            } else {
                j += 1;
            }
        }
    }
    return res;
}
console.log(KMP("ABABDABACDABABCABABCABBAABABCABAB", "ABABCABAB")) // [10 , 24]
console.log(KMP("banana", "a")); // [1 , 3 , 5]
console.log(KMP("abcdefgh", "xyz")); // []



/**
 * ============================================================
 *                     KMP ALGORITHM
 *             (Knuth-Morris-Pratt String Matching)
 * ============================================================
 *
 * CATEGORY:
 * String Algorithms / Pattern Matching
 *
 * GOAL:
 * Find all occurrences of a pattern inside a text efficiently.
 *
 * INPUT:
 * txt     -> The string in which we search.
 * pattern -> The string we want to find.
 *
 * OUTPUT:
 * Array containing the starting indices of all matches.
 *
 * ------------------------------------------------------------
 * CORE INTUITION:
 *
 * When a mismatch occurs, don't start matching from scratch.
 *
 * LPS[i] tells us the length of the longest proper prefix
 * of pattern[0...i] that is also a suffix of pattern[0...i].
 *
 * Instead of moving the text pointer backward, use the LPS
 * array to determine where the pattern should resume matching.
 *
 * ------------------------------------------------------------
 * WHAT IS LPS?
 *
 * LPS = Longest Proper Prefix which is also a Suffix.
 *
 * Example:
 * Pattern = "ABABAC"
 *
 * Index:    0 1 2 3 4 5
 * Pattern:  A B A B A C
 * LPS:      0 0 1 2 3 0
 *
 * For "ABABA", the longest proper prefix that is also a
 * suffix is "ABA", so its LPS value is 3.
 *
 * A proper prefix cannot be the entire string itself.
 *
 * ------------------------------------------------------------
 * ALGORITHM STEPS:
 *
 * STEP 1: Build the LPS array for the pattern.
 *
 * STEP 2: Compare text and pattern using two pointers:
 *         i -> Current pattern index
 *         j -> Current text index
 *
 * STEP 3: If characters match:
 *         Increment both pointers.
 *
 * STEP 4: If the entire pattern matches:
 *         Store starting index (j - m).
 *         Set i = LPS[i - 1] to allow overlapping matches.
 *
 * STEP 5: On mismatch:
 *         If i > 0, set i = LPS[i - 1].
 *         Otherwise, move j forward.
 *
 * IMPORTANT:
 * The text pointer never moves backward.
 *
 * ------------------------------------------------------------
 * TIME COMPLEXITY:
 *
 * Building LPS: O(m)
 * Searching:    O(n)
 * Total:        O(n + m)
 *
 * n = text length
 * m = pattern length
 *
 * AUXILIARY SPACE: O(m) for the LPS array.
 * OUTPUT SPACE:    O(k) for k matching positions.
 *
 * ------------------------------------------------------------
 * WHEN TO USE:
 *
 * - Find a substring in a larger string.
 * - Find all occurrences of a pattern.
 * - Handle overlapping matches.
 * - Solve string matching problems in linear time.
 *
 * ============================================================
 */