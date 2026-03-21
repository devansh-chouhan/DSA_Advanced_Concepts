class Solution {
  // V = 3, E = 3, Edges = [[0, 1, 5], [1, 2, 3], [0, 2, 1]]
  spanningTree(V, edges) {
    let par = new Array(V);
    let rank = new Array(V);

    for (let i = 0; i < V; i++) {
      par[i] = i;
      rank[i] = 0;
    }

    function find(node) {
      if (node === par[node]) return node;
      par[node] = find(par[node]);
      return par[node];
    }

    function union(x, y) {
      let x_par = find(x);
      let y_par = find(y);

      if (x_par !== y_par) {
        if (rank[x_par] > rank[y_par]) {
          par[y_par] = x_par;
        } else if (rank[x_par] < rank[y_par]) {
          par[x_par] = y_par;
        } else {
          par[x_par] = y_par;
          rank[y_par]++;
        }
      }
    }

    // Sort edges based on weight (Greedy step)
    edges = edges.sort((a, b) => a[2] - b[2]);

    let sum = 0;
    for (let [u, v, wt] of edges) {
      // If u and v are not in the same component
      if (find(u) !== find(v)) {
        sum += wt; // Include edge in MST
        union(u, v); // Merge the two components
      }
    }
    return sum;
  }
}

/*
Kruskal’s Algorithm is a greedy algorithm used to find the 
Minimum Spanning Tree (MST) of a graph.
MST must have V nodes and V - 1 edges.

Time Complexity:
- O(E log E)  [due to sorting]
*/
