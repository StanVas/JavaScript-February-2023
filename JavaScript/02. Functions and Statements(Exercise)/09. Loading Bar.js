function loadingBar(number){
    let num = number / 10;
    if (number === 100){
        console.log(`100% Complete!`);
        console.log(`[${'%'.repeat(num)}]`);
    } else {
        console.log(`${number}% [${'%'.repeat(num)}${'.'.repeat(10-num)}]`);
        console.log(`Still loading...`);
    };
}


loadingBar(30)
loadingBar(50)
loadingBar(100)