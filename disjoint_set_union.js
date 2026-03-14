//Disjoint Set Union

// n = 3, edges = [[0,1],[1,2],[2,0]]
let par = new Array(n);
let rank = new Array(n);

for (let i = 0; i < n; i++) {
    par[i] = i;
    rank[i] = 0;
}

function find(node) {
    if (node === par[node]) return node;

    par[node] = find(par[node]);
    return par[node];
}

function union(x, y) {
    let x_parent = find(x);
    let y_parent = find(y);
    if (x_parent !== y_parent) {
        if (rank[x_parent] > rank[y_parent]) {
            par[y_parent] = x_parent;
        } else if (rank[x_parent] < rank[y_parent]) {
            par[x_parent] = y_parent;
        } else {
            par[x_parent] = y_parent;
            rank[y_parent]++;
        }
    }
}

for (let [u, v] of edges) {
    union(u, v);
}