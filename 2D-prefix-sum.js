// Original matrix
let grid = [
    [7, 2, 9],
    [1, 5, 0],
    [2, 6, 6]
];

// Dimensions
let m = grid.length;      // number of rows
let n = grid[0].length;   // number of columns

// Convert grid into 2D Prefix Sum matrix (in-place)
for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {

        // Add sum from top cell
        if (i > 0) grid[i][j] += grid[i - 1][j];

        // Add sum from left cell
        if (j > 0) grid[i][j] += grid[i][j - 1];

        // Subtract overlap (top-left diagonal) 
        // because it was added twice
        if (i > 0 && j > 0) grid[i][j] -= grid[i - 1][j - 1];
    }
}

// After this, grid[i][j] represents:
// sum of all elements from (0,0) to (i,j)
console.log(grid);

// 2D Prefix Sum (or Integral Matrix)
/*
Final grid becomes (prefix sum matrix):

[
  [7,  9, 18],
  [8, 15, 24],
  [10, 23, 38]
]

Meaning:
grid[i][j] = sum of rectangle from top-left (0,0) → (i,j)

Example:
grid[2][2] = 38 → sum of entire matrix
grid[1][1] = 15 → sum of submatrix:
    7 2
    1 5
*/
