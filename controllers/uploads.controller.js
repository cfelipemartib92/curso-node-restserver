//48.2 Configuracion controlador uploads 
    //copiamos y pegamos estas importaciones en el helper:
        //48.6 Importación Paths para facilitar su uso
            //const path = require('path');
        //48.8 Importamos el paquete de asignación automatica de id
            //const { v4: uuidv4 } = require('uuid');
    //Importación del response de paquete de express
        const { response } = require("express"); // aydua con el tipado de varias funcionalidades
    //Importacion de mongoose para conección con DB
        const { model } = require("mongoose");
    //Importacion del helper donde montamos validaciones para funcion subirArchivo
        const { subirArchivo } = require("../helpers");
    //48.11 Importación de los modelos para 
        const { Producto, Usuarios } = require('../models');
    //48.12 Importamos el path - incluido en node
        const path = require ('path');
    //48.12 Importamos el fs de node
        const fs  = require ('fs');
    //48.14 Importamos paquete cloudinary
        const cloudinary = require('cloudinary').v2;
    //Configuramos nuestra cuenta con la de cloudinary - para que nos lea
        cloudinary.config(process.env.CLOUDINARY_URL);





    //Función para cargar archivos - copaido y pegado de la documentación
        const cargarArchivo = async (req, res=response)=>{

            let nombre; 

        //Pregunta si se está enviando un archivo, sino manda el 400
            /*if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
                res.status(400).json({msg: 'No hay archivos que subir'});
                return;
            }*/
        //Pregunta si en la petición key:archivos, está vacio - o se pone arriba
            /*if (!req.files.archivo) {
                res.status(400).json({msg: 'No hay archivos que subir'});
                return;
            }*/
        //Copiamos y pegamos la lógica de las validaciones en un helper
        
        //48.9.1.2 Pegamos la función del middleware - req.files es lo que le voy a mandar a los files del helper
            //ext permitidas imagenes
            //48.10 Agregamos extensiones que necesito - puede por medio de constante o direcatemnte en el()
        //lo metemos dentro de un trycatch para atrapaer el error
            try {
                    //estructura función: (files , extensionesValidas=validext, carpeta='')=>
                //const nombre = await subirArchivo(req.files,['txt','md'] ,'textos');
                //const nombre = await subirArchivo(req.files,['png','jpg','jpeg','gif'] ,'imagenes');
                const nombre = await subirArchivo(req.files,undefined ,'imgs');//undefined= default

                res.json({
                    nombre
                })

            } catch (msg) {
                res.status(400).json({msg})
            }
        }

    //48.11 Funcion para actualizar fotos
        const actualizarImagen = async (req, res=response)=>{//validaciones en db son asincronas

        //48.11.7 Validamos que se envíe el archivo
            /*if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
                res.status(400).json({msg: 'No hay archivos que subir'});
                return;
            }*/

        
        //Desestructuro los argumentos que voy a recibir (id, coleccion)
            const {id,coleccion} = req.params; //son los que definí en la ruta

        //Establecemos el valor de let de manera condicional
            let modelo;
        
        //Revisamos los diferentes casos a revisar
            switch (coleccion) {
                case 'usuarios':
                    //modelo es la variable de arriba
                    modelo = await Usuarios.findById(id)
                    
                    if (!modelo){

                        return res.status(400).json({
                            msg: `No existe un usuario con el id ${id}`
                        })
                    }

                break;
                case 'productos':
                    modelo = await Producto.findById(id)
                    
                    if (!modelo){

                        return res.status(400).json({
                            msg: `No existe un producto con el id ${id}`
                        })
                    }
                break;
            
                default:
                    //server error (500)
                    return res.status(500).json({
                        msg: 'Se me olvido validar esto'
                    })
            };

        //48.12.1 Limpiar imagenes rpevias
            if(modelo.img){ // modelo.img es lo que tenemos en el mongo (lo estamos trayendo)
                //Hay que borrar la imagen del servidor - importamos en la parte superiror el path
                const pathImagen = path.join(__dirname,'../uploads', coleccion,modelo.img); //si está en la coleccion que lo estamos buscando 
                //importamos fs de node arriba y valdiamos si existe el file
                    //console.log(pathImagen);//path imagen trae un url unificado con la direccion de donde se debería encontrar el archivo
                if (fs.existsSync(pathImagen)){
                        fs.unlinkSync(pathImagen);                        
                }
            }

        //48.11.6 Agregamos la variable de la imagen que vamos a subir
            const nombre = await subirArchivo(req.files,undefined ,coleccion);//coleccion es el nombre de la carpeta que toma el switch del rest
        //48.11.6 Configuramos el controlador para guardar la imagen en la propiedfad img
            modelo.img = nombre;
        //Salvar en base de datos
            await modelo.save()
        //Imprimir
            res.json(modelo);

        }



    //48.14 Funcion para actualizar fotos con cloudinary
        const actualizarImagenCloudinary = async (req, res=response)=>{//validaciones en db son asincronas

        //48.11.7 Validamos que se envíe el archivo
            /*if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
                res.status(400).json({msg: 'No hay archivos que subir'});
                return;
            }*/

        
        //Desestructuro los argumentos que voy a recibir (id, coleccion)
            const {id,coleccion} = req.params; //son los que definí en la ruta

        //Establecemos el valor de let de manera condicional
            let modelo;
        
        //Revisamos los diferentes casos a revisar
            switch (coleccion) {
                case 'usuarios':
                    //modelo es la variable de arriba
                    modelo = await Usuarios.findById(id)
                    
                    if (!modelo){

                        return res.status(400).json({
                            msg: `No existe un usuario con el id ${id}`
                        })
                    }

                break;
                case 'productos':
                    modelo = await Producto.findById(id)
                    
                    if (!modelo){

                        return res.status(400).json({
                            msg: `No existe un producto con el id ${id}`
                        })
                    }
                break;
            
                default:
                    //server error (500)
                    return res.status(500).json({
                        msg: 'Se me olvido validar esto'
                    })
            };

        //48.15 Limpiar imagenes previas en cloudinary --
            if(modelo.img){ // modelo.img es lo que tenemos en el mongo (lo estamos trayendo).
               const nombreArr = modelo.img.split('/');//partimos la url
               const nombre = nombreArr[nombreArr.length - 1]; //para obtener lo último después de / 
               const [public_id] = nombre.split('.');//partimos el nombre por .

               //Eliminamos lla imagen anterior
               cloudinary.uploader.destroy(public_id);
            }

        //48.14 Traemos el tempFilePath que viene del archivo montado s
            const {tempFilePath} = req.files.archivo;
        //48.14 Montar imagen a cloudinary - le mando un path (nombre del archivo)
            //no tengo que mandarle todo el resp, sólo le tengo que mandar el secure_url
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        //48.14 Configuramos el controlador para guardar la imagen en la propiedfad img - el secure_url
            modelo.img = secure_url;
        //Salvar en base de datos
            await modelo.save()
        //Imprimir d
             res.json(modelo);
        }

//48.13 Funcion para mostrar imagenes
    const mostrarImagen = async (req, res=response) =>{

    //Desestructuro los argumentos que voy a recibir (id, coleccion)
        const {id,coleccion} = req.params; //son los que definí en la ruta

    //Establecemos el valor de let de manera condicional
        let modelo;
    
    //Revisamos los diferentes casos a revisar
        switch (coleccion) {
            case 'usuarios':
                //modelo es la variable de arriba. 
                modelo = await Usuarios.findById(id)
                
                if (!modelo){

                    return res.status(400).json({
                        msg: `No existe un usuario con el id ${id}`
                    })
                }

            break;
            case 'productos':
                modelo = await Producto.findById(id)
                
                if (!modelo){

                    return res.status(400).json({
                        msg: `No existe un producto con el id ${id}`
                    })
                }
            break;
        
            default:
                //server error (500)
                return res.status(500).json({
                    msg: 'Se me olvido validar esto'
                })
        };

    //48.13.2 Presentar imagen guardada
        if(modelo.img){ // modelo.img es lo que tenemos en el mongo (lo estamos trayendo)
            //organizamos el path donde buscar - importamos en la parte superiror el path
            const pathImagen = path.join(__dirname,'../uploads', coleccion,modelo.img); //si está en la coleccion que lo estamos buscando 
            //importamos fs de node arriba y valdiamos si existe el file
                //console.log(pathImagen);//path imagen trae un url unificado con la direccion de donde se debería encontrar el archivo
            if (fs.existsSync(pathImagen)){
                    return res.sendFile(pathImagen);//¡ Imprimimos la imagen !                        
            }
        }

    //48.13.3 Imprimir en caso de false.
        //constante con la imagen que no tiene nada. 
        const pathImagen = path.join(__dirname,'../assets/no-image.jpg');
        //Imprimimos la imagen de la constante 
        return res.sendFile(pathImagen); // en caso de que no tenga una imagen. 

    }


    //Exportamos
        module.exports= {
            cargarArchivo,
            actualizarImagen,
            mostrarImagen,
            actualizarImagenCloudinary
        }