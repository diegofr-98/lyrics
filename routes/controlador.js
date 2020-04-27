const express = require('express')
const controlador = express.Router()
const handlers_ln = require('../lib/handlers/handlers_ln.js')

controlador.get('/',handlers_ln.buscadorEventos)

module.exports = controlador