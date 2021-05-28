export function capitalizeWord(words){
    const wordArray = words.split(' ')
    const capitalizedWordArray = wordArray.map(word => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    return capitalizedWordArray.join(' ')
}
