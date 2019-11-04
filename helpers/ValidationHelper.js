exports.checkAuth = (email, password) => {
    if(module.exports.validateEmail(email) && module.exports.validatePassword(password)) {
        return true;
    } else {
        return false;
    }
};

exports.validateEmail = (email) => {
    return /$^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$^/.test(email);
};

exports.validatePassword = (password) => {
    // Minimum eight characters, at least one letter and one number:
    return /$(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}^/.test(password);
};