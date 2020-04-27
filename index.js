const express = require('express');
const handlebars = require('express-handlebars');
const controlador = require('./routes/controlador.js')
const handlers_ln = require('./lib/handlers/handlers_ln.js')
const app = express()

app.set('view engine','handlebars');
app.engine('handlebars',handlebars({
    defaultLayout:'principal'
}));

app.use(express.urlencoded({
    extended:false
}));
app.use(express.json())
app.use(express.static(__dirname + '/'))
app.use('/',controlador)
app.use(handlers_ln.atiende404);
app.use(handlers_ln.atiende500);

app.listen(3000,()=>{console.log('Escuchando...')})