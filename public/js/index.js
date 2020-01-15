const API_URL = getHostURL();
const AUTH_URL = `${API_URL}/auth`;
// console.log(AUTH_URL);

function getHostURL() {
    if (window.location.host.indexOf('localhost') != -1) {
        return 'http://localhost:3000'; //development
    } else {
        return 'https://anunfamiliarceiling.com'; // production
    };
};

function getUserFromForm() {
    const username = $('#username').val();
    const password = $('#password').val();
    const user = {
        username,
        password
    };
    return user;
};

function showResponseMessage(message) {
    const $responseMessage = $('#responseMessage');
    $responseMessage.text(message);
    $responseMessage.show();
}
