// teste.js
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('teste');
    console.log('Entrando no site');
});

module.exports = router;
