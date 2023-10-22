function solve(input) {
    class Songs {
        constructor(typeList, name, time) {
            this.typeList = typeList;
            this.name = name;
            this.time = time;
        };

        // printFunc() {
        //     console.log(this.name);
        // };
    };

    // let songs = [];
    // let endIndex = input[0] + 1;
    // let keyList = input[endIndex];
    
    // for (let index = 1; index < endIndex; index++) {
    //     let [type, name, time] = input[index].split('_');
    //     if (keyList === type | keyList === 'all') {
    //         songs.push(new Songs(type, name, time));
    //     };
    // };

    // for (const song of songs) {
    //     console.log(song.name)
    // };

    let songs = [];
    let numberOfSongs = input.shift();
    let typeSong = input.pop();

    for (let i = 0; i < numberOfSongs; i++){
        let [type, name, time] = input[i].split('_');
        let song = new Songs(type, name, time);
        songs.push(song);
    };

    if (typeSong === 'all') {
        songs.forEach((s) => console.log(s.name));
    } else {
        let filtered = songs.filter((s) => s.typeList === typeSong);
        filtered.forEach((s) => console.log(s.name));
    };  
}

solve([3,
    'favourite_DownTown_3:14',
    'favourite_Kiss_4:16',
    'favourite_Smooth Criminal_4:01',
    'favourite'])

solve([4,
    'favourite_DownTown_3:14',
    'listenLater_Andalouse_3:24',
    'favourite_In To The Night_3:58',
    'favourite_Live It Up_3:48',
    'listenLater'])

solve([2,
    'like_Replay_3:15',
    'ban_Photoshop_3:48',
    'all'])