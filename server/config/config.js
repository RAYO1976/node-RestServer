//AQUÍ SE DECLARARÁN CONSTANTES, VARIABLES, ETC. DE FORMA GLOBAL.
//HAY UNA QUE SIEMPRE ESTA CORRIENDO QUE ES EL PROCESS, SIENDO UN OBJETO GLOBAL QUE ESTÁ CORRIENDO A LO LARGO 
//DE TODA LA APLICACIÓN DE <NODE>



//=========================
//        PUERTO
//=========================

//básicamente lo que se está diciendo. Cuando la aplicación corra en el servidor (ejemplo HEROKU)
//tomará el puerto que se le haya asignado. De lo contrario (ejemplo: entorno local), por defecto 
//tomará el puerto 3000

process.env.PORT = process.env.PORT || 3000;


//========================
//        ENTORNO
//========================

//esta variable la crea HEROKU cuando la aplicación corre en su entorno. 
//En el caso de que esta variable no exista suponemos que estamos en el entorno de Desarrollo

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//========================
//        BASE DE DATOS
//========================


let urlDB;

urlDB = 'mongodb+srv://rayo:N6aeKWfJy5TU2MAg@cluster0.rizem.mongodb.net/cafe?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';


/* if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://rayo:N6aeKWfJy5TU2MAg@cluster0.rizem.mongodb.net/cafe'
}
 */
//creamos una variable de entorno llamada URLDB 
process.env.URL_DB = urlDB