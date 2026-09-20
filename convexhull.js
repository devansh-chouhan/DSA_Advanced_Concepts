const points = [[1, 1], [2, 2], [2, 0], [2, 4], [3, 3], [4, 2]];

function ort(A, B, C) {
    return (
        ((B[0] - A[0]) * (C[1] - B[1])) -
        ((B[1] - A[1]) * (C[0] - B[0]))
    )
}

points.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1]
})

let lower = [];
for (let p of points) {
    while (
        lower.length >= 2 &&
        ort(
            lower[lower.length - 2],
            lower[lower.length - 1],
            p
        ) < 0
    ) {
        lower.pop();
    }
    lower.push(p);
}

let upper = [];
for (let i = points.length - 1; i >= 0; i--) {
    while (
        upper.length >= 2 &&
        ort(
            upper[upper.length - 2],
            upper[upper.length - 1],
            points[i]
        ) < 0
    ) {
        upper.pop();
    }
    upper.push(points[i]);
}

let res = [];
let st = new Set();

for (let i = 0; i < lower.length; i++) {
    let s = lower[i][0] + " " + lower[i][1];
    if (st.has(s)) continue;
    st.add(s);
    res.push(lower[i]);
}

for (let i = 0; i < upper.length; i++) {
    let s = upper[i][0] + " " + upper[i][1];
    if (st.has(s)) continue;
    st.add(s);
    res.push(upper[i]);
}

console.log(res);

/*
==================== CONVEX HULL ====================

Goal:
Find the smallest convex polygon containing all points.

Common algorithm:
Monotonic Chain / Andrew's Algorithm

Steps:
1. Sort points by (x, y)
2. Build lower hull  -> left to right
3. Build upper hull  -> right to left
4. Combine both


==================== CROSS PRODUCT ====================
Orientation
cross(A, B, C):

(Bx - Ax) * (Cy - Ay)
-
(By - Ay) * (Cx - Ax)

> 0  -> counter-clockwise / left turn
< 0  -> clockwise / right turn
= 0  -> collinear


==================== CORE IDEA ====================

Maintain a hull using a stack.

For every new point:

If the last 3 points make an unwanted turn:
    pop the middle point

Keep doing this until the turn becomes valid.

Then:
    push the new point


==================== LOWER / UPPER ====================

Lower hull:
    process points left -> right

Upper hull:
    process points right -> left


==================== IMPORTANT ====================

Use:

    while (cross(...) < 0)
        pop();

instead of:

    if (...)

Because one new point can invalidate multiple
previous points.

< 0  -> remove clockwise turns
<= 0 -> remove clockwise + collinear points

Which one to use depends on whether
collinear boundary points should be preserved.


==================== COMPLEXITY ====================

Sorting       -> O(n log n)
Hull building -> O(n)
Total         -> O(n log n)
Space         -> O(n)


MEMORY TRICK:

Convex Hull =
Sort + Cross Product + Lower + Upper
*/
