$(() => {
    $('form').submit((event) => {
        event.preventDefault();
        const user = getUserFromForm();
        $("#loginForm").trigger("reset");
        // console.log('User after getUserFromForm', user);
        login(user).then(result => { // on login success
            // console.log(result);
            showResponseMessage(result.message);
        }).catch(error => {
            // console.error(error)
            showResponseMessage(error.responseJSON.message);
        });
    })
});

function login(user) {
    return $.post(`${AUTH_URL}/login`, user);
}