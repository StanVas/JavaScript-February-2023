function roadRadar(speed, area) {
    let status = '';
    let speedLimit = 0;
    let overSpeed = 0;

    switch (area) {
        case 'motorway':
            speedLimit = 130;
            if (speed > speedLimit) {
                overSpeed = speed - speedLimit;
            }
            break;

        case 'interstate':
            speedLimit = 90;
            if (speed > speedLimit) {
                overSpeed = speed - speedLimit;
            }
            break;

        case 'city':
            speedLimit = 50;
            if (speed > speedLimit) {
                overSpeed = speed - speedLimit;
            }
            break;

        case 'residential':
            speedLimit = 20;
            if (speed > speedLimit) {
                overSpeed = speed - speedLimit;
            };
    };

    if (overSpeed > 0) {
        if (overSpeed <= 20) {
            status = 'speeding';
        } else if (20 < overSpeed && overSpeed <= 40) {
            status = 'excessive speeding';
        } else {
            status = 'reckless driving';
        };
        console.log(`The speed is ${overSpeed} km/h faster than the allowed speed of ${speedLimit} - ${status}`);
    } else {
        console.log(`Driving ${speed} km/h in a ${speedLimit} zone`);
    };
}

roadRadar(40, 'city')
roadRadar(21, 'residential')
roadRadar(120, 'interstate')
roadRadar(200, 'motorway')