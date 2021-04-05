import express from 'express';
import router from './routes/auth.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './db/db-connection.js';
import path, { dirname } from 'path';


// toma la configuracion de mi archivo .env cuando mi servidor cargue
dotenv.config();
// console.log(process.env); // ver video 363 para explicacion de proccess.env



// Crear el server
const app = express();

dbConnection();

// Middleware para establecer el directorio publico
app.use(express.static('src/public'));

// Middleware Cors
app.use(cors());

// Middleware para lectura y parseo del body
app.use(express.json());
// app.use(express.urlencoded( {extended: true} ));

// Middleware de Rutas
app.use('/api/auth', router);


// MIDDLEWARE PARA MANEJAR LAS DEMAS RUTAS, EN ESTE CASO LAS DE ANGULAR (Nuestro build lo pusimos en la carpeta publica)
app.get('*', ( req, res ) => {
    // aqui no me funcionaba usar __dirname, no se si sea porque no uso CommonJS, pero lo arregle con dirname('') o sin eso
    // res.sendFile( path.resolve(dirname(''), 'src/public/index.html') );
    res.sendFile( path.resolve('src/public/index.html') );
});


app.listen( process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}!!!`);
    // const abc =  path.resolve('src/public/index.html');
    // console.log(abc);
});

