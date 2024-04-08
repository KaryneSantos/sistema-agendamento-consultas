const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));

const indexRouters = require('./routers/index');
app.use('/', indexRouters);

const registrerRouters = require('./routers/registrar');
app.use('/registrar', registrerRouters);

const loginRouters = require('./routers/login');
app.use('/login', loginRouters);

const especRouters = require('./routers/especialidade');
app.use('/especialidade', especRouters);

const contateRouters = require('./routers/contate');
app.use('/contato', contateRouters);

const renovarReceitaRouters = require('./routers/receita');
app.use('/renovacao-de-receita', renovarReceitaRouters);

const pagueReceitaRouters = require('./routers/paga');
app.use('/pages', pagueReceitaRouters);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});