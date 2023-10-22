function chrToStr (chr1, chr2, chr3){
    let result = chr1 + chr2 + chr3;
    let reverse = result.split('').reverse().join(' ')
    console.log(reverse)
}

chrToStr('a', 'b', 'c')