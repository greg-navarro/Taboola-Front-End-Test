let base_node = document.body;

// breadth first transversal of DOM 
let unvisitedNodes = [base_node];

while (unvisitedNodes.length > 0) {
    let currentNode = unvisitedNodes.shift();
    // add child unvisitedNodes to array of unvisited Nodes
    if (currentNode.childNodes) 
        unvisitedNodes = [...unvisitedNodes, ...currentNode.childNodes];
    // output the name of the node to the console
    console.log(currentNode);
}
