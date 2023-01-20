//48.9 Configuracion index de helkpers

    const dbValidators = require ('./db-validators');
    const generarJWT   = require ('./generar-jwt');
    const googleVerify = require ('./google-verify');
    const validarArchivo = require ('./subir-archivo');


//Exportamos
    module.exports= {
        ...dbValidators,
        ...generarJWT,
        ...googleVerify,
        ...validarArchivo
    }
