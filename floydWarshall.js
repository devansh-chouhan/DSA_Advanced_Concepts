function floydWarshall(graph) {
  let V = graph.length;

  for (let via = 0; via < V; via++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (graph[i][via] !== Infinity && graph[via][j] !== Infinity) {
          graph[i][j] = Math.min(graph[i][j], graph[i][via] + graph[via][j]);
        }
      }
    }
  }

  return graph;
}

let graph = [
  [0, 4, Infinity, 5, Infinity],
  [Infinity, 0, 1, Infinity, 6],
  [2, Infinity, 0, 3, Infinity],
  [Infinity, Infinity, 1, 0, 2],
  [1, Infinity, Infinity, 4, 0],
];
console.log(floydWarshall(graph));

/*
The Floyd–Warshall algorithm is a classic algorithm used to find the shortest paths between every pair of vertices in a weighted graph.

It works for:
Directed or undirected graphs
Graphs with positive or negative edge weights
But no negative cycles

Time and Space Complexity
| Metric           | Value     |
| ---------------- | --------- |
| Time Complexity  | **O(V³)** |
| Space Complexity | **O(V²)** |
So it is best when V ≤ ~500.
*/