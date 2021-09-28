
let commonWordsPage = document.createElement('data');
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://en.wikipedia.org/wiki/Most_common_words_in_English');
xhr.send();

xhr.onload = function() {
    // console.log(xhr.response);
    commonWordsPage.innerHTML = xhr.response;
};

let words = commonWordsPage.querySelectorAll('.wikitable.sortable tbody tr td:first-child a');
let wordList = [];

for (el of words) {
    let commonWord = el.innerText;
    wordList.push(commonWord);
}

let moreCommonWords = ["are", "is", "where", "was"]
wordList.push(...moreCommonWords)

// define function to check if a word is valid
const isValidWord = (wordIn, commonWordList) => {
    let valid = true;
    if (wordIn.length < 2 || wordIn in commonWordList) {
        valid = false 
    } else if (Number.isInteger(wordIn)) {
        // check if word contains a digit or contains punctuation with regex TODO
        // https://stackoverflow.com/questions/13925454/check-if-string-is-a-punctuation-character
        valid = false
    }
    return true
} 

// define function that will map frequencies to words encountered on the page
const mapFrequencies = (DOMelement, freqCounter, commonWords) => {
    if ('innerText' in DOMelement) {
        const textContent = DOMelement.innerText.split(' ')
        console.log("got text")
        for (word of textContent) {
            if (isValidWord(word, commonWords)) {
                console.log("valid word")
                if (Object.keys(word)[0] in freqCounter) {
                    freqCounter.word = freqCounter.word + 1
                } else {
                    freqCounter.word = 1
                }
            }
        }
    } 
    
    // recurse to child elements
    for (child of DOMelement.children) {
        // freqCounter = mapFrequencies(child, freqCounter)
        console.log("OMG WE FOUND A CHILD")
    }

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

//for each element on dom tree, print text and then recurse to childen
const recurser = (el) => {
    if (el.innerText) {
        console.log(el.innerText);
    }

    for (c of el.children) {
        recurser(el)
    }
}

// const traverser = (targetWord) => {
//     for (const el of document.querySelectorAll("body *")) {
//         for 
//     }
// }



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

//   const pattern = /(A1|A)/g;
//         const replacement = "<span style='color:#FF0000;'>$1</span>";
//         const subNode = document.createElement("span");
//         subNode.innerHTML = child.textContent.replace(pattern, replacement);
//         parent.insertBefore(subNode, child);
//         parent.removeChild(child);

$("body").children().each(function() {           
    $(this).html($(this).html().replace("Definitions","fuckstrick"));
});

const replaceInstances = (text, newtext) => {
    const regex = new RegExp(text, 'ig')
    $("body").children().each(function() {           
        $(this).html($(this).html().replace(regex, newtext));
    });
}