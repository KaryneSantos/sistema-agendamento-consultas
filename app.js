const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(cookieParser());
app.use(session({
    secret: 'sua_chave_secreta_aqui',
    resave: false,
    saveUninitialized: false
}));

const indexRouters = require('./routers/index');
app.use('/', indexRouters);

const registrarRouters = require('./routers/registrar');
app.use('/registrar', registrarRouters);

const registrarMedRouters = require('./routers/registrarMed');
app.use('/registrarMed', registrarMedRouters);

const pergRegistroRouters = require('./routers/pergRegistro');
app.use('/pergRegistro', pergRegistroRouters);

const loginRouters = require('./routers/login');
app.use('/login', loginRouters);

const especRouters = require('./routers/especialidade');
app.use('/especialidade', especRouters);

const contateRouters = require('./routers/contate');
app.use('/contato', contateRouters);

const inicialRouter = require('./routers/inicial');
app.use('/inicial', inicialRouter);

const listaConsultasRouters = require('./routers/listaConsultas');
app.use('/listaConsultas', listaConsultasRouters);

const logoutRouters = require('./routers/logout');
app.use('/logout', logoutRouters);
    // const agendarRouter = require('/routers/agendar');
    // app.use('/agendar', agendarRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});