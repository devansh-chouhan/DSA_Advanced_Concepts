class Solution {
  topoSort(V, edges) {
    // V = 4, edges[][] = [[3, 0], [1, 0], [2, 0]]
    let adj = {};
    let indegree = new Array(V).fill(0);

    for (let [u, v] of edges) {
      if (adj[u] === undefined) {
        adj[u] = [];
      }
      adj[u].push(v);
      indegree[v]++;
    }

    let res = [];
    let queue = []; // can use stack also

    for (let i = 0; i < V; i++) {
      if (indegree[i] === 0) {
        queue.push(i);
      }
    }

    while (queue.length > 0) {
      let node = queue.pop(); // if using (DFS)stack use pop() , if using (BFS)queue use shift()
      res.push(node);
      if (adj[node] === undefined) continue;
      for (let neigh of adj[node]) {
        indegree[neigh]--;
        if (indegree[neigh] === 0) queue.push(neigh);
      }
    }
    return res;
  }
}

// Kahn's Algorithm (BFS-based)

/*Topological Sort:
A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u → v, vertex u appears before v.

Example:
Edges:
A → B
A → C
B → D
C → D

Valid topological orders:
A, B, C, D
A, C, B, D

The rule: Parent/dependency always comes before child.

Cycle Detection Rule:
If the topological order contains all V vertices → Graph is Acyclic (DAG) ✅
If the topological order contains fewer than V vertices → Graph has a Cycle ❌*/
