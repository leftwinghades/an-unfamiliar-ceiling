const express = require('express');
const path = require('path')
const checkAuth = require('../auth/check-auth');
const router = express.Router();


router.get('/', checkAuth, (req, res) => {
    res.sendFile('authorized.html', { root: path.join(__dirname, '../private') });
});

router.get('/sike', (req, res) => {
    res.send('on /authorized/sike');
});



module.exports = router;