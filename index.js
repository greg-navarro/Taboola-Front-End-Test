let words = getCommonWords(25);

// Retrieves a list of the most commonly used words in the English language.
// Words are retrieved from the wikipedia page at https://en.wikipedia.org/wiki/Most_common_words_in_English.
// An array containing these words and several other common words are returned.
async function getCommonWords(numberWords) {
    let commonWords = [];
    let commonWordsPage = document.createElement("data");
    commonWordsPage = await fetch('https://en.wikipedia.org/wiki/Most_common_words_in_English') //, requestOptions)
        .then(response => commonWordsPage.innerHTML = response)
    console.log(commonWordsPage);

    // access table cells containing common words
    let words = commonWordsPage.querySelectorAll('.wikitable.sortable tbody tr td:first-child a');
    // add each word to list of common words
    for (el of words) {
        let commonWord = el.innerText;
        wordList.push(commonWord);
    }

    return commonWords;
}
