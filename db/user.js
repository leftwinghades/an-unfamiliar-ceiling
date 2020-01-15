const db = require('./index.js');

module.exports = {
    getOneByUsername: function (username) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = $1', [username], (err, res) => {
                if (err) {
                    console.log('From /auth/user.js reject getOneByUsername =>', err.stack);
                    reject(0);
                } else {
                    console.log('From /auth/user.js resolve getOneByUsername =>', res.rows[0]);
                    resolve(res.rows[0]);
                };
            });
        });
    },

    createUser: function (userDetails) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (username, password, date_created, ip_when_created) VALUES ($1, $2, $3, $4)', [userDetails.username, userDetails.password, userDetails.date_created, userDetails.ip_when_created], (err, res) => {
                if (err) {
                    console.log('From /auth/user.js reject createUser =>', err.stack);
                    reject(0);
                } else {
                    console.log('From /auth/user.js resolve createUser =>', res)
                    resolve();
                };
            });
        });
    },

    updateLastVisit: function (userDetails) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE users SET date_of_last_visit = $2, ip_of_last_visit = $3 WHERE id = $1', [userDetails.id, userDetails.date_of_last_visit, userDetails.ip_of_last_visit], (err, res) => {
                if (err) {
                    console.log('From /auth/user.js reject updateLastVisit =>', err.stack);
                    reject(0);
                } else {
                    console.log('From /auth/user.js resolve updateLastVisit =>', res)
                    resolve();
                };
            });
        });
    }
};