// access list of common words and make a list from those
let commonWordsPage = document.createElement('data');
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
};


// add additional common words to list of common words
let moreCommonWords = ["are", "is", "where", "was"]
wordList.push(...moreCommonWords)

/* DEFINE FUNCTIONS */

// define function to check if a word is valid with respects to requirements
const isValidWord = (wordIn, commonWordList) => {
    let valid = true;
    if (wordIn.length < 2) {
        valid = false
    } else if (commonWordList.includes(wordIn)) {
        valid = false
    } else if (/\d/.test(wordIn)) {
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
    let freqCounter = []
    let fullText = $('body').text()
    // replace all whitespace characters
    const whiteSpace = /(\n|\t|\v|\r|\f)/g
    fullText = " ".concat(fullText.replaceAll(whiteSpace, " "), " ")
    // replace all parenthesis, strip periods and commas
    const punctuation = /[|?+=_.,"';:\[\]]/g  
    fullText = fullText.replaceAll(punctuation, " ")
    fullText = fullText.replaceAll("(", " ")  // TODO add to punctuation regex for all of these
    fullText = fullText.replaceAll(")", " ")
    fullText = fullText.replaceAll("-", " ")
    fullText = fullText.replaceAll("*", " ")

    // split text into an array
    let allWords = fullText.split(/[ ]+/)
    allWords = allWords.filter(word => isValidWord(word.toLowerCase(), commonWords)).map(word => word.toLowerCase());
    for (let i = 0; i < allWords.length; i++) {
        allWords[i] = allWords[i].trim()
    }
    let foundWords = new Set(allWords)

    foundWords.forEach((word) => {
        try {
            let count = allWords.filter(x => x === word).length
            let record = {"word": word, "count": count}
            freqCounter.push(record)
        } catch(e) {
            foundWords.delete(word)
        }
    })

    return freqCounter
}

// create a list of the top 25 most used words
const getMostUsed = (numberWords, frequencies) => {
    let orderedWords = frequencies.sort((a, b) => b.count-a.count)
    let numberElements = numberWords
    while (orderedWords[numberElements].count === orderedWords[numberElements+1].count) {
        numberElements++
    }
    orderedWords.length = numberElements
    return orderedWords
}


const replaceInstances = (text, newtext) => {
    const query = "\\b".concat(text, "\\b")
    const regex = new RegExp(query, 'ig')
    $("body").children().each(function() {           
        $(this).html($(this).html().replace(regex, newtext));
    });
}



// run program -- after wordList is loaded
let counter = mapFrequencies(wordList)
let mostCommonWords = getMostUsed(25, counter)

for (let i = 0; i < mostCommonWords.length; i++) {
    replaceInstances(counter[i].word, counter[i].count)
}