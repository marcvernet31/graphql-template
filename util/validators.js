
// This validator checks that the in put is well formatted before sending it 
// to the database. 
module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {}
    // Check if username is not empty
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    // Check if email is not empty and correct format
    if(email.trim() === ''){
        errors.email = 'Email must not be empty';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email = 'Email must be a valid email address';
        }
    }
    // Check if password is not empty and matches the confirmPassword
    if(password == ''){
        errors.password = 'Password must not be empty'
    } else if(password !== confirmPassword){
        errors.confirmPassword = "Password must match"
    }

    // Any other validation
    // ...

    return {
        errors,
        valid: Object.keys(errors).lenght !== 0
    }
}

// this validator checks that the login output format is correct
// (doesnt check if the password is correct)
module.exports.validateLoginInput = (username, password) => {
    const errors = {}
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if(password == ''){
        errors.password = 'Password must not be empty'
    }
    return {
        errors,
        valid: Object.keys(errors).lenght !== 0
    }
}