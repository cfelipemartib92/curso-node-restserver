//31.2 Agregamos todos los middlewares en este archivo

//31.4 Quitamos la desestructuración y la dejamos como una constante /**/

    ////16.11 importmos el middleware validar campos 
    const /*{*/validaCampos/*}*/= require('../Middlewares/validar-campos');
    ////27.5 Se importa el archivo donde está el middleware validadr del token
    const /*{*/ validarJWT /*}*/ = require('../Middlewares/validar-jwt');
    ////29.2 & 30.4 Se importa el archivo donde está el middleware validadr el rol del usuario
    const /*{esAdminRole, tieneRole}*/validaRoles = require('../Middlewares/validar-roles');

//Exporto los enlaces
module.exports={
    //utilizo el operador espread ... para no tener que llamar cada función, sino todo lo que contenga cada archivo
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
} 