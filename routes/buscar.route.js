//45.2 Configuramos la ruta
    
    //desestructuramos el paquete de express - sacamos la función Router
        const {Router} = require('express');
    //importamos controlador buscar
        const {buscar} = require('../controllers/buscar.controller.js');
    
    //Creamos la ruta
        const router = Router();
        
    //Las opciones de busqueda son get usualmente
        router.get('/:coleccion/:termino',buscar) //estructura (carpeta/nombre) + controlador buscar
    //Exportamos
        module.exports= router;