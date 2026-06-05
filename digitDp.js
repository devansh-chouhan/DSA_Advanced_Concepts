function helper(s, idx, tight, cnt) {
  if (idx === s.length) return cnt;

  if (dp[idx][tight][cnt] !== undefined) return dp[idx][tight][cnt];

  let res = 0;
  let limit = tight ? Number(s[idx]) : 9;
  for (let i = 0; i <= limit; i++) {
    let nextTight = tight && i === Number(s[idx]) ? 1 : 0;
    let nextCnt = cnt + (i === 1 ? 1 : 0);
    res += helper(s, idx + 1, nextTight, nextCnt);
  }
  dp[idx][tight][cnt] = res;
  return res;
}

let s = "123456";
let dp = Array.from({ length: s.length }, () =>
  Array.from({ length: 2 }, () => Array(s.length + 1).fill(undefined)),
);
let res = helper(s, 0, 1, 0);
console.log(res); // 93553

/*
Digit DP

Problem:
Count total occurrences of digit '1'
in all numbers from 0 to N.

Example:
N = 13

Numbers:
0 1 2 3 4 5 6 7 8 9 10 11 12 13

Digit '1' appears:
1  -> 1 time
10 -> 1 time
11 -> 2 times
12 -> 1 time
13 -> 1 time

Answer = 6

State:
idx   -> current digit position
tight -> whether we are still bounded by N
cnt   -> number of 1s chosen so far

DP:
dp[idx][tight][cnt]

Time:
O(length * 2 * length * 10)

Space:
O(length * 2 * length)

Very common Digit DP pattern:
(index, tight, extra_state)
*/
