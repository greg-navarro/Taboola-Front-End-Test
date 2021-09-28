
let commonWordsPage = document.createElement('data');
let xhr = new XMLHttpRequest();
xhr.open('get', 'https://en.wikipedia.org/wiki/Most_common_words_in_English');
xhr.send();

xhr.onload = function() {
    console.log(xhr.response);
    commonWordsPage.innerHTML = xhr.response;
};

var x = document.getElementsByClassName("wikitable sortable");
x[0]


let words = document.querySelectorAll('.wikitable.sortable.jquery-tablesorter tbody tr td:first-child a');
let wordList = []

for (el of words) {
    let commonWord = el.innerText;
    wordList.push(commonWord)
}

let moreCommonWords = ["are", "is", "where", "was"]
wordsList.push(...moreCommonWords)

