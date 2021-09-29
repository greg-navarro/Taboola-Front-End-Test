// access list of common words and make a list from those
let commonWordsPage = document.createElement('data');
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://en.wikipedia.org/wiki/Most_common_words_in_English');
xhr.send();

let wordList = [];
xhr.onload = function() {
    // console.log(xhr.response);
    commonWordsPage.innerHTML = xhr.response;
    // access table cells containing common words
    let words = commonWordsPage.querySelectorAll('.wikitable.sortable tbody tr td:first-child a');
    // add each word to list of common words
    for (el of words) {
        let commonWord = el.innerText;
        wordList.push(commonWord);
    }
};


// add additional common words to list of common words
let moreCommonWords = ["are", "is", "where", "was"]
wordList.push(...moreCommonWords)

/* DEFINE FUNCTIONS */

// define function to check if a word is valid with respects to requirements
const isValidWord = (wordIn, commonWordList) => {
    let valid = true;
    // if (wordIn.length < 2 || wordIn in commonWordList) {
    //     valid = false 
    // } else if (Number.isInteger(wordIn)) {
    //     // check if word contains a digit or contains punctuation with regex TODO
    //     // https://stackoverflow.com/questions/13925454/check-if-string-is-a-punctuation-character
    //     valid = false
    // }
    return true
} 


// define function that will map frequencies to words encountered on the page
const mapFrequencies = (commonWords) => {
    let freqCounter = {}
    let fullText = $('body').text()
    // replace all whitespace characters
    const whiteSpace = /(\n|\t)/ig
    fullText.replaceAll(whiteSpace, " ")
    // replace all parenthesis, strip periods and commas
    fullText.replaceAll(".", " ")
    fullText.replaceAll(",", " ")
    fullText.replaceAll("(", " ")
    fullText.replaceAll(")", " ")

    // split text into an array
    let allWords = fullText.split(" ")
    allWords = allWords.filter(word => isValidWord(word, commonWordList))
    let foundWords = new Set(allWords)
    // const words = fullText.split(" ")
    // for (sequence of words) {
    //     if (isValidWord(sequence))
    //         foundWords.add(sequence)
    // }

    for (word of foundWords) {
        const searchPattern = new RegExp(word, ig)
        let count = (fullText.match(searchPattern) || []).length;
        freqCounter.word = count
    }
    
    // for each found word, get it's count and store it in an dictionary
    return freqCounter
}


// create a list of the top 25 most used words
const getMostUsed = (numberWords, freqCounter) => {
    let orderedWords = [];

    for (const key in freqCounter) {
        const wordToPlace = key
        const wordToPlaceCount = freqCounter[wordToPlace]
        if (orderedWords.length === 0)
            orderedWords.push(wordData)
        else {
            let inserted = false
            for (let i = 0; i < orderedWords.length && !inserted; i++) {
                const currentWord = orderedWords[i]
                const currentWordCount = freqCounter[currentWord]
                if (wordToPlaceCount >= currentWordCount) {
                    orderedWords.splice(i, 0, wordToPlace)
                    inserted = true
                } 
            }
            if (inserted === false) {
                orderedWords.push(wordToPlace)
            }
        }
    }
    
    orderedWords.length = 25
    return orderedWords
}


const replaceInstances = (text, newtext) => {
    const regex = new RegExp(text, 'ig')
    $("body").children().each(function() {           
        $(this).html($(this).html().replace(regex, newtext));
    });
}

// run program
// get the body element
// let body = querySelector('body');
let testElement = document.querySelectorAll('#firstHeading') // test
let counter = {}
counter = mapFrequencies(testElement, counter, wordList)


for (const parent of document.querySelectorAll("body *")) {
    for (const child of parent.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        // console.log(child);
        const pattern = /snapshot/ig;
        const replacement = "fuckstick";
        child.textContent.replaceAll(pattern, replacement)
      }
    }
  }