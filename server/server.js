//se está imporando el fichero de configuración y ejecutando lo que tiene
require('./config/config.js');

const express = require('express')

const bodyParser = require('body-parser')

const app = express()

//CADA VEZ QUE VEAMOS APP.USE SE ESTÁ HACIENDO LA FUNCIÓN DE MIDDLEWARE.
//ES DECIR. TODAS las peticiones paran por estas líneas (líneas donde pone app.use)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.get('/usuarios', function(req, res) {
    //res.send('Hello World')
    res.json('get Usuario');
})



//EL POST se suele usar para grabar un usuario

app.post('/usuario', function(req, res) {
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



})

/* /* SE SUELE USAR PARA ACTUALIZAR Y SERÍA DE LA FORMA
/* ../put/<id_usuario> */
//app.put('usuario/:id') --> : para indicar el parámetro


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


/* 
app.listen(3000, () => { console.log('Escuchando en el puerto:', 3000); }) */

app.listen(process.env.PORT, () => { console.log(`Escuchando en el puerto: ${process.env.PORT}`) });