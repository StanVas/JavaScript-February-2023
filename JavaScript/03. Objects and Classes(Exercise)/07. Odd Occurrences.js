function oddExtractor(words) {
    let wordsArr = words.toLowerCase().split(' ');
    let wordsObj = {};

    for (let i = 0; i < wordsArr.length; i++) {
        let word = wordsArr[i];
        if (!(word in wordsObj)){
            wordsObj[word] = 1;
        } else if (word in wordsObj) { 
            wordsObj[word] += 1;
        };  
    }
    // for (const word of wordsArr) {
    //     if (!(word in wordsObj)){
    //         wordsObj[word] = 1
    //     } else if (word in wordsObj) { 
    //         wordsObj[word] += 1
    //     }       
    // }

    let output = [];

    for (const word in wordsObj) {
        if (wordsObj[word] % 2 !== 0)
            output.push(word);
        };

    console.log(...output);  
}


// // from colleague
// function oddExtractor(text){
//     let result = [];
//     let words = text.toLowerCase().split(' ');

//     for (let word of words){
//         let occurs = 0;
//         for (let i = 0; i < words.length; i++) {
//             if (words[i] === word)
//                 occurs++;
//         };
//         if (occurs % 2 !== 0 && !result.includes(word))
//             result.push(word)
//     }

//     console.log(...result)
// }

oddExtractor('Java C# Php PHP Java PhP 3 C# 3 1 5 C#')
oddExtractor('Cake IS SWEET is Soft CAKE sweet Food')