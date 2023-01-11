//23.3 Construimos la ruta para autenticación

    //desestructuramos el paquete de express - sacamos la función Router
        const {Router} = require('express');
    //16.2 se crea la conección al metodo check de express validator
        const {check}=require('express-validator');
    //23.4 Se importa automáticamente el controller
        const { login } = require('../controllers/auth.controller');
    //Se importa el middleware de validación
        const { validarCampos } = require('../Middlewares/validar-campos');

    //realizamos la primera instancia del router
        const router = Router();
    //Generamos la ruta de Post al login
        //llamamos el controlador login del controller auth
        router.post('/login',[
            //check para validar el correo y contraseña
                check('correo','El correo es obligatorio').isEmail(),
                  check('password','El password es obligatorio').not().isEmpty(),//no está vacía
            //llamamos el custom middleware de validar campos
                validarCampos
        ] ,login );

    //Exportamos el router
        module.exports=router;