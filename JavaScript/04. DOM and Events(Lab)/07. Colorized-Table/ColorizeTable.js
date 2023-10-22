function colorize() {
    const rows = Array.from(document.querySelectorAll("tr"));
    for (let i = 0; i < rows.length; i++) {
        if (i % 2 !== 0){
            // let [firstChild, secondChild] = Array.from(rows[i].children);
            // firstChild.style.backgroundColor = 'teal';
            // secondChild.style.backgroundColor = 'teal';
            rows[i].style.backgroundColor = 'Teal';
        };  
    };
}