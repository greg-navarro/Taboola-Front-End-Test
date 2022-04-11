// create a treewalker with the <body> element as the root node
// do not filter at this point
// prints out the node to the console
const walker = document.createTreeWalker(document.getElementById('content'), NodeFilter.SHOW_TEXT);
let currentNode = walker.currentNode;

while (currentNode) {
    console.log(currentNode.nodeValue);
    currentNode = walker.nextNode();
}

