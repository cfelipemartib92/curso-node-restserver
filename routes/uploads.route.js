//48.1 Construimos la ruta para los uploads - copy paste de auth

    //desestructuramos el paquete de express - sacamos la función Router
        const { Router } = require('express');
    //16.2 se crea la conección al metodo check de express validator
        const { check}=require('express-validator');
    //Importación controladores
        const { cargarArchivo, actualizarImagen, actualizarImagenCloudinary, mostrarImagen } = require('../controllers/uploads.controller');
    //Se importa el middleware de validación - 48.11.7
        const { validarCampos, validarArchivoSubir } = require('../Middlewares');
    //Importamos el helper de validación de colecciones permitidas
        const {coleccionesPermitidas } = require('../helpers');

    //realizamos la primera instancia del router
        const router = Router();
    
    //Creamos ruta - Para crear un nuevo recurso usamos post, (actualizar put) - 48.11.7 ponemos validaciónd e middleware
        router.post('/',validarArchivoSubir,cargarArchivo);


    //48.11 Creamos ruta - Para actualizar imagenes - usamos put(update)
        router.put('/:coleccion/:id',[
            //validaciones
            validarArchivoSubir,
            check('id','El id debe estár en la db').isMongoId(),
            check('coleccion').custom(c=> coleccionesPermitidas (c,['usuarios','productos'])),
            //el check no bloquea hasta llamar validarCampos
            validarCampos
        // ],actualizarImagen);//con fotos en local
        ],actualizarImagenCloudinary);//img en el servidor
    
        
    //48.13 Ruta para mostrar imagenes del servidor
        router.get('/:coleccion/:id',[
            check('id','El id debe estár en la db').isMongoId(),
            check('coleccion').custom(c=> coleccionesPermitidas (c,['usuarios','productos'])),
            //sin validar campos no sirve el check
            validarCampos
        ],mostrarImagen);

    //Exportamos el router,
        module.exports=router;