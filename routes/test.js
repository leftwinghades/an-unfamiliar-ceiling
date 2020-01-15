const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('on /test')
})

router.get('/specs', (req, res) => {
    res.send('on /test/specs')
})



module.exports = router;