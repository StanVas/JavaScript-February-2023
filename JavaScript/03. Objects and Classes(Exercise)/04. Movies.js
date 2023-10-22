function movies(input) {
    let moviesArr = [];

    for (const line of input) {
        if (line.includes('addMovie')) {
            let currentLine = line.split(' ');
            let currentMovie = '';

            for (let i = 1; i < currentLine.length; i++) {
                if (i > 1) {
                    currentMovie += ' ' + currentLine[i];
                } else {
                    currentMovie += currentLine[i];
                };
            };
            moviesArr.push({ name: currentMovie });
        };

        if (line.includes('directedBy')) {
            let currentLine = line.split(' ');
            let currentMovie = '';
            let currentIndex = currentLine.indexOf('directedBy');
            let currentDirector = ''

            for (let i = 0; i < currentIndex; i++) {
                if (i > 0) {
                    currentMovie += ' ' + currentLine[i];
                } else {
                    currentMovie += currentLine[i];
                };
            };

            for (let i = currentIndex + 1; i < currentLine.length; i++) {
                if (currentDirector.length > 0) {
                    currentDirector += ' ' + currentLine[i];
                } else {
                    currentDirector += currentLine[i];
                };
            };

            for (const movie of moviesArr) {
                const keys = Object.keys(movie);
                for (const key of keys) {
                    if (movie[key] === currentMovie) {
                        movie.director = currentDirector;
                    };
                };
            };
        };

        if (line.includes('onDate')) {
            let currentLine = line.split(' ');
            let currentIndex = currentLine.indexOf('onDate');
            let currentMovie = ''
            let currentDate = currentLine[currentLine.length - 1];

            for (let i = 0; i < currentIndex; i++) {
                if (i > 0) {
                    currentMovie += ' ' + currentLine[i];
                } else {
                    currentMovie += currentLine[i];
                };

                for (const movie of moviesArr) {
                    const keys = Object.keys(movie);
                    for (const key of keys) {
                        if (movie[key] === currentMovie) {
                            movie.date = currentDate;
                        };
                    };
                };
            };
        };
    };

    for (let movie of moviesArr) {
        if ('name' in movie && 'date' in movie && 'director' in movie){
            console.log(JSON.stringify(movie));
        };
    };
}

movies([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
])

movies([
    'addMovie The Avengers',
    'addMovie Superman',
    'The Avengers directedBy Anthony Russo',
    'The Avengers onDate 30.07.2010',
    'Captain America onDate 30.07.2010',
    'Captain America directedBy Joe Russo'
])