// create a treewalker with the <body> element as the root node
// do not filter at this point
// prints out the node to the console
const walker = document.createTreeWalker(document.getElementById('content'), NodeFilter.SHOW_TEXT);
let currentNode = walker.currentNode;

while (currentNode) {
    console.log(currentNode.nodeValue);
    currentNode = walker.nextNode();
}

// example of how value will be parsed
let test = "mw-parser-output .refbegin{font-size:90%;margin-bottom:0.5em}.mw-parser-output .refbegin-hanging-indents>ul{margin-left:0}.mw-parser-output .refbegin-hanging-indents>ul>li{margin-left:0;padding-left:3.2em;text-indent:-3.2em}.mw-parser-output .refbegin-hanging-indents ul,.mw-parser-output .refbegin-hanging-indents ul li{list-style:none}@media(max-width:720px){.mw-parser-output .refbegin-hanging-indents>ul>li{padding-left:1.6em;text-indent:-1.6em}}.mw-parser-output .refbegin-columns{margin-top:0.3em}.mw-parser-output .refbegin-columns ul{margin-top:0}.mw-parser-output .refbegin-columns li{page-break-inside:avoid;break-inside:avoid-column}"
const whiteSpace = /(\n|\t|\v|\r|\f)/g
test = test.replaceAll(whiteSpace, " ")
console.log(test)
const punctuation = /[?.,"'\[\]\(\)]/g 
test = test.replaceAll(punctuation, "")
console.log(test.split(" "))