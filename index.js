const express = require('express');
require('dotenv').config();
var cors = require('cors');

const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

//cors
app.use( cors() );

// Carpeta pública
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//bd
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuariosRoute') );
app.use('/api/login', require('./routes/authRoute') );
app.use('/api/hospitales', require('./routes/hospitalesRoute'));
app.use('/api/medicos', require('./routes/medicosRoute'));
app.use('/api/todo', require('./routes/busquedasRoute'));
app.use('/api/upload', require('./routes/uploadsRoute'));






app.listen(3000, () => {
    console.log('Servidor corriendo en puerto ' + 3000)
});