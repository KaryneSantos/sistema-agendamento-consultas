// teste.js
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('inicial');
    console.log('Entrando no site..');
});

module.exports = router;
