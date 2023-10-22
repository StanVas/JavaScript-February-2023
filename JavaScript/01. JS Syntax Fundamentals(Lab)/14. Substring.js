function substring(text, startIdx, count) {
    let endIdx = 0;

    if (startIdx + count > text.length){
        endIdx = text.length;
    } else {
        endIdx = count + startIdx;
    };

    result = text.slice(startIdx, endIdx);

    console.log(result);
}

substring('ASentence', 1, 8)
substring('SkipWord', 4, 7)