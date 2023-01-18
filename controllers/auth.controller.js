//23.2 Creamos controlador para el autenticador (sdon funciones)
    //Se llamó el express automáticamente
        const { response, json } = require("express");
    //24.3.1 llamamos el modelo usuario
        const Usuario = require('../models/usuario');
    //24.3.2 importamos bcrypt para validación de contraseña
        const bcryptjs = require('bcryptjs');
    //25.5 importamos el helper generar-jwt.js
        const { generarJWT } = require("../helpers/generar-jwt");
    // 36.5 Se importa el helper con la función de googleVerify
        const { googleVerify } = require("../helpers/google-verify");
    //34 Se importo la librería de google
        const { DefaultTransporter } = require("google-auth-library");

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

    //35.3 Funcion Controlador autenticación google
        const googleSignIn = async (req, res=response)=>{

            //tomamos el idtoken
            const {id_token}=req.body;

            // 36.5 Traemos la función del googleVerify del helper nuevo
            try {
                
                //desestructuramos el googleUser
                const /*googleUser*/{ nombre, img, correo } = await googleVerify(id_token);

                //37.2 generamos referencia para ver si el correo existe en las bases de datos:
                let usuario = await Usuario.findOne({correo}); // se llama el modelo desde el correo
                //37.3 Revisamos si el usuario no existe lo tengo que crear
                if (!usuario){ 
                    //reviso la data que tengo que crear
                    const data = { //esta es la ata que se le manda a la creación del usuario
                        nombre,
                        correo,
                        rol: "USER_ROLE",                        
                        password: ':p',
                        img,
                        google:true
                    };
                    usuario = new Usuario(data);
                    await usuario.save();//esto es para guardarlo en base de datos
                }

                //37.4 Si el usuario en DB de google ya está estado:false denego auth
                if (!usuario.estado){//estado false
                    return res.status(401).json({
                        msg: 'Hable con el administrador, usuario bloqueado'
                    });               
                }

                //37.5 Generamos el JWT
                const token = await generarJWT(usuario.id);


                res.json({
                    usuario,
                    token
                });
            } catch (error) {
                json.status(400).json({
                    ok:false,
                    msg: 'El token no se pudo verificar'
                })
            } 

        }

    //Exportamos el login
    module.exports={
        login,
        googleSignIn
    };