function passwordValidator(password) {
    const validateLength = (pass) => pass.length >= 6 && pass.length <= 10;
    const onlyLettersAndDigits = (pass) => /^[A-Za-z0-9]+$/g.test(pass);
    const atLeastTwoDigits = (pass) => [...pass.matchAll(/\d/g)].length >= 2;

    isValid = true;

    if (!validateLength(password)) {
        console.log("Password must be between 6 and 10 characters");
        isValid = false;
    };

    if (!onlyLettersAndDigits(password)) {
        console.log("Password must consist only of letters and digits");
        isValid = false;
    };

    if (!atLeastTwoDigits(password)) {
        console.log("Password must have at least 2 digits");
        isValid = false;
    };

    if (isValid) {
        console.log("Password is valid");
    };
}

passwordValidator('logIn')
passwordValidator('MyPass123')
passwordValidator('Pa$s$s')