/*
=====================================================
 RABIN-KARP STRING MATCHING (Double Rolling Hash)
=====================================================

 IDEA
 ----
 Instead of comparing the pattern character by character at every
 position, compare HASHES (numbers). Hash the pattern once, then
 slide a window of the same length over the text and update its hash
 in O(1) using a ROLLING HASH. Only when the hashes match is the
 window a candidate match.

 Rabin-Karp = Rolling Hash + "compare hashes first, verify on match"

 HASH FORMULA (polynomial hash, base 26)
 ---------------------------------------
 hash("abc") = 1*26^2 + 2*26^1 + 3*26^0   (a=1, b=2, c=3)
 Computed as: h = (h * 26 + code) % MOD   for each char

 ROLLING UPDATE (slide window right by one)
 ------------------------------------------
 newHash = ((oldHash - outChar * 26^(m-1)) * 26 + inChar) % MOD
            |__ remove leading char __|     |_ shift _|  |_ add new _|
 (26^(m-1) is stored in highestPow; add MOD before % to avoid negatives)

 WHY DOUBLE HASHING (MOD1 and MOD2)
 ----------------------------------
 One modulus can give false positives (collisions: different strings,
 same hash). Using two different primes makes a collision about
 1 in 10^18, so it is practically safe.

 WHY a=1 AND NOT a=0
 -------------------
 If a=0 then "a", "aa", "aaa" would all hash to 0. Starting from 1 avoids this.

 COMPLEXITY
 ----------
 Time  : O(n + m) average   (n = text length, m = pattern length)
         O(n * m) worst case if you verify on every hit and
         matches/collisions are very frequent (e.g. "aaaa..." text)
 Space : O(1)

 WHEN TO USE
 -----------
 - Searching for a pattern in a text
 - Multi-pattern search (same-length patterns -> store hashes in a Set)
 - Finding duplicate / repeated substrings (hash + binary search)
 - 2D pattern matching

 GOTCHAS
 -------
 - This code does NOT verify on a hash match. Fine with double hashing,
   but strictly Rabin-Karp should confirm with txt.startsWith(pattern, i).
 - Only works for lowercase a-z as written (code = charCode - 96).
   For other chars use charCodeAt(i) directly with a larger base (e.g. 256).
 - If pattern.length > txt.length, txt[i] becomes undefined and crashes.
   Add a guard at the top.
 - Negative modulo: (a - b) % MOD can be negative in JS, so always use
   ((x % MOD) + MOD) % MOD.
 - Large bases / mods can push products past 2^53 (Number.MAX_SAFE_INTEGER).
   Use BigInt if you increase them.
 - Comparing strings (h1 + "-" + h2) works but is slower than comparing
   the two numbers directly (h1 === p1 && h2 === p2).

 RELATED PROBLEMS (LeetCode)
 ---------------------------
 - 28   Find the Index of the First Occurrence in a String (direct)
 - 187  Repeated DNA Sequences
 - 686  Repeated String Match
 - 1044 Longest Duplicate Substring (rolling hash + binary search)
 - 1392 Longest Happy Prefix

 COMPARE WITH
 ------------
 - KMP / Z-algorithm : deterministic O(n + m), no hashing, no collisions
 - Rabin-Karp        : simpler to extend to multi-pattern and 2D
*/

let txt = "bcabcbac";
let pattern = "abc";

// Two large primes for double hashing
const MOD1 = 1e9 + 7;
const MOD2 = 1e9 + 9;

// ---------- STEP 1: Hash of the pattern ----------
let pHash1 = 0;
let pHash2 = 0;
for (let ch of pattern) {

    let code = ch.charCodeAt(0) - 96;   // a=1, b=2, ..., z=26

    pHash1 = (pHash1 * 26 + code) % MOD1;
    pHash2 = (pHash2 * 26 + code) % MOD2;
}

// Combined key so both hashes are compared together
const patternHash = pHash1 + "-" + pHash2;


// ---------- STEP 2: Hash of the first window of text ----------
const size = pattern.length;
let tHash1 = 0;
let tHash2 = 0;


for (let i = 0; i < size; i++) {

    let code = txt[i].charCodeAt(0) - 96;

    tHash1 = (tHash1 * 26 + code) % MOD1;
    tHash2 = (tHash2 * 26 + code) % MOD2;

}

let txtHash = tHash1 + "-" + tHash2;

// Check the very first window (index 0)
if (txtHash === patternHash) {
    console.log("Match Found at :", 0);
}


// ---------- STEP 3: Precompute 26^(m-1) ----------
// Weight of the leading character, needed to remove it when sliding
let highestPow1 = 1;
let highestPow2 = 1;

for (let i = 0; i < size - 1; i++) {
    highestPow1 = (highestPow1 * 26) % MOD1
    highestPow2 = (highestPow2 * 26) % MOD2
}

// ---------- STEP 4: Slide the window across the text ----------
for (let i = size; i < txt.length; i++) {

    // 4a. REMOVE the leading character of the old window
    let removeCode = txt[i - size].charCodeAt(0) - 96;
    tHash1 = (((tHash1 - (removeCode * highestPow1)) % MOD1) + MOD1) % MOD1;
    tHash2 = (((tHash2 - (removeCode * highestPow2)) % MOD2) + MOD2) % MOD2;

    // 4b. SHIFT left by one place and ADD the new character
    let code = txt[i].charCodeAt(0) - 96;

    tHash1 = (tHash1 * 26 + code) % MOD1;
    tHash2 = (tHash2 * 26 + code) % MOD2;

    // 4c. COMPARE with the pattern hash
    txtHash = tHash1 + "-" + tHash2;
    if (txtHash === patternHash) {
        console.log("Match Found at :", i - size + 1);  // start index of window
    }
}

/*
Output:
Match Found at : 2

-----------------------------------------------------
DRY RUN  (txt = "bcabcbac", pattern = "abc", a=1 b=2 c=3)
-----------------------------------------------------
Pattern hash: abc = 1*676 + 2*26 + 3 = 731   (shown for MOD1, ignoring %)
highestPow = 26^2 = 676

Index | Window | Hash                                        | Match?
------|--------|---------------------------------------------|-------
  0   |  bca   | 2*676 + 3*26 + 1 = 1431                     | no
  1   |  cab   | (1431 - 2*676) * 26 + 2 = 79*26 + 2 = 2056  | no
  2   |  abc   | (2056 - 3*676) * 26 + 3 = 28*26 + 3 = 731   | YES
  3   |  bcb   | (731 - 1*676) * 26 + 2 = 55*26 + 2 = 1432   | no
  4   |  cba   | (1432 - 2*676) * 26 + 1 = 80*26 + 1 = 2081  | no
  5   |  bac   | (2081 - 3*676) * 26 + 3 = 53*26 + 3 = 1381  | no

Only index 2 equals 731, so "Match Found at : 2".
(Real code also takes % MOD, but the numbers here are small enough
that it changes nothing.)
*/