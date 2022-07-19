require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const upload = require('express-fileupload');
const ejs = require('ejs');
const path = require('path');

//Variables globales
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Midleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Rutas
const usuario = require('./routes/Usuario.js');
const login = require('./routes/Login');
const Productos = require('./routes/Productos');
const Cliente = require('./routes/Cliente');
const Promociones = require('./routes/Promociones');

//Llamada a las rutas
app.use('/api/usuarios', usuario);
app.use('/api/login', login);
app.use('/productos', Productos);
app.use('/clientes', Cliente);
app.use('/promociones', Promociones);



//Llamada a la app
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
