//23.2 Creamos controlador para el autenticador (sdon funciones)
    //Se llamó el express automáticamente
        const { response } = require("express");
    //24.3.1 llamamos el modelo usuario
        const Usuario = require('../models/usuario');
    //24.3.2 importamos bcrypt para validación de contraseña
        const bcryptjs = require('bcryptjs');
    //25.5 importamos el helper generar-jwt.js
        const { generarJWT } = require("../helpers/generar-jwt");

    //Función para controlar autenticación 
        const login = async (req,res = response)=>{

            //24.1 configuración del login extrayendo correo y password
                const {correo, password} = req.body;
            //aplucamos try catch por si algo sale mal
                try {
                    
                    //24.3 verificar si el email existe -> llamamos el modelo usuario
                        const usuario = await Usuario.findOne({correo});
                        //si regresa algo significa que el user existe si no no existe
                        if (!usuario){
                            return res.status(400).json({
                                msg: 'El usuario no existe - Correo'
                            })
                        }
                    //24.3 Verificar si el usuario está activo
                        if (usuario.estado == false/*es igual a:!usuario.estado*/){
                            return res.status(400).json({
                                msg: 'Este usuario fué eliminado - Estado False'
                            })
                        }
                    //24.3 Verificar la contraseña - importmaos bcryptjs
                        const validPassword = bcryptjs.compareSync(password, usuario.password);
                        //si el password es false entonces: 
                        if (!validPassword){
                            return res.status(400).json({
                                msg: 'El password es incorrecto - password'
                            })
                        }

                    //24.3 generar el JWT - 25.2
                    const token = await generarJWT(usuario.id);


                    res.status(200).json({
                        usuario,
                        token      
                    });
                    
                } catch (error) {
                    
                    console.log(error);
                    return res.status(500).json({
                        msg: 'Hable con el admin, algo salió mal'
                    });

                }
        }

    //Exportamos el login
    module.exports={
        login
    };