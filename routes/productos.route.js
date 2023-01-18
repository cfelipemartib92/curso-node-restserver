//44.2.4 Configuramos Route de Productos
// Copiamos y pegamos las importaciones del otro Rout Categorias

    //desestructuramos el paquete de express - sacamos la función Router
        const {Router} = require('express');
    //16.2 se crea la conección al metodo check de express validator / lo usamos en la valdiación del nombre 
        const {check}=require('express-validator');
    //44.2.3 Importamos el controlador de productos y sus fuinciónes
        const {crearProducto, 
               obtenerProductos,
               obtenerProducto,
               actualizarProducto,
               borrarProducto,} = require('../controllers/productos.controller');
    //43.4.3. Importamos el helper validador de la existencia de categoría
        const { existeCategoriaPorId,
                existeProductoPorId } = require('../helpers/db-validators');
    
    //Se importa el middleware de validación 
        const { 
            validarJWT, //Middleware de JWT:
            validarCampos, //Usamos para validar campos en el route
            esAdminRole, //43.6.4 lo usamos para borrar y crear
        } = require('../Middlewares');


        const router = Router();

//44.4 Creamos los servicios para la ruta
    // {{url}}/api/productos  - este sería la url - es el path

    //1. (GET) Servicio para Obtener todos los Productos - publico
        // 43.3 Asignamos la Ruta en lugar del req,res:
            /*router.get('/',(req,res)=>{ //esto es un controlador in situ - le ponemos el controlador importado (todos los tenían)
                res.json('get')
            });//-- este es el anterior*/
        router.get('/', obtenerProductos );
            

    //2. (GET) Servicio para Obtener una categoria por id - publico
        //43.4.3 Ajuste ruta GET POR ID 
        router.get('/:id',[           
            check('id','No es un id de Mongo válido').isMongoId(),//id existe
            check('id').custom(existeProductoPorId),//43.4.3 helper validador
            validarCampos,//validar los campos
        ], obtenerProducto); //43.4 asignamos el controlador getbyid

    //3. (POST)Servicio para Crear un nuevo Producto - Privado - Cualquier persona con token válido
        //42.10 Agregamos validación de token, nombre  
        router.post('/',[
            validarJWT, //42.10 Validación Token
            check('nombre','El nombre es obligatorio').not().isEmpty(),//42.1.4 Validación del nombre con check de express validator (importado)
            check('categoria','No es un id de Mongo').isMongoId(),
            check('categoria').custom(existeCategoriaPorId),
            validarCampos //42.10.5 Es la validación de los campos del middleware, si es empty lo que pide el epxress valdiator es error
        ],crearProducto);
        /*outer.post('/',(req,res)=>{ //esto es un controlador in situ - le ponemos el controlador importado (todos los tenían)
            res.json('post')
        });*/

    //4. (PUT) Servicio para actualizar el id - Privado - cualqueira con token valido
        router.put('/:id',[
            validarJWT,
            //check('categoria','No es un id de Mongo').isMongoId(),
            check('id').custom(existeProductoPorId),//43.5.4 helper validador
            validarCampos//43.5.4 Validar que los campos estén llenos
        ] ,actualizarProducto);

    //5. (DELETE)Servicio para aborrar una categoría - Privado - Sólo admin 
        router.delete('/:id',[
            validarJWT,//43.6.4 VERIFICAR que tenga token
            esAdminRole,//43.6.4 validar que es administrador (middleware)
            check('id','No es un id de Mongo válido').isMongoId(),//validar que sea un mongo id
            //validarCampos,//lo ponemos para ver si hay un error hasta este punto antes de hacer otra validación
            check('id').custom(existeProductoPorId),
            validarCampos,
        ],borrarProducto);


    //Exportamos el router
        module.exports=router;