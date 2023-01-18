//42.11 Controlador creación de categoría
    //Importación de express en la response
        const { response, json } = require("express");
    //42.11.5.1 Importamos modelo de cateogría
        const {Categoria, Usuarios} = require('../models');//no tengo que apuntar al index,lo hace por default 



    //43.3 Esta funcion sirve para obtener categorias - Paginado - total - duncion de mongoose populate (último usuario que modifico la bd)
        const obtenerCategorias = async (req,res=response)=>{

            //Paginamos
                const {limite=5, desde=0} = req.query;
            //Que se muestre los que están en estado true (en el query(bd))
                const query ={estado:true};
            //Promes para que con el modelo traer de la info de base de datos 
                const [total, categorias] = await Promise.all([ //es una colección de promesas - las puedo borrar de arriba
                    Categoria.countDocuments(query), //Contar cuantos Documentos hay
                    Categoria.find(query) // Encontrar en la colección de Categorias
                        .populate('usuario','nombre') //Mostrar print en lugar del id el nombre de usuario
                        .skip(Number(desde)) //Detalles de lo que va a contar en el paginado
                        .limit(Number(limite))//Detalles de lo que va en el paginado
                ]);
        
                res.status(200).json({
                    total, categorias
                })
            //lo exportamos en el module.exports
        };
    
    //43.4 Esta funcion regresa el objeto de la categoría - - populate {}
        const obtenerCategoria = async (req,res=response)=>{

            //Extraemos el id que viene en la req
                const {id} = req.params; 
            //Lo buscamos en la bd con el modelo Categoría (el id es loq ue estragimos arriba)
                //const categoria = await Categoria.findById(id).populate('usuario','nombre');
            //Esta es una adaptación mia para validar que el estado esté activo
                const {estado,nombre} = await Categoria.findById(id)//.populate('usuario','nombre');//lo populamos para que muestre la info del user
                if (!estado){
                    return res.status(400).json({
                        msg: `La categoria '${nombre}' está eliminada` 
                    });
                }
                const categoria = await Categoria.findById(id).populate('usuario','nombre');
            //Imprimimos lo que encontramos
                res.status(200).json(categoria);
        }
    

    //Esta función sirve para crear categorías en la bd
        const crearCategoria = async (req, res=response)=>{

        //Extraemos el nombre de la request (en el body del header) y lo asignamos a la const nombre
            const nombre = req.body.nombre.toUpperCase();//Quiero almacenar categorías en mayus
        //Validamos si existe una categoria igual en la bd (traemos el modelo categoría arriba)
            const categoriaDB = await Categoria.findOne({nombre});

            if(categoriaDB){
                return res.status(400).json({
                    msg: `La categoría ${categoriaDB.nombre} ya existe` 
                });
            }
        //42.11.6 Generamos la data que queremos grabar
            const data = {
                nombre,
                usuario: req.usuario._id //mongo los está grabando como _id
            }
        //42.11.7 Realizamos la grabación de la data en DB
            const categoria = new Categoria(data); //lo crea y lo prepara en el modelo
            //GUardar en DB
            await categoria.save(); 
        //42.11.8 Hacemos la response de que se grabo
            res.status(201).json(categoria)               
        };

    //43.5 Esta Funcion actualiza la categoria - recibimos el nombre por uno que no exista
        const actualizarCategoria = async (req,res=response)=>{

        //Extraemos el id
            const {id} =req.params;
        //Extraer información para que no se puieda cambiar el estado ni el usuario
            const {estado, usuario, ...data}= req.body;
        //Grabar el nombre de la categoría en uppercase
            data.nombre= data.nombre.toUpperCase();
        //Establecer el usuario - quien fue el que hizo la última modificacion
            data.usuario = req.usuario._id;
        //Asignar la nueva info al id - guardar en mongo
            const categoria=await Categoria.findByIdAndUpdate(id,data,{new:true});//id de quien quiero ajustar, la data para cambiar, {asignar como un nuevo archivo}
        //Imprimir que ya se grabo la categoría
            res.json(categoria);
        }

    //Esta Funcion borra la categoria - estado false - necesitamos el id y lo verificamos
        const borrarCategoria = async (req,res=response)=>{

        //Tomamos el id (extraemos el id)
            const {id} =req.params;
        //Validar que ya no esté eliminado
            const {estado,nombre} = await Categoria.findById(id)//.populate('usuario','nombre');//lo populamos para que muestre la info del user
            if (!estado){
                return res.status(400).json({
                    msg: `La categoria '${nombre}' está eliminada` 
                });
            };
        //Validar que sea un id que existe en la db                
            const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});//el new true es para que se vean los cambios reflejados en JSON
        //Imprimir 
            res.status(200).json({categoriaBorrada});
        } 


    //Exportar el controlador
        module.exports={
            crearCategoria,
            obtenerCategorias,
            obtenerCategoria,
            actualizarCategoria,
            borrarCategoria
        }