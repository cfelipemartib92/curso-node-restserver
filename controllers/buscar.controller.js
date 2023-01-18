//45.3 Configuramos el controller

    //Importamos el express como enlace con el al response de las funciones
        const { response } = require("express");
    //Importamos el modelo de usuario para verificar los id de usuario en las funciones
        const {Usuarios,Categoria,Producto} = require("../models");
    //Importamos el mongoose para validar id en la DB
        const {ObjectId} = require('mongoose').Types;
    //Registramos todas las colecciones que tengo validas para revisar
        const coleccionesPermitidas=[
            'usuarios',
            'categorias',
            'productos',
            'roles'
        ]; 

//FUNCION PARA USUARIO
        const buscarUsuarios = async (termino='',res=response)=>{

        //validamos si el termino es mongo id valido - usamos la funcion Objectid de mongoose para esto con 
            const esMongoID = ObjectId.isValid(termino);//TRUE/FALSE
        //Validamos si es true o false
            if (esMongoID){
                //Importamos la info del modelo
                const usuario = await Usuarios.findById(termino);//el termino es el parametro que estamos revisando
                return res.json({//res es el response de arriba en naeranja que vamos a mandar
                    //en lugar de un if usamos un ternario
                    results:(usuario)?[usuario]:[]//mando los resultados con un ternario (si"condicion)?[resultado]:[else]
                    // results:[usuario]// mando los resultados sea lo que sean en un array
                });
            }
        //Para hacer bùsquedas insensibles - ocupamos expresion regular - ya vienen en js no hay que importar nada
            const regex = new RegExp( termino, 'i' );//esto es para que sea insensible a mayus y minus y sólo poner una letra para que me rtaiga todo lo que contiene
        //buscamos por el termino string de (nombre o correo) en caso de que no se mande el id
            const usuarios = await Usuarios.find({//nombre igual al termino (nombre:termino) -> lo cambiamos a regex para que sea insensible a mayus
                //podemos usar las propiedades de mongo como $and? $nor? entre otras
                $or: [{nombre:regex},{correo:regex}],//Podemos modificar y retirar lo que estado:false - o  poner asi: [{nombre:regex, estado:true}
                $and: [{estado:true}]
            });
        //Agregamos el conteo
            const conteo = await Usuarios.count(
                {$or: [{nombre:regex},{correo:regex}],
                $and: [{estado:true}]
            });
        //imprimimos
            return res.json({
                registros: conteo,
                results:usuarios //si vienen varios hay arreglo, si no, viene vacio
            });
        }


//FUNCION PARA CATEGORIAS
        const buscarCategorias = async (termino='',res=response)=>{

        //validamos si el termino es mongo id valido - usamos la funcion Objectid de mongoose para esto con 
            const esMongoID = ObjectId.isValid(termino);//TRUE/FALSE
        //Validamos si es true o false
            if (esMongoID){
                //Importamos la info del modelo
                const cateogria = await Categoria.findById(termino);//el termino es el parametro que estamos revisando
                return res.json({//res es el response de arriba en naeranja que vamos a mandar
                    //en lugar de un if usamos un ternario
                    results:(cateogria)?[cateogria]:[]//mando los resultados con un ternario (si"condicion)?[resultado]:[else]
                    // results:[usuario]// mando los resultados sea lo que sean en un array
                });
            }
        //Para hacer bùsquedas insensibles - ocupamos expresion regular - ya vienen en js no hay que importar nada
            const regex = new RegExp( termino, 'i' );//esto es para que sea insensible a mayus y minus y sólo poner una letra para que me rtaiga todo lo que contiene
        //buscamos por el termino string de (nombre o correo) en caso de que no se mande el id
            const cateogrias = await Categoria.find(//nombre igual al termino (nombre:termino) -> lo cambiamos a regex para que sea insensible a mayus
                //podemos usar las propiedades de mongo como $and? $nor? entre otras
                {nombre:regex, estado:true}
            );
        //Agregamos el conteo
            const conteo = await Categoria.count({nombre:regex, estado:true});
        //imprimimos
            return res.json({
                registros: conteo,
                results:cateogrias //si vienen varios hay arreglo, si no, viene vacio
            });
        }

//FUNCION PARA PRODUCTOS
    const buscarProductos = async (termino='',res=response)=>{

    //validamos si el termino es mongo id valido - usamos la funcion Objectid de mongoose para esto con 
        const esMongoID = ObjectId.isValid(termino);//TRUE/FALSE
    //Validamos si es true o false
        if (esMongoID){
            //Importamos la info del modelo
            const producto = await Producto.findById(termino)
                                           .populate('categoria','nombre');//agregamos populate para ver mas información
            return res.json({//res es el response de arriba en naeranja que vamos a mandar
                //en lugar de un if usamos un ternario
                results:(producto)?[producto]:[]//mando los resultados con un ternario (si"condicion)?[resultado]:[else]
                // results:[usuario]// mando los resultados sea lo que sean en un array
            });
        }
    //Para hacer bùsquedas insensibles - ocupamos expresion regular - ya vienen en js no hay que importar nada
        const regex = new RegExp( termino, 'i' );//esto es para que sea insensible a mayus y minus y sólo poner una letra para que me rtaiga todo lo que contiene
    //buscamos por el termino string de (nombre o correo) en caso de que no se mande el id
        const productos = await Producto.find({nombre:regex, estado:true})
                                        .populate('categoria','nombre');//para que muestre adicionalmente la categoria y nombre
    //Agregamos el conteo
        const conteo = await Producto.count({nombre:regex, estado:true});
    //imprimimos
        return res.json({
            registros: conteo,
            results:productos //si vienen varios hay arreglo, si no, viene vacio
        });
    }

    //Esta es la función de busqueda flexible
        const buscar =(req, res=response)=>{
            
        //Extraemos del request (body) 
            const {coleccion, termino} = req.params;
        //Validación de uso de colecciones(carpetas) permitidas
            if(!coleccionesPermitidas.includes(coleccion)){
                return res.status(400).json({
                    msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
                })
            }
        //Switch - permite pero no implementa la opcion
            switch (coleccion) {
                case 'usuarios':
                    buscarUsuarios(termino,res);
                    break;
                case 'categorias':
                    buscarCategorias(termino,res);
                    break;
                case 'productos':
                    buscarProductos(termino,res);                    
                    break;            
                default:
                    res.status(500).json({
                        msg: 'Se me olvido hacer la busqueda'
                    })
                    break;
            }
        };
    
    //Exportamos
    module.exports={
        buscar
    }