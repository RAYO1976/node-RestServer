const express = require('express');

//para cifrar el campo contraseña usaremos el paquete bcrypt
const bcrypt = require('bcrypt');


//vamos a usar la libreria jwtToken para crear el token
const  jwt  =  require('jsonwebtoken');




//aquí vamos a crear el objetoUsuario para grabar en el modelo
const Usuario = require('../models/usuario');

//inicializa o carga express
const app = express()



app.post('/login', (req, res) => {

    let body = req.body;

    //filtramos si el atributo email del objeto Usuario es igual al que me llega en el body.
    //En el caso de que exista se populará el objeto Usuario y si no existe se retorna error.
    Usuario.findOne({ email: body.email }, (err, UsuarioDB) => {

        if (err) {
            return res.status(500).json({
                status: false,
                err
            });
        }
        //Si no se encuentra usuario
        if (!UsuarioDB) {
            //ponemos return para que se corte el flujo y no siga el código ejecutando
            return res.status(400).json({
                status: false,
                err: {
                    mensaje: 'Usuario o contraseña incorrecta'
                }
            })
        }
        //la contraseña está encriptada. Para comparar usamos la función compareSync
        //lo que hace la función es encriptar la contraseña que llega en el body y la compara con la
        //que hay guardada en la BD mongoDB que ya está cifrada

        //si el resultado de la función es false entonces significa que no coinciden las contraseñas

        if (!bcrypt.compareSync(body.password, UsuarioDB.password)) {
            return res.status(400).json({
                status: false,
                err: {
                    mensaje: 'Usuario o contraseña incorrecta'
                }
            })
        }

        //.sign({<payload_que_se_va_a_generar_en_el_token})
        let token = jwt.sign({
            Usuario: UsuarioDB
        }, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN });


        res.json({
            status: true,
            Usuario: UsuarioDB,
            token
        })
    });
});
//de esta manera podremos usar la configuración que se le ha dado a express en otras páginas. De ahí que se exporta.
module.exports = app