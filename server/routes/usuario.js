//para manejar todas las rutas del usuario

const { response } = require('express');
const express = require('express');

//para cifrar el campo contraseña usaremos el paquete bcrypt
const bcrypt = require('bcrypt');

//procedemos a usar la librería underscore para poder filtrar el objeto por los campos deseados
const _ = require('underscore');


//aquí vamos a crear el objetoUsuario para grabar en el modelo
const Usuario = require('../models/usuario');

//inicializa o carga express
const app = express()

app.get('/usuarios', function(req, res) {
    //res.send('Hello World')
    //res.json('get Usuario');

    //va a retornar TODOS los usuarios
    //.find({<condicion})
    //.exec --> ejecuta y retorna o error o los usuarios que ha encontrado
    //.limit (<valor) --> Retorna o límita el resultado al valor que ponga. En el ejemplo saca 5 registros
    //.skip (<valor>) --> Salta los primeros registros (nº indicado en <valor>)
    //para poder permitir parámetros opcionales. Es decir el usuario me podría decir, desde qué pagina quiere
    //y el límite que quiere ver.

    //si en la petición viene el parametro desde se toma, de lo contrario se toma desde cero
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Usuario.find({}).skip(5).limit(5).exec((err, usuarios) => {
    //Usuario.find({}).skip(desde).limit(limite).exec((err, usuarios) => {
    //le decimos que solo retorne de los objetos los atributos de nombre y email
    Usuario.find({ estado: true }, 'nombre email')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    status: false,
                    err
                });
            }
            //contamos solo los registros cuyo estado es activo --> estado:true
            Usuario.countDocuments({ estado: true }, (err, contador) => {
                res.json({
                    status: true,
                    usuarios,
                    registros: contador
                })

            })

        })
});
//EL POST se suele usar para grabar un usuario

app.post('/usuario', function(req, res) {
    //res.send('Hello World')

    //este body ya vendrá parseado por body-parser.
    let body = req.body;


    //CREAMOS EL OBJETO Usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //password: body.password,
        //.hasSync (<campo_que_se_va_a_cifrar>, <nº de veces que se aplica el hash>
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    //AHORA TOCA EL SIGUIENTE PUNTO ¿COMO GRABAMOS EL OBJETO USUARIO EN LA BASE DE DATOS? 
    //<objeto>.save((<retorna_erro_si fue mal>, <retorna_usuarioDB si fue bien> y estos serán
    //los parámetros de entrada de la función flecha.))
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                status: false,
                err
            });
        }

        //SI QUEREMOS QUE EN LA SALIDA NO SE MUESTRA LA PASSWORD HAY 2 OPCIONES:
        //usuarioDB.password= null; y la otra opción es desde el propio esquema


        return res.json({
            status: true,
            usuario: usuarioDB
        })
    });

    //para mandar un código de respuesta

    /*     
        if (body.nombre === undefined) {
            res.status(400).json({
                ok: false,
                mensaje: "El nombre es necesario"
            })

        } else { */

    //res.json({ persona: body });





})

/* /* SE SUELE USAR PARA ACTUALIZAR Y SERÍA DE LA FORMA
/* ../put/<id_usuario> */
//app.put('usuario/:id') --> : para indicar el parámetro

app.put('/usuario/:id', function(req, res) {
    //res.send('Hello World')
    //para recuperar el id que viene como parámetro
    let id = req.params.id;
    //aquí le decimos que de todos los campos NO ACTUALICE el de password
    //delete body.password
    //let body = req.body;

    //vamos a indicar con pick TODAS las propiedades que si se podrán actualizar del objeto
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    //findByIdAndUpdate (<id_del_objeto_a_actualizar>, <body con todos los campos>, {<objeto_con_opciones>})
    //runValidators lo que hace es correr TODAS las validaciones que tenemos definidas en el esquema

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                status: false,
                err
            });
        }
        res.json({
            status: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/usuario/:id', function(req, res) {
    //res.send('Hello World')
    //res.json('DELETE usuario');

    let id = req.params.id;
    //se borra fisicamente el registro o documento 

    /*     Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    err
                });
            }

            res.json({
                status: true,
                usuario: usuarioBorrado
            })

        }); */

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, UsuarioEncontrado) => {

        if (err) {
            return res.status(400).json({
                status: false,
                err
            })
        }

        res.json({
            status: true,
            UsuarioEncontrado
        })



    })

})

//exportamos el app para que se pueda usar en server.js

module.exports = app;