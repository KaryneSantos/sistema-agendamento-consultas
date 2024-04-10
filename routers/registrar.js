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

router.post('/', (req, res) => {
    console.log('Coletando dados...');
    const { nome, cpf, data_nascimento, sexo, email, senha, confirmacao_senha } = req.body;

    console.log('Nome: ', nome);
    console.log('CPF: ', cpf);
    console.log('Data nascimento: ', data_nascimento);
    console.log('Sexo: ', sexo);
    console.log('Email: ', email);
    console.log('Senha: ', senha);
    console.log('Confirmação de senha: ', confirmacao_senha);

    // Inicio das validações

    let errors = [];

    if (!nome || !cpf || !data_nascimento || !sexo || !email || !senha || !confirmacao_senha) {
        errors.push({ msg: 'Por favor, preencha todos os campos obrigatórios.' });
    } else if (nome && nome.length < 3) {
        errors.push({ msg: 'Seu nome deve conter no mínimo 3 caracteres' });
    } else if (!validarCPF(cpf)) {
        errors.push({ msg: 'CPF inválido' });
    } else if (!validarDataNascimento(data_nascimento)) {
        errors.push({ msg: 'Data de Nascimento inválida' });
    } else if (!sexosValidos.includes(sexo)) {
        errors.push({ msg: 'Sexo inválido' });
    } else if (email === "") {
        errors.push({ msg: 'Email inválido' });
    } else if (senha !== confirmacao_senha) {
        errors.push({ msg: 'As senhas não correspondem' });
    } else if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Se todas as validações passarem, você pode prosseguir com o registro do usuário no banco de dados.
    const sql = 'INSERT INTO pacientes (cpf, nome_completo, data_nascimento, sexo, email, senha) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [cpf, nome, data_nascimento, sexo, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao registrar usuário:', err);
            return res.status(500).json({ msg: 'Erro ao registrar usuário' });
        }
        console.log('Usuário registrado com sucesso');
        res.redirect('index');
    });
});

module.exports = router;