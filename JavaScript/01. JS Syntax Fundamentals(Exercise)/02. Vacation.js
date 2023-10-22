function calcPrice(group, type, day) {
    let result = 0;

    switch (type) {
        case 'Students':
            if (day === 'Friday') {
                result = group * 8.45;
            } else if (day === 'Saturday') {
                result = group * 9.80;
            } else if (day === 'Sunday') {
                result = group * 10.46;
            };

            if (group >= 30) {
                result *= 0.85;
            }
        break;

        case 'Business':
            if (group >= 100) {
                group -= 10;
            }

            if (day === 'Friday') {
                result = group * 10.90;
            } else if (day === 'Saturday') {
                result = group * 15.60;
            } else if (day === 'Sunday') {
                result = group * 16;
            };
        break;

        case 'Regular':
            if (day === 'Friday') {
                result = group * 15;
            } else if (day === 'Saturday') {
                result = group * 20;
            } else if (day === 'Sunday') {
                result = group * 22.50;
            };

            if (10<= group && group <= 20) {
                result *= 0.95;
            }
        break;  
    }

    console.log(`Total price: ${result.toFixed(2)}`);

}

calcPrice(30, 'Students', 'Sunday')
calcPrice(40, 'Regular', 'Saturday')