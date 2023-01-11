//25.3 Creación de helper pcon la función generarJWT del controlador 
    //25.3.1 importamos paquete de JWT
        const jwt = require('jsonwebtoken');

    //ASYNCRONO - como es un callback generamos la promesa manualmente
        const generarJWT = (uid='') => {//el uid es lo unico que vamos a almacenar en el payload del jwt
            //como quiero que trabaje en base a promesas tnego que hacer un return de new promise
            return new Promise((resolve,reject)=>{//omo tiene el return aquí en la función del controller ya puede hacer el await
                //solo guardamos en el payload el uid
                const payload = {uid/*,nombre, correo*/};

                //instrucción para generar el jwt - const payload y la public key del .env
                jwt.sign(payload, process.env.SECRETORPRIVETEKEY, {
                    //agregamos las opciones:
                    expiresIn: '4h'
                },/*viene el callback:*/(err,token)=>{
                    if (err){
                        console.log(err);
                        reject('No se pudo generar el token')
                    }else{
                        resolve(token);
                    }
                })
            });
        }

//Exportar helper:
    module.exports={
        generarJWT
    }