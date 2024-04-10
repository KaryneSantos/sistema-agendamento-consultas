const express = require('express');

const app = express;

app.use(express.json());

function validarCPF(cpf){
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
}

function validarDataNascimento(data){
    const dataNascimento = new Date(data);
    const dataAtual = new Date();
    return dataNascimento < dataAtual;
}

const sexo = [
    'Masculino',
    'Feminino'
]


app.post('/registrar', (req, res) => {
    const {nome, cpf, data_nascimento, sexo, email, senha, confimacao_senha} = req.body;

    let error = null;

    if(!nome, !cpf, !data_nascimento, !sexo, !email, !senha, !confimacao_senha) {
        error = {msg:'Por favor, preencha todos os campos obrigatórios.'};
    }

    if(nome && nome.length < 3){
        error = {msg: 'Seu nome deve conter no mínimo 3 caracteres'}
    } else if(!validarCPF(cpf)){
        error = {msg: 'CPF inválido'};
    } else if(!validarDataNascimento(data_nascimento)){
        error  = {msg: 'Data de Nascimento inválido'}
    } else if(sexo.includes(sexo)){
        error = {msg: 'Sexo inválido'}
    } else if(email === ""){
        error = {msg: 'Email inválido'}
    }
});
