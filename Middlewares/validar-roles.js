//29.1 Configuramos middleware de validaciónd e rol de usuario
    //¡¡Se tiene que agregar después del middleware JWT!!

//Importmaos (autmaticamente el express) al agregar res=response
    const { response } = require("express");

    
    //es una funcion
    const esAdminRole = (req, res=response, next)=>{

        //validación que se llama adecuadamente el rol
        if (!req.usuario){//para descartar los undefined
            return res.status(500).json({
                msg: 'se quiere verificar el role sin validar el token primero'
            })
        }

        //desestructuramos el req.usuario para id el rol y el nombre 
        const {rol,nombre} = req.usuario //ya la estamos llamando desde el middleware jwt - lo reutilizamos

        if(rol !=='ADMIN_ROLE'){
            return res.status(401).json({
                msg: `${nombre} no tiene permisos de admin para eliminar usuarios`
            })
        }

        next();
    }
    
    //es necesario que esta función devuelva algo
    const tieneRole = (...roles)=>{//unifico todas las posibles opciones con el operador ...(resto)

        return (req, res=response, next)=>{//esta función se va a ejecutar con los argumentos de arriba (por eso los ponemos)
        //validación para que lance el error en caso de querer mandar middleware sin haber validado el jwt primero
            if (!req.usuario){//para descartar los undefined
                return res.status(500).json({
                    msg: 'se quiere verificar el role sin validar el token primero'
                })
            }
        //verificación del rol del usuario
            if(!roles.includes(req.usuario.rol)){
                return res.status(401).json({
                    msg: `El servicio requiere uno de estos roles ${roles}`
                })
            }

            console.log(roles, req.usuario.rol); // lo dejo para que veas en consola que trae cada variable

            next();
        }
    }

    //exportamos
    module.exports={
        esAdminRole,
        tieneRole
    }