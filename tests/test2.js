/* DEFINE FUNCTIONS */

// define function to check if a word is valid with respects to requirements
const isValidWord = (wordIn, commonWordList) => {
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
const getTextNodes = (rootNode) => {
    const treeWalker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);
    let textNodes = [];
    let  currentNode = treeWalker.currentNode;
    while (currentNode) {
        textNodes.push(currentNode)
        currentNode = treeWalker.nextNode();
    }
    return textNodes;
}


// counts frequencies of words on in a body of text, 
// specifically those within the element whose id is #content
// returns an object mapping each encountered string to the number of times it occurs in the text
const mapWordFrequencies = (str) => {
    let freqCounter = {}; // return value, will map strings with its frequency
    // regex to identify all 'exotic' whitespace characters with spaces
    const whiteSpace = /(\n|\t|\v|\r|\f)/g;
    // regex to identify all parenthesis, periods, commas, etc.
    const punctuation = /[?.,"'\[\]\(\)]/g;
    // remove exotic whitespaces and punctuation
    const sanitizedText = str.replaceAll(whiteSpace, " ").replaceAll(punctuation, " ");
    const wordsFromText = sanitizedText.split(/[ ]+/);
}

const wordFrequencies = mapWordFrequencies(document.getElementById("content"));

