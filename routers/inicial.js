const express = require('express');
const router = express.Router();
const connection = require('../models/db');

router.get('/', (req, res) => {
    const userId = req.session.userId; // Supondo que você tenha armazenado o ID do usuário na sessão
    const sql = `SELECT email FROM paciente WHERE id = ?`;

    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            res.cookie('email', null); // Define o cookie como nulo em caso de erro
            res.render('inicial', { email: null }); // Renderiza a página inicial com email como null em caso de erro
            return;
        }

        if (results.length > 0) {
            const email = results[0].email;
            res.cookie('email', email); // Define o cookie com o email do usuário
            res.render('inicial', { email: email }); // Renderiza a página inicial com o email do usuário
        } else {
            console.error('Usuário não encontrado');
            res.cookie('email', null); // Define o cookie como nulo se o usuário não for encontrado
            res.render('inicial', { email: null }); // Renderiza a página inicial com email como null se o usuário não for encontrado
        }
    });
});

module.exports = router;
