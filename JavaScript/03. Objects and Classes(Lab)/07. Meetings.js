function meeting(input) {
    let meetingsPlan = {};

    for (const line of input) {
        let [day, name] = line.split(' ');

        if (day in meetingsPlan) {
            console.log(`Conflict on ${day}!`);
        } else {
            meetingsPlan[day] = name;
            console.log(`Scheduled for ${day}`);
        };      
    };

    for (const day in meetingsPlan) {
        console.log(`${day} -> ${meetingsPlan[day]}`);
    };
}

meeting(['Monday Peter',
'Wednesday Bill',
'Monday Tim',
'Friday Tim'])