const express = require('express');
const router = express.Router();
const connection = require('../models/db');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    console.log('Verificando dados dos usuários...');

    const {email, senha} = req.body;

    console.log('Email:', req.body.email);
    console.log('Senha:', req.body.senha);

    let error = null;

    if(email === '' || senha === '') {
        error = 'Campos obrigátorios! Tente novamente';
    }

    if (error) {
        res.status(400).json({ error: error }); // Responder com status 400 e a mensagem de erro
        return; // Retorna aqui para evitar continuar o processamento
    }

    const sql = `SELECT email, senha FROM paciente WHERE email = ? AND senha = ?`
    connection.query(sql, [email, senha], (err, result) => {
        if(err) {
            console.error('ERROR ao fazer Login de usuário: ', err);
            res.render('login', {error: 'ERROR ao fazer Login de usuário.'});
            return;
        }
        if(result.length === 0) {
            // Nenhum usuário encontrado com as credenciais fornecidas
            error = 'Credenciais inválidas';
            res.status(400).json({ error: error });
            return;
        }

        console.log('Usuário Logado com sucesso');
        res.redirect('/inicial');
    })

});

module.exports = router;