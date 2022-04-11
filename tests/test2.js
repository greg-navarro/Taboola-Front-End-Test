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

// TEST function TODO delete
function isValidWord (word) { 
    if (isNaN(word)) {
        return true;
    }
    return false; 
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
// retrieve text from the list of textNodes, concatenate this into a single string
// measure string frequencies from the values of those textNodes
const wordFrequencies = mapWordFrequencies(
    " ".concat(textNodes.map(node => node.nodeValue))
    );
// convert wordFreqencies to a sorted array, with the most frequent words ordered before the least
const sortedOccurrenceList = Object.entries(wordFrequencies).sort((a, b) => b[1] - a[1])
// substitute those words that occur most often with the number of times they occur
const maxSubstitutions = 25;
let substitutions = 0;
let i = 0;
while (substitutions < maxSubstitutions && i < sortedOccurrenceList.length) {
    const current = sortedOccurrenceList[i];
    const currentWord = current[0];
    console.log(current);
    // only make substitutions if the word meets our requirements for validity
    if (isValidWord(currentWord)) {
        console.log("valid word")
        let wordOccurs = current[1];
        substitutions++;
        // transverse textNodes from the relevant portion of the page
        // replace each instance of the target word with the number of times it occurs
        for (node of textNodes) {
            const currentNodeValue = node.nodeValue;
            // console.log(currentNodeValue);
        //     if (typeof currentValue === "string") {
        //         // console.log(currentValue);
        //         const newValue = currentValue.replaceAll(currentWord, wordOccurs);
        //         node.nodeValue = newValue;
        //     } else { 
        //         // console.log("Not a string"); 
        //     }
        }
    }

    i++;
}

