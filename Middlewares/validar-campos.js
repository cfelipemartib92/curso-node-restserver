//16.8 traemos del controlador para acá para que nos funcione la función
const { validationResult } = require('express-validator');

//16.9 como es un middleware agregamos la funcion next en los parametros
const validarCampos = (req,res,next) => {

    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        return res.status(400).json(errors);//mando un statos con el mansaje de los errores
    } 

    next();
}



module.exports = {
    validarCampos
}