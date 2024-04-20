const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('listaConsultas');
});


module.exports = router;