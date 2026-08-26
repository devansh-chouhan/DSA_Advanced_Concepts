let edges = [
    [1, 3, 2],
    [4, 3, -1],
    [2, 4, 1],
    [1, 2, 1],
    [0, 1, 5]
];

// Number of vertices
// Here vertices are: 0, 1, 2, 3, 4
let V = edges.length;

// Distance array
// Initially, we assume every vertex is unreachable
let dist = new Array(V).fill(Infinity);

// Source vertex
let src = 0;

// Distance from source to itself is always 0
dist[src] = 0;


// Bellman-Ford Algorithm
// We relax all edges multiple times

// Important:
// For V vertices, we need at most V - 1 iterations
// because the longest possible shortest path can contain
// at most V - 1 edges

for (let i = 0; i < V - 1; i++) {

    // Go through every edge
    for (let [u, v, w] of edges) {

        // Check if:
        // 1. Vertex u is reachable from the source
        // 2. Going from u -> v gives a shorter path

        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {

            // Relax the edge
            // Update the shortest distance to vertex v
            dist[v] = dist[u] + w;
        }
    }
}


// Check for Negative Weight Cycle

// If we can still reduce a distance after V - 1 iterations,
// then a negative weight cycle exists


// Input for negative weight cycle
// edges = [[0, 1, 4], [1, 2, -6], [2, 3, 5], [3, 1, -2]], src = 0
for (let [u, v, w] of edges) {

    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {

        console.log("Negative Weight Cycle Present");
        break;
    }
}


// Print shortest distances from source
console.log(dist);


/**
 * ======================== BELLMAN-FORD ALGORITHM ========================
 *
 * Definition:
 *
 * Bellman-Ford is a shortest path algorithm used to find the
 * shortest distance from a single source vertex to all other vertices.
 *
 * Unlike Dijkstra's Algorithm, Bellman-Ford can handle NEGATIVE
 * edge weights and detects Negative Weight Cycles.
 *
 *-------------------- BELLMAN-FORD vs DIJKSTRA --------------------
 *
 * Bellman-Ford:
 *
 * - Works with Positive Weights
 * - Works with Negative Weights
 * - Detects Negative Cycles
 * - Works for Directed Graphs
 * - Works for Undirected Graphs
 * - Time Complexity: O(V * E)
 *
 *
 * Dijkstra:
 *
 * - Works with Non-Negative Weights only
 * - Does NOT work correctly with Negative Weights
 * - Cannot detect Negative Cycles
 * - Works for Directed Graphs
 * - Works for Undirected Graphs
 * - Faster: O(E log V) using Priority Queue
 *
 *
 * 
 */