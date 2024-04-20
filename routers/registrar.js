const express = require('express');
const router = express.Router();
const {validarCPF, validarDataNascimento} = require('../controllers/cadastroController');

router.get('/', (req, res) => {
    res.render('registro');
});

const sexosValidos = [
    'Masculino',
    'Feminino'
]



module.exports = router;