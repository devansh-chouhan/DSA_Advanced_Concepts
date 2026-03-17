function kosaraju(n, edges) {
    // Adjacency list for original graph
    let adj = {};

    // Step 1: Build graph
    // u -> v (directed edge)
    for (let [u, v] of edges) {
        if (adj[u] === undefined) adj[u] = [];
        adj[u].push(v);
    }

    // Track visited nodes
    let visited = new Set();

    // Stack to store nodes in order of finishing time
    let stack = [];

    // DFS for Step 1 (fill stack)
    function dfs(node) {
        visited.add(node);

        // Traverse all neighbors
        if (adj[node] !== undefined) {
            for (let neigh of adj[node]) {
                if (!visited.has(neigh)) {
                    dfs(neigh);
                }
            }
        }

        // IMPORTANT: push AFTER visiting all neighbors
        // (this gives correct finishing time order)
        stack.push(node);
    }

    // Run DFS for all nodes (handles disconnected graph)
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            dfs(i);
        }
    }

    // Step 2: Reset visited for second DFS
    visited = new Set();

    // Build transpose (reversed graph)
    let adjT = {};

    // Reverse all edges: u -> v becomes v -> u
    for (let [u, v] of edges) {
        if (adjT[v] === undefined) adjT[v] = [];
        adjT[v].push(u);
    }

    // Count of strongly connected components
    let scc = 0;

    // String to store components (for visualization)
    let components = "";

    // DFS for Step 3 (on reversed graph)
    function dfs2(node) {
        visited.add(node);

        // Add node to current component
        components += node;

        // Traverse neighbors in reversed graph
        if (adjT[node] !== undefined) {
            for (let neigh of adjT[node]) {
                if (!visited.has(neigh)) {
                    dfs2(neigh);
                }
            }
        }
    }

    // Step 3: Process nodes in order of decreasing finish time
    while (stack.length > 0) {
        let node = stack.pop();

        // If not visited, it's a new SCC
        if (!visited.has(node)) {
            scc++;

            // Separate different components by space
            components += " ";

            // Run DFS on transpose graph
            dfs2(node);
        }
    }

    // Return number of SCCs and their grouping
    return [scc, components.trim()];
}


// Example usage
console.log(kosaraju(5, [[0, 2], [0, 3], [1, 0], [2, 1], [3, 4]]));
// Output: [ 3, '012 3 4' ]


/*
==================== KOSARAJU SUMMARY ====================

Goal:
Find Strongly Connected Components (SCCs) in a directed graph.

Definition:
SCC = group of nodes where every node is reachable from every other node.

----------------------------------------------------------
Algorithm Steps:

1. First DFS (Original Graph)
   - Perform DFS
   - Push nodes into stack AFTER finishing DFS
   - This stores nodes in decreasing finish time

2. Reverse the Graph
   - Reverse all edges

3. Second DFS (on Reversed Graph)
   - Pop nodes from stack
   - If not visited → DFS
   - Each DFS gives one SCC

----------------------------------------------------------
Key Intuition:

- Stack ensures we process nodes in correct order
- Reversing edges isolates SCCs
- Each DFS in step 3 gives exactly one component

----------------------------------------------------------
Time Complexity:
O(V + E)

----------------------------------------------------------
Common Mistakes:

❌ Pushing node before DFS finishes
❌ Forgetting to reset visited
❌ Not reversing graph properly
❌ Missing nodes with no outgoing edges

==========================================================
*/