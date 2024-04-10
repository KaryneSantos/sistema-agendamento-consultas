const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.bcdd_host,
    user: process.env.bcdd_user,
    port: process.env.bcdd_port,
    password: process.env.bcdd_password,
    database: process.env.bcdd_database
});

connection.connect(err => {
    if(err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }

    console.log('Conexão bem-sucedida ao banco de dados');
});

module.exports = connection;