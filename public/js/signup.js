$(() => {
    $('form').submit((event) => {
        event.preventDefault();
        const user = getUserFromForm();
        $("#signUpForm").trigger("reset");
        // console.log('User after getUserFromForm', user);
        signup(user).then(result => { // on signup success
            // console.log(result);
            showResponseMessage(result.message);
        }).catch(error => {
            // console.error(error)
            showResponseMessage(error.responseJSON.message);
        });
    })
});

function signup(user) {
    return $.post(`${AUTH_URL}/signup`, user);
}