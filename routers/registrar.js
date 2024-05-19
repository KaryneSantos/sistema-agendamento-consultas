const express = require('express');
const router = express.Router();
const { validarCPF, validarDataNascimento } = require('../controllers/cadastroController');
const connection = require('../models/db');

router.get('/', (req, res) => {
    const tipo_usuario = req.query.tipo_usuario;
    console.log('tipo:', tipo_usuario);
    res.render('registro', { tipo_usuario });
})

router.post('/', (req, res) => {
    console.log('Coletando dados dos usuários...');

    const { nome, cpf, data_nascimento, sexo, email, senha, confirmacao_senha, termo_condicoes } = req.body;
    console.log('Nome:', nome);
    console.log('CPF:', cpf);
    console.log('Data nascimento:', data_nascimento);
    console.log('Sexo:', sexo);
    console.log('Email:', email);
    console.log('Senha:', senha);
    console.log('Confirmação senha:', confirmacao_senha);
    console.log('Tipo usuário:', tipo_usuario);
    console.log('Termo de condições:', termo_condicoes);

    let error = null;

    if (!termo_condicoes) {
        error = 'Você deve concordar com os termos de condições.';
    } else if (nome === "" || cpf === "" || email === "" || senha === "" || confirmacao_senha === "") {
        error = 'Campos obrigatórios não preenchidos.';
    } else if (nome.length < 3 || nome.length > 50) {
        error = 'Nome inválido, tente novamente.';
    } else if (!validarCPF(cpf)) {
        error = 'CPF inválido, tente novamente.';
    } else if (!validarDataNascimento(data_nascimento)) {
        error = 'Data de nascimento inválida, tente novamente.';
    } else if (senha !== confirmacao_senha) {
        error = 'Senhas não coincidem.';
    }

    if (error) {
        res.render('registro', { error, nome, cpf, data_nascimento, sexo, email, senha, confirmacao_senha, termo_condicoes, tipo_usuario });
        return;
    }

    const usuarioSql = `INSERT INTO usuarios (nome_completo, data_nascimento, sexo, email, tipo_usuario, senha) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(usuarioSql, [nome, data_nascimento, sexo, email, tipo_usuario, senha], (err, result) => {
        if (err) {
            console.error('ERROR ao registrar usuário: ', err);
            res.render('registro', { error: 'ERROR ao registrar usuário.' });
            return;
        }

        console.log('Usuário registrado com sucesso');

        if (tipo_usuario === 'Paciente') {
            const pacienteSql = `INSERT INTO pacientes (usuario_id, cpf) VALUES (?, ?)`;
            connection.query(pacienteSql, [result.insertId, cpf], (err, resultPaciente) => {
                if (err) {
                    console.error('ERROR ao registrar paciente: ', err);
                    res.render('registro', { error: 'ERROR ao registrar paciente.' });
                    return;
                }
                console.log('Paciente registrado com sucesso');
            });
        }

        res.redirect('/login');
    });
});

module.exports = router;
