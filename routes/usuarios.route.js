
//desestructuramos el paquete de express - sacamos la función Router
    const {Router} = require('express');
    //16.2 se crea la conección al metodo check de express validator
    const {check}=require('express-validator');
    //16.16 importamos schema de roles
            //16.19.1me lelvo esta importación al db validators (helpers)
        //me lo llevo // const Role = require('../models/role');
//31.3 Copio todas las importaciones de midlewares y las mego en el index.js middleware 
/*  //16.11 importmos el middleware validar campos 
    const {validarCampos}= require('../Middlewares/validar-campos');
    //27.5 Se importa el archivo donde está el middleware validadr del token
    const { validarJWT } = require('../Middlewares/validar-jwt');
    //29.2 & 30.4 Se importa el archivo donde está el middleware validadr el rol del usuario
    const { esAdminRole, tieneRole } = require('../Middlewares/validar-roles');
*/
//32.6 llamo el index.js con todos los middlewares unificados:
    const {
        validarCampos, 
        validarJWT, 
        esAdminRole, 
        tieneRole
    }=require('../Middlewares'/*/index - es opcional pero por default apunta a esto*/ )


    //16.20 conectamos con el helkper donde pusimos la validación del rol & 19.3
    const {esRolValido,emailExiste,existeUsuarioPorId} = require('../helpers/db-validators');
    //importamos la funcion del controlador para el get: 7.9
    const {usuariosGet, 
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete} = require('../controllers/usuarios.controller');
    //permite llamar una funcion para el router
    const router = Router();
    //7.4 pegamos las rutas del modulo routs de server.js
    // Cambiamos la configuracion de las routes poniendole router. en lugar de this.app
        
                /*router.get('/api', (req, res)=> {//esto se vuelve un endpoint/api
                    res.send('Hello World')
                });*/ // ERA UN EJEMPLO INICIAL

        //probando endpoint con json GET -- read cRud
        //7.8 mandamos la logica al controlador y pegamos la funcion del controller
        router.get('/', usuariosGet); //no ejecuto la función sólo mado la referencia
        /* -- me lo lleve al controler: (req, res)=> {
            res.status(403).json({//le mando status 403 (forbidden)
                ok: true,
                msg: 'GET API'
            })//le pongo JSON
        });*/
        
        //probando PUT -- actualizar crUd
            //8.3.2 agregamos url dinámicas
        router.put('/:id',[
            //19.1 nuevas validaciones - uso express validator para validaciones
            check('id','No es un id valido').isMongoId(),            
            //19.4 agregamos un check para enlazar el nuevo validación de si el id existe
            check('id').custom(existeUsuarioPorId),
            check('rol').custom( esRolValido),//19.5 copy paste validación rol
            validarCampos,//agregamos la función de validación //middleware validar-campos
            ],
            usuariosPut);//7.8 tremos la unción del controller
                //7.8 lógica al controldaor:       
                /*(req, res)=> {
                    res.json({
                        ok: true,
                        msg: 'PUT API'
                    })
                });*/
        
        //probando POST -- crear Crud
                //16.12 agregamos los middlewares en 2º posicón con unos []
        router.post('/', [
            check('nombre','El nombre es obligatorio').not().isEmpty(), //16.15 validación de lo demás-validamosque no esté vacio
            check('password','El password debe contar con más de 6 letras').isLength({min:6}), //16.15 validación password         
            //16.12 le indico que campo del body necesito revisar  
            check('correo','El correo no es valido').isEmail(),    //tiene que existir y ser un correo
            //17.1 validación del correo
            check('correo').custom(emailExiste),
            //16.15 validamos los roles contra la db
                //esta ya no//check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']), //16.15 validación password         
                //16.19 corto y pego la función de validación y la llevo al helper
            check('rol').custom( esRolValido/*async (rol='')=>{//verificación personalizada con el custom - minimo es un string vacio ''
                const existeRol = await Role.findOne({rol}); //importamos el schema - buscar uno que el rol sea = a rol
                if(!existeRol){
                    throw new Error(`El rol ${rol} no está registrado en la BD`)//ATRAPAMOS EL ERROR CON ESTE MENSAJE
                }
            }*/),
            //16.10 traemos la funcion middlewares de los middlewares
            validarCampos, 
        ],usuariosPost); //7.8 tremos la unción del controller 
                //7.8 lógica al controldaor: 
                /*(req, res)=> {
                    res.status(500).json({//status  mensaje creado 5.1
                        ok: true,
                        msg: 'POST API'
                    })//le pongo JSON
                });*/
        
        //probando DELETE -- borrar cruD
            //21.1 agregamos id del delete
        router.delete('/:id', [
            //27.5 agregamos el middleware validador del token
            validarJWT,
            //29.2 agregamos el middleware validador del usuario - 30.1
            /*esAdminRole,*/  
            //30.2 Middleaware que pueda ejecutar en uno o varios roles
            tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
            //validaciones 21.3.1
            check('id','No es un id valido').isMongoId(),
            check('id').custom(existeUsuarioPorId),
            validarCampos,
        ],usuariosDelete); //7.8 tremos la unción del controller 
                //7.8 lógica al controldaor: 
                /*(req, res)=> {
                    res.json({
                        ok: true,
                        msg: 'delete API'
                    })//le pongo JSON
                });*/

        //probando PATCH
        router.patch('/', usuariosPatch); //7.8 tremos la unción del controller (req, res)=> {
                //7.8 lógica al controldaor: 
                /*res.json({
                        ok: true,
                        msg: 'patch API'
                    })//le pongo JSON
                });*/


    module.exports=router;