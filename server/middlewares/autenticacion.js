//aquí crearemos una función middleware que se encargará de la verificación del token


//============================
//         VERIFICAR TOKEN
//========================

//importamos la librería
const jwt = require('jsonwebtoken');

//next lo que hace es continuar con la ejecución del programa
let verificaToken = (req, res, next) => {

    //con .get leemos los headers de la request y nos interesa el que hemos definido como token
    let token = req.get('token');


    //comprobamos que el token es válido. De parámetros tiene el token del header, el SEED que creamos,
    //y un callback 
    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                status: false,
                err: err
            })
        }

        //el decoded será el payload decodificado.
        //En el payload del token tenemos esto 

        /*         {
                    "Usuario": {
                      "role": "ADMIN_ROLE",
                      "estado": true,
                      "_id": "5fdc6e32e12da92ba4c8058b",
                      "nombre": "Felipe Rayo Gomez",
                      "email": "josefelipe.rayo@gmail.com",
                      "__v": 0
                    },
                    "iat": 1608285546,
                    "exp": 1608285549
                  } */


        //aquí tenemos el usuario con el que nos logamos; está en el payload
        //lo estamos colocando en la request como una nueva propiedad.
        req.usuario = decoded.Usuario;
        console.log(req.usuario);
        //con el next() decimos que continue la ejecución el invocador del middleware
        next();

    });

};


//============================
//         VERIFICAR ADMIN ROLE
//==========================


let verificaRole = (req, res, next) => {


    let UsuarioPayLoad = req.usuario;
    console.log(UsuarioPayLoad.role);

    if (UsuarioPayLoad.role === "ADMIN_ROLE") {

        next();
        return;
    } else {
        return res.json({
            status: false,
            err: "Usuario debe tener role de administrador"
        })
    }
}








module.exports = {
    verificaToken,
    verificaRole
}