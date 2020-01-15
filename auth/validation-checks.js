function isValidUser(user) {
    const validUsername = typeof user.username == 'string' && user.username.trim() != '' && user.username.trim().length <= 18 && user.username.trim().length >= 3;
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 8 && user.password.trim().length <= 128;

    return validUsername && validPassword;
}

module.exports ={
    isValidUser
}