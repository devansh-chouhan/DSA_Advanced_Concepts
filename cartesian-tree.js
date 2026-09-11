class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

let nums = [3, 2, 1, 6, 0, 5];


// ===============================================================
// CARTESIAN TREE — O(N) MONOTONIC STACK
// ===============================================================

let stack = [];

for (let i = 0; i < nums.length; i++) {

    let node = new TreeNode(nums[i]);

    let last = null;

    while (
        stack.length > 0 &&
        stack[stack.length - 1].val < nums[i]
    ) {
        last = stack.pop();
    }

    if (stack.length > 0) {
        stack[stack.length - 1].right = node;
    }

    node.left = last;

    stack.push(node);
}

console.log(stack[0]);


// ===============================================================
// CARTESIAN TREE — O(N²) RECURSIVE CONSTRUCTION
// ===============================================================

function build(l, r) {

    if (l > r) return null;

    let maxIdx = l;

    for (let i = l + 1; i <= r; i++) {
        if (nums[i] > nums[maxIdx]) {
            maxIdx = i;
        }
    }

    let node = new TreeNode(nums[maxIdx]);

    node.left = build(l, maxIdx - 1);

    node.right = build(maxIdx + 1, r);

    return node;
}

console.log(build(0, nums.length - 1));



/*
================================================================
                    CARTESIAN TREE
================================================================

Definition:

A Cartesian Tree is a binary tree constructed from an array
such that it satisfies TWO important properties:

1. Inorder traversal of the tree gives the original array.

2. The tree satisfies a Heap property.

For a MAX Cartesian Tree:
    parent.val >= children.val

For a MIN Cartesian Tree:
    parent.val <= children.val


Example:

nums = [3, 2, 1, 6, 0, 5]


                    6
                  /   \
                 3     5
                  \   /
                   2 0
                    \
                     1


Inorder traversal:

    3 -> 2 -> 1 -> 6 -> 0 -> 5

which is exactly the original array.


================================================================
                    KEY IDEA
================================================================

For a MAX Cartesian Tree:

The maximum element of the current range becomes the root.

Everything to the LEFT of the maximum becomes the left subtree.

Everything to the RIGHT of the maximum becomes the right subtree.

So recursively:

    maximum = root

    left subtree  = build(left, maximumIndex - 1)

    right subtree = build(maximumIndex + 1, right)


================================================================
                MONOTONIC STACK IDEA
================================================================

Instead of repeatedly searching for the maximum, we can construct
the Cartesian Tree in O(N) using a monotonic decreasing stack.

For every nums[i]:

    1. Create a new TreeNode.

    2. Pop all smaller elements from the stack.

    3. The LAST popped node becomes the current node's LEFT child.

    4. If the stack is not empty, the current node becomes the
       RIGHT child of the stack top.

    5. Push the current node.


Core pattern:

    while stack.top < current:

        last = stack.pop()


    if stack is not empty:

        stack.top.right = current


    current.left = last

    stack.push(current)


At the end:

    stack[0] = root


================================================================
                WHY DOES LAST POPPED BECOME LEFT?
================================================================

Suppose we have:

    3 -> 2 -> 1

and then encounter:

    6


6 is greater than all of them, so they are popped.

The popping happens:

    1
    2
    3

Therefore the LAST popped node is:

    3


Since 3 is the closest node to 6 on the left,
it becomes:

    6.left = 3


The nodes that were below 3 remain inside its subtree.

Result:

        6
       /
      3
       \
        2
         \
          1


================================================================
                    IMPORTANT INVARIANTS
================================================================

1. Inorder traversal always gives the original array.

2. Max Cartesian Tree satisfies:

       parent >= children


3. Min Cartesian Tree satisfies:

       parent <= children


4. The root of a Max Cartesian Tree is the maximum element.

5. The root of a Min Cartesian Tree is the minimum element.

6. The relative order of elements is preserved by inorder traversal.

7. The monotonic stack maintains a decreasing sequence for
   a Max Cartesian Tree.

8. For a Min Cartesian Tree, the comparison is reversed.


================================================================
                    TIME COMPLEXITY
================================================================

MONOTONIC STACK:

    Time  = O(N)
    Space = O(N)


Why O(N)?

Every element:

    - is pushed exactly once
    - is popped at most once

Therefore total stack operations are O(N).


RECURSIVE MAX SEARCH:

    Average / balanced-looking cases:
        approximately O(N log N)

    Worst case:
        O(N²)

Worst case happens when the array is already sorted.

Example:

    [1, 2, 3, 4, 5]

or:

    [5, 4, 3, 2, 1]


At every recursive level, we scan almost the entire remaining
range to find the maximum.


================================================================
              O(N LOG N) ALTERNATIVE
================================================================

The recursive approach can also be optimized using a
Segment Tree.

Instead of scanning:

    [l ... r]

to find the maximum in O(N),

we can use a Segment Tree to find the maximum index in:

    O(log N)


Then recursively construct:

    left subtree
    right subtree


Complexity:

    Build Segment Tree = O(N)

    Each maximum query = O(log N)

    Total = O(N log N)


So there are three important approaches:

    1. Brute-force recursive
       O(N²)

    2. Segment Tree + recursion
       O(N log N)

    3. Monotonic Stack
       O(N)


The monotonic stack is the preferred approach when the problem
allows it.


================================================================
                    DUPLICATE VALUES
================================================================

When duplicate values exist, the comparison matters.

For example:

    [3, 3, 2, 3]

Using:

    stack.top < current

and using:

    stack.top <= current

can produce different tree structures.

Therefore, when duplicates matter, carefully choose whether the
Cartesian Tree should prefer the LEFT occurrence or RIGHT
occurrence of equal values.

The exact comparison:

    <
    <=
    >
    >=

can change the resulting tree.


================================================================
              WHERE CARTESIAN TREES ARE USEFUL
================================================================

Cartesian Trees are especially useful when an array problem
contains:

    - Range Minimum / Maximum
    - Subarray minimum / maximum
    - Nearest smaller / greater relationships
    - Divide-and-conquer based on minimum/maximum
    - Range queries
    - Histogram problems
    - Tree representation of an array
    - Lowest Common Ancestor transformations
    - RMQ (Range Minimum Query)
    - Problems involving subarray extrema


A very important connection is:

    Range Minimum Query (RMQ)
                ↓
         Cartesian Tree
                ↓
       Lowest Common Ancestor


For a MIN Cartesian Tree, the minimum value in a range can be
related to the LCA of the corresponding nodes.


================================================================
             IMPORTANT PROBLEM CONNECTIONS
================================================================

Cartesian Tree concepts are closely related to:

    1. Monotonic Stack

    2. Next Smaller Element

    3. Previous Smaller Element

    4. Next Greater Element

    5. Previous Greater Element

    6. Largest Rectangle in Histogram

    7. Sum of Subarray Minimums

    8. Sum of Subarray Ranges

    9. Range Minimum Query

    10. Lowest Common Ancestor


A lot of Cartesian Tree problems do NOT explicitly say:

    "Build a Cartesian Tree."

Instead, the underlying structure may be hidden inside a
monotonic-stack solution.


================================================================
                HOW TO RECOGNIZE THE TECHNIQUE
================================================================

Think about Cartesian Trees when you see:

    "Choose the minimum/maximum element."

    "Split the array around the minimum/maximum."

    "Solve the left and right portions recursively."

    "The answer depends on range minimum/maximum."

    "Need to preserve the original array's order."

    "Need a tree whose inorder traversal is the array."


If the recursive solution repeatedly does:

    find min/max in range
    split around it
    solve left
    solve right

then think:

    CARTESIAN TREE


If the goal is to construct that tree efficiently,
think:

    MONOTONIC STACK

Complexities:

    Brute Force       = O(N²)
    Segment Tree      = O(N log N)
    Monotonic Stack   = O(N)

================================================================
*/