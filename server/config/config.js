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