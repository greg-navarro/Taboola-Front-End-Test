/* DEFINE FUNCTIONS */

// Define function to check if a word is valid with respects to requirements
function isValidWord (wordIn, commonWordList) {
    let valid = true;
    if (wordIn.length < 2) {
        valid = false;
    } else if (commonWordList.includes(wordIn) || /\d/.test(wordIn)) {
        valid = false;
    } else {
        let index = 0;
        while (index < wordIn.length && valid) {
            let asciiCode = wordIn.charCodeAt(index);
            if (asciiCode < 65 || asciiCode > 122) {
                valid = false;
            }
            index++ ;
        }
    }
    return valid;
}

// given a node, visits all descendent text nodes
// and gathers an array of references to each
function getTextNodes (rootNode) {
    const treeWalker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);
    let textNodes = [];
    let  currentNode = treeWalker.currentNode;
    while (currentNode) {
        textNodes.push(currentNode)
        currentNode = treeWalker.nextNode();
    }
    return textNodes;
}


// counts frequencies of words on in a string, 
// returns an object mapping each encountered string to the number of times it occurs in the text
function mapWordFrequencies (str) {
    let freq = {}; // return value, will map strings with its frequency
    // regex to identify all 'exotic' whitespace characters with spaces
    const whiteSpace = /(\n|\t|\v|\r|\f)/g;
    // regex to identify all parenthesis, periods, commas, etc.
    const punctuation = /[?.,"'\[\]\(\)]/g;
    // remove exotic whitespaces and punctuation
    const sanitizedText = str.replaceAll(whiteSpace, " ").replaceAll(punctuation, " ");
    // split words into an array 
    // TODO it would be better to iterate through the string delimited on spaces (but might not actually be faster :/)
    const wordsFromText = sanitizedText.split(/[ ]+/);
    // iterate through the words and make a case-insensitive tally of occurences of each word
    wordsFromText.forEach((word) => {
        const lowerCasedWord = word.toLowerCase();
        if (freq[lowerCasedWord] === undefined) {
            freq[lowerCasedWord] = 1;
        } 
        else { 
            freq[lowerCasedWord] = freq[lowerCasedWord] + 1;
        }
    });
    return freq;
}

// TEST CODE
const textNodes = getTextNodes(document.getElementById("content"));
// retrieve text from the list of textNodes
let textNodeValues = textNodes.map(node => node.nodeValue);
console.log(textNodeValues)
const wordFrequencies = mapWordFrequencies(" ".concat(textNodeValues));
console.log(wordFrequencies)
