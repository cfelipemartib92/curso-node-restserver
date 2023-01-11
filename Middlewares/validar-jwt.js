//27.2 middleware validación de token para poder borrar
    //se llama el express con respopnse y request
    const {response,request} = require('express');
    //utilizamos el paquete de jwt
    const jwt = require('jsonwebtoken');
    //28.1 llamamos el modelo del usuario
    const Usuario = require('../models/usuario');

    //el middleware se dispara con 3 argumentos req, res, y funcion next decvirle que puedes continuar con el sig middleware o controlador
    const validarJWT = async (req = request, res = response, next)=>{
        //27.4 leemos el header del postman
        const token = req.header('x-token');
        //27.6 validación que exista token
        if(!token){
            return res.status(401).json({
                msg: 'No hay token en la petición'
            })
        }
        //validación que sea un token valido
        try {
            //validación desde el paquete importado - verificamos el token y la firma que tenemos en .env
            //27.7 extraemos el uid del usuario
            const {uid} = jwt.verify(token, process.env.SECRETORPRIVETEKEY);

            //28.2 autenticación usuario rol 
                //leer usuario que corresponde al uid
            const usuario = await Usuario.findById(uid);
            //28.5 Validación no permitir usuarios undefined
            if(!usuario/*No existe el usuario*/){
                return res.status(401).json({
                    msg: 'Token no valido - Usuario no existente en DB'
                })
            };
            //28.4 Validación estado true de usuario
            if (!usuario.estado){
                return res.status(401).json({
                    msg: 'Token no valido - Usuario eliminado'
                })
            };
            req.usuario =usuario;
                //console.log(payload); por si quiero ver el uid, iat, exp date
            //req.uid=uid; //estamos creando una propiedad nueva del request

            next();

        } catch (error) {
            console.log(error);
            res.status(401).json({
                msg: 'Token no valido'
            })
        }
    }

//LO EXPORTAMOS
module.exports={
    validarJWT
}