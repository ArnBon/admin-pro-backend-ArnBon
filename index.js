require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config'); // esto viene de la clase 100 
const cors = require('cors');


//crear el servidor de express
//  const app = express();
const app = new express();

//cors es un middleware que se ejecuta desde aqui haciea abajo
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
    // console.log('Servidor corriendo en puerto ' + 3000)
    console.log('Servidor corriendo en puerto ' + process.env.PORT)
});