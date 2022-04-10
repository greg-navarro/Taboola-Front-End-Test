getCommonWords(25);

// Retrieves a list of the most commonly used words in the English language.
// Words are retrieved from the wikipedia page at https://en.wikipedia.org/wiki/Most_common_words_in_English.
// An array containing these words and several other common words are returned.
function getCommonWords(numberWords) {
    let commonWords = [];
    let commonWordsPage;
    // const requestOptions = {
    //     method: 'GET',
    //     mode: 'cors',
    //     cache: 'no-cache',
    // };
    fetch('https://en.wikipedia.org/wiki/Most_common_words_in_English') //, requestOptions)
        .then(response => response.text())
        .then(rt => console.log(rt))
    // console.log(commonWordsPage);
}

// .body)
// .then(rb => rb.text())