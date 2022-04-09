/* DEFINE FUNCTIONS */

// define function to check if a word is valid with respects to requirements
const isValidWord = (wordIn, commonWordList) => {
    let valid = true;
    if (wordIn.length < 2) {
        valid = false
    } else if (commonWordList.includes(wordIn) || /\d/.test(wordIn)) {
        valid = false
    } else {
        let index = 0
        while (index < wordIn.length && valid) {
            let asciiCode = wordIn.charCodeAt(index)
            if (asciiCode < 65 || asciiCode > 122) {
                valid = false
            }
            index++ 
        }
    }
    return valid
} 


// define function that will map frequencies to words encountered on the page
const mapFrequencies = (commonWords) => {
    let freqCounter = [] // return value, will contain objects with data for the word and its frequency
    let fullText = $('body').text() // get all text from the page
    // replace all 'exotic' whitespace characters with spaces
    const whiteSpace = /(\n|\t|\v|\r|\f)/g
    fullText = " ".concat(fullText.replaceAll(whiteSpace, " "), " ")
    // replace all parenthesis, periods, commas, etc.
    const punctuation = /[?.,"'\[\]\(\)]/g  
    fullText = fullText.replaceAll(punctuation, " ")

    // split text into an array of words
    let allWords = fullText.split(/[ ]+/)
    // get rid of invalid word choices and convert to lowercase
    allWords = allWords.filter(word => isValidWord(word.toLowerCase(), commonWords)).map(word => word.toLowerCase());
    for (let i = 0; i < allWords.length; i++) {
        allWords[i] = allWords[i].trim() // remove leading and trailing spaces
    }
    let foundWords = new Set(allWords) // get rid of duplicate records
    // make an array of objects, each giving data on a word and it's frequency
    foundWords.forEach((word) => {
        // determine the number of times a word appears in the full text
        let count = allWords.filter(x => x === word).length 
        // create object, map to array
        let record = {"word": word, "count": count}
        freqCounter.push(record)
    })

    return freqCounter
}

// create a list of the top 25 most used words
// in the case of a tie more than 25 records may be returned
const getMostUsed = (numberWords, frequencies) => {
    // sort array so that most frequent come first
    let orderedWords = frequencies.sort((a, b) => b.count-a.count)
    let numberElements = numberWords
    // if there is a tie for the top 'numberWords' words, add additional records
    while (orderedWords[numberElements].count === orderedWords[numberElements+1].count) {
        numberElements++
    }
    orderedWords.length = numberElements // truncate array
    return orderedWords
}

// given a word 'text', find and replace it with the string 'newText'
const replaceInstances = (text, newtext) => {
    // only replace on word boundaries, and not abutting hyphens
    const query = "(?<!-)\\b".concat(text, "(?!-)\\b")
    const regex = new RegExp(query, 'ig')
    $("body").children().each(function() {           
        $(this).html($(this).html().replace(regex, newtext));
    });
}

// RUN PROGRAM
// access list of common words and make a list from those
let commonWordsPage = document.createElement('data'); // TODO remove
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://en.wikipedia.org/wiki/Most_common_words_in_English');
xhr.send();

let wordList = [];
xhr.onload = function() {
    commonWordsPage.innerHTML = xhr.response;
    // access table cells containing common words
    let words = commonWordsPage.querySelectorAll('.wikitable.sortable tbody tr td:first-child a');
    // add each word to list of common words
    for (el of words) {
        let commonWord = el.innerText;
        wordList.push(commonWord);
    }
    // add additional common words to list of common words
    let moreCommonWords = ["are", "is", "where", "was"]
    wordList.push(...moreCommonWords)
    // count word frequency
    let counter = mapFrequencies(wordList)
    // get the 25 most used words
    let mostCommonWords = getMostUsed(25, counter)
    // for each of the most used words, replace it with it's frequency
    for (let i = 0; i < mostCommonWords.length; i++) {
        // console.log(i + " " + counter[i].word) // print out most common words to console
        replaceInstances(counter[i].word, counter[i].count)
    }
};
