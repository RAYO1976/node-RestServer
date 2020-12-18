const express = require('express');

//inicializa o carga express
const app = express();


//se le indican a express las RUTAS que se van a usar.
app.use(require('./usuario'));

//le indicamos tambien las rutas que hemos indicado en el fichero login.js para que funcionen las peticiones /login
app.use(require('./login'));


module.exports = app;