// create a treewalker with the <body> element as the root node
// do not filter at this point
// prints out the node to the console
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ALL, null);
let currentNode = walker.currentNode;

while (currentNode) {
    console.log(currentNode);
    currentNode = walker.nextNode();
}