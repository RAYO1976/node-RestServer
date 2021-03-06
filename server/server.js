//se está imporando el fichero de configuración y ejecutando lo que tiene
require('./config/config.js');


const express = require('express')

const bodyParser = require('body-parser')

const mongoose = require('mongoose');

//inicializa o carga express
const app = express()

//CADA VEZ QUE VEAMOS APP.USE SE ESTÁ HACIENDO LA FUNCIÓN DE MIDDLEWARE.
//ES DECIR. TODAS las peticiones paran por estas líneas (líneas donde pone app.use)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

/* //se le indican a express las RUTAS que se van a usar.
app.use(require('./routes/usuario'));

//le indicamos tambien las rutas que hemos indicado en el fichero login.js para que funcionen las peticiones /login
app.use(require('./routes/login'));
 */


//===CONFIGURACIÓN GLOBAL DE RUTAS
app.use(require('./routes/index'));

// parse application/json
app.use(bodyParser.json())


/**Me lo llevo al fichero /routes/usuario.js */


/* app.get('/usuarios', function(req, res) {
    //res.send('Hello World')
    res.json('get Usuario');
})
 */


//EL POST se suele usar para grabar un usuario

/* app.post('/usuario', function(req, res) {
    //res.send('Hello World')

    //este body ya vendrá parseado por body-parser.
    let body = req.body;

    //para mandar un código de respuesta

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario"
        })

    } else {

        res.json({ persona: body });

    }



}) */

/* /* SE SUELE USAR PARA ACTUALIZAR Y SERÍA DE LA FORMA
/* ../put/<id_usuario> */
//app.put('usuario/:id') --> : para indicar el parámetro

/* 
app.put('/usuario/:id', function(req, res) {
    //res.send('Hello World')
    //para recuperar el id que viene como parámetro
    let id = req.params.id;

    res.json({
        id: id
    });
})

app.delete('/usuario', function(req, res) {
    //res.send('Hello World')
    res.json('DELETE usuario');
})

 */
/* 
app.listen(3000, () => { console.log('Escuchando en el puerto:', 3000); }) */

//mongoose.connect('<protocolo>://<url_servidor>:puerto/<nombre_bd>')
//definimos un callback para de alguna manera hacer algo si ha llegado a conectar o no. En el caso 
//de que no conecte retornará un error (err) que será el parámetro de la función callback al igual que 
//una respuesta si lo logra hacer

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, resp) => {

    //mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true, useUnifiedTopology: true }, (err, resp) => {

    if (err) throw err;

    console.log('BASE DE DATOS ONLINE');
});

app.listen(process.env.PORT, () => { console.log(`Escuchando en el puerto: ${process.env.PORT}`) });