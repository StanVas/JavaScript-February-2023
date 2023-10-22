function palindromes(numbers){
    result = numbers.forEach(num => {
        reversedNum = Number(String(num).split('').reverse().join(''));
        
        console.log(reversedNum === num);
    });
}


palindromes([123,323,421,121])