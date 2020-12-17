//va a ser el encargado de crear el modelo de datos


const mongoose = require('mongoose');

//previo a esto hemos instalado el paquete de uniqueValidator npm i mongoose-unique-validator --save
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

//procedemos a definir el esquema 
//con unique indicamos que el email debe ser único por persona. No puede haber duplicados

let usuariosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es necesario']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es necesario']
    },
    google: {
        type: Boolean,
        required: [false, 'El campo de google es necesario']
    }
});


//si queremos que en la salida no se muestre la contraseña 
//aquí estamos modificando el metodo toJSON que viene ya definido y que es el usado implicitamente cuando se
//saca la salida de todo el esquema al JSON

usuariosSchema.methods.toJSON = function() {
    //ASIGNO LO QUE SEA QUE TENGA EN ESE MOMENTO
    let user = this;
    //lo paso a objeto para poder borrar.
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//le decimos al esquema que use el plugin de uniqueValidator

usuariosSchema.plugin(uniqueValidator);

//campos de la colección

//vamos a procede a exportar el modelo para que pueda ser consumido

//mongoose.model (<nombre del modelo que quiero que tenga>, <configuración/esquema asociado al modelo>)
module.exports = mongoose.model('Usuario', usuariosSchema);