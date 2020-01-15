const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// routes
const testRoute = require('./routes/test'); // test router for later use
const authRoute = require('./auth');
const authorizedRoute = require('./routes/authorized');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());
app.use('/auth', authRoute);
app.use('/authorized', authorizedRoute);
app.use('/test', testRoute); // test router for later use
app.use(express.static('public')); // serves static files in /public

// 404 page not found
app.get('*', function (req, res) {
    res.status(404).sendFile('404.html', { root: __dirname });
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

// setting up the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
});