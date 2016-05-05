console.log('Inició el Legacy API de MyBank');

// Modulos requeridos.
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');

// Variables necesarias para desplegar la aplicación.
var app = express();
var PUERTO = process.env.PORT || 8080;

// Capturar parametros mediante urlencoded para métodos POST.
app.use(bodyParser.urlencoded({extended: true}));

// Configurando el puerto de escuha.
app.listen(PUERTO, function(){
  console.log('Escuchando en el puerto ' + PUERTO);
});

// Se le asigna al archivo routes.js la redirección de rutas.
app.use('/',require('./routes'));
