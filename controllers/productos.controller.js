//44.2.3 Configuramos controlador de productos
    //Importación de express en la response
        const { response, json } = require("express");
    //42.11.5.1 Importamos modelo de cateogría
        const {Producto, Categoria, Usuarios} = require('../models');//no tengo que apuntar al index,lo hace por default 



    //43.3 Esta funcion sirve para obtener categorias - Paginado - total - duncion de mongoose populate (último usuario que modifico la bd)
        const obtenerProductos = async (req,res=response)=>{

            //Paginamos
                const {limite=5, desde=0} = req.query;
            //Que se muestre los que están en estado true (en el query(bd))
                const query ={estado:true};
            //Promes para que con el modelo traer de la info de base de datos 
                const [total, productos] = await Promise.all([ //es una colección de promesas - las puedo borrar de arriba
                    Producto.countDocuments(query), //Contar cuantos Documentos hay
                    Producto.find(query) // Encontrar en la colección de Categorias
                        .populate('usuario','nombre') //Mostrar print en lugar del id el nombre de usuario
                        .populate('categoria','nombre') //Mostrar print en lugar del id el nombre de usuario
                        .skip(Number(desde)) //Detalles de lo que va a contar en el paginado
                        .limit(Number(limite))//Detalles de lo que va en el paginado
                ]);
        
                res.status(200).json({
                    total, productos
                })
            //lo exportamos en el module.exports
        };

    //Esta funcion regresa el objeto de la categoría - - populate {}
        const obtenerProducto = async (req,res=response)=>{

            //Extraemos el id que viene en la req
                const {id} = req.params; 
            //Validamos que el producto no esté eliminado
                const {estado,nombre} = await Producto.findById(id)//.populate('usuario','nombre');//lo populamos para que muestre la info del user
                if (!estado){
                    return res.status(400).json({
                        msg: `El producto '${nombre}' está eliminado` 
                    });
                };
            //Lo buscamos en la bd con el modelo Categoría (el id es loq ue estragimos arriba)
                const producto = await Producto.findById(id)
                                        .populate('usuario','nombre')//lo populamos para que muestre la info del user
                                        .populate('categoria','nombre');//lo populamos para que muestre la info de la cateogria
            //Imprimimos lo que encontramos
                res.status(200).json(producto);
        }


    //Esta función sirve para crear categorías en la bd
        const crearProducto = async (req, res=response)=>{

        //Extraemos el nombre de la request (en el body del header) y lo asignamos a la const nombre
            const {estado,usuario,...body} = req.body;//Quiero almacenar categorías en mayus
        //Validamos si existe una categoria igual en la bd (traemos el modelo categoría arriba)
            const productoDB = await Producto.findOne({nombre:body.nombre});

            if(productoDB){
                return res.status(400).json({
                    msg: `El producto ${productoDB.nombre} ya existe` 
                });
            }
        //42.11.6 Generamos la data que queremos grabar
            const data = {
                ...body,
                nombre: body.nombre.toUpperCase(),
                usuario: req.usuario._id //mongo los está grabando como _id
            }
        //42.11.7 Realizamos la grabación de la data en DB
            const producto = new Producto(data); //lo crea y lo prepara en el modelo
            //GUardar en DB
            await producto.save(); 
        //42.11.8 Hacemos la response de que se grabo
            res.status(201).json(producto)               
        };

    //43.5 Esta Funcion actualiza la categoria - recibimos el nombre por uno que no exista
        const actualizarProducto = async (req,res=response)=>{

        //Extraemos el id
            const {id} =req.params;
        //Extraer información para que no se puieda cambiar el estado ni el usuario
            const {estado, usuario, ...data}= req.body;
        //Grabar el nombre de la categoría en uppercase - sólo si viene en la data (body) sino no
            if (data.nombre){//por si viene
                data.nombre= data.nombre.toUpperCase();
            }
        //Establecer el usuario - quien fue el que hizo la última modificacion
            data.usuario = req.usuario._id;
        //Asignar la nueva info al id - guardar en mongo
            const producto=await Producto.findByIdAndUpdate(id,data,{new:true});//id de quien quiero ajustar, la data para cambiar, {asignar como un nuevo archivo}
        //Imprimir que ya se grabo la categoría
            res.json(producto);
        }

    //Esta Funcion borra la producto - estado false - necesitamos el id y lo verificamos
        const borrarProducto = async (req,res=response)=>{

        //Tomamos el id (extraemos el id)
            const {id} =req.params;
        //Validar que no esté borrado
            const {estado,nombre} = await Producto.findById(id)//.populate('usuario','nombre');//lo populamos para que muestre la info del user
            if (!estado){
                return res.status(400).json({
                    msg: `El producto '${nombre}' está eliminado` 
                });
            };
        //Validar que sea un id que existe en la db                
            const productoBorrada = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});//el new true es para que se vean los cambios reflejados en JSON
        //Imprimir 
            res.status(200).json({productoBorrada});
        } 


    //Exportar el controlador
        module.exports={
            obtenerProductos,
            obtenerProducto,
            crearProducto,
            actualizarProducto,
            borrarProducto,
        }