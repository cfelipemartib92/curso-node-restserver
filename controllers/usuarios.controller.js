//creo una constante desestructuranod el response de express
const {response, request}= require('express');
    //lo agrego para ponerlo como default en las funciones response y request
//16.10 IMPORTMAOS PAQUETE ENCRIPTACIÓN
const bcrptjs = require('bcryptjs');
//16.13 se agrega la importación de la función de validación del modelo 16.12
    //16.8 cortamos esto y lo llevamos al middleware validar-campos  
        /*const { validationResult } = require('express-validator');*/
//16.1 importamos el archivo del modelo
const Usuario=require('../models/usuario');//U mayus permite crear instancias del modelo

//creamos funciones y las exportamos

//FUNCION GET - READ
    const usuariosGet = async (req = request, res=response)=> {
        //Para la seccion get creamos la seccion get con una constante
            //const query = req.query;//extraemos los params que vengan en la url: localhost:8080/api/usuarios?q=hola&nombre=fernando&apikey=123456789
        //puedo desestructurarlo:
            //const {q, nombre ='No name', apikey,page=1,limit} = req.query;
        //20.5 desestrucuturamos los argumentos del req.query
            const {limite=5, desde=0} = req.query;
        //20.3 Vamos a crear un get de todos los usduarios (Usuario viene del modelo)
            //20.8 en el find hacemos el filtro de retirar los de estado false (en lugar de eliminarlos)
            const query ={estado:true};
                //20.9(las pongo abajop en la promesa) const usuarios = await Usuario.find(query)
        //20.4 paginamos
            //20.6 utilizamos el argumento de paginación desde con la función skip
                //.skip(Number(desde))
            //transformamos wel string del limite a un número
                //.limit(Number(limite));
        //20.7 mostrar cuantos registros en la db
                //20.9 (las ponemos abajo en la promesa) const total = await Usuario.countDocuments(/*quitamos los estado :false*/query)   
        //20.9 disparar las funciones usuarios y total de manera simultanea
            //desestructuramos los arreglos  - no objetos (cambiamos resp por [])
            const [total, usuarios] = await Promise.all([ //es una colección de promesas - las puedo borrar de arriba
                Usuario.countDocuments(query), //las ejecuta de manera simultanea
                Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
            ])
        
            res.status(200).json({//le mando status 200 (OK)
                //resp //desestructure resp en total y usuarios por lo tanto los llamo:
                    total, usuarios
                //Llamo el conteo total de usuarios:
                    //(20.9 resumimos en promise)total,
                //voy a get los usuarios como un objeto
                    //(20.9 resumimos en promise) usuarios
                        /*ok: true,
                        msg: 'GET API - Controlador',
                            //query//aquí imprimo la funcion que manda
                        //mando el query desustructurado
                        q,
                        nombre, 
                        apikey,
                        page,
                        limit*/
        });
    }

//FUNCION POST - CREATE
    const usuariosPost = async (req, res=response)=> {
        //16.13 desencadeno el middleware de validación de correo (arriba se agrega la importación del method)
        //16.8 cortamos esto y lo llevamos al middleware validar-campos   
                /*const errors = validationResult(req); 
                //verificamos si hay errores
                if(!errors.isEmpty()){
                    return res.status(400).json(errors);//mando un statos con el mansaje de los errores
                } */      
        // 8.2 traigo e imprimo lo montado en el body
            //const body = req.body;
        //8.2.1 puedo desustructurar el body: 
            //const {google...resto}=req.body//puedo agregar lo de google de esta manera
            const {nombre, correo, password, rol} = req.body;
        //16.2 instanciamos el modelo y enlazamos a la variable usuario minuscula:
            //const usuario=new Usuario(body);
                //16.7 instancia desestructurada:
            const usuario=new Usuario({nombre, correo, password, rol});
        //16.3 grabar registro con mongoose
        //16.10 hacemos encriptación password
            //16.10.1. verificar si el correo existe -- documtcn bcrypt js
            //17.1 lo coertamos y lo mandamos al helper de db.validators
                /*const existeEmail = await Usuario.findOne({correo:correo});//16.10
                    if (existeEmail){
                        return res.status(400).json({
                            msg:'El correo ya está registrado'
                        });
                };*/
            //16.10.2. encriptar contraseña/hash de la contraseña
            const salt=bcrptjs.genSaltSync(); //# vueltas para hacer + complicada desencriptación-x defaul=10-le puedo poner más
            usuario.password = bcrptjs.hashSync(password,salt);

        await usuario.save();//guardar en la db

        res.status(201).json({//le mando status 200 (OK)
            //ok: true,
            //msg: 'POST API - Controlador',
            usuario//imprimo la rta del req usuario
            /*body*/ // 8.2 imprimo lo mandado en el body  
            // Nombre, Edad// 8.2.1 imprimo el body desestructurado          
        });//le pongo JSON
    }

//FUNCION PUT - UPDATE
    const usuariosPut = async (req, res=response)=> {
        //express ya lo parsea y lo pne en una propiedad del objeto request
        const {id} = req.params;
        //18.2 desestructuro info del request 
            //extraigo lo qu eno necesito
        const {_id/*Intocable*/,password, google, correo, ...resto} = req.body;
        
        /*//TODO Validar contra base de datos*/
        if (password){
            //llamamos la función hash (encriptar la contraseña)
            const salt=bcrptjs.genSaltSync();
            resto.password = bcrptjs.hashSync(password,salt);
        }
        //actualizar el registro y lo almacena en el objeto usuario
        const usuario= await Usuario.findByIdAndUpdate(id,resto,{new:true});//resto son los argumentos que voy a actualizar

        res./*status(202)*/json({//le mando status 200 (OK)
            //ok: true,
            // puedo borrar este nuevo mensaje: msg: `PUT API - Controlador- id${id}`,
            id //QUIERO QUE ME MUESTRE EL ID
            //agregamos la i9nfo del usuario actualizado
            ,usuario
        });
    }

//FUNCION PATCH - PATCH
    const usuariosPatch = (req, res=response)=> {
        res.status(202).json({//le mando status 200 (OK)
            ok: true,
            msg: 'PATCH API - Controlador'
        });//le pongo JSON
    }

//FUNCION DELETE - DELETE
    const usuariosDelete = async (req, res=response)=> {
        //21.2 disponer del id
            const {id} = req.params;

        //27.8 extraemos el uid del request y lo asignamos a una nueva variable uid
            //const uid = req.uid; vamos a usar el req.usuario
        //21.3 borrar fisicamente
            //const usuario = await Usuario.findByIdAndDelete(id);
            //const mensaje = `Ha sido eliminado el usuario con id: ${id} `;
        //21.4 borrar escondiendolo
            const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
            const mensaje = `Ha sido eliminado el usuario con id: ${id} `;
        //28.1 Autenticar rol de usuario
            const usuarioAutenticado = await req.usuario;
        //imprimir
        res.status(202).json({//le mando status 200 (OK)
            //ok: true,
            //msg: 'DELETE API - Controlador'
            //id
            //voy a retornar el usuario que acaba de ser borrado
            mensaje,
            usuario,
            //27.8 agregamos el uid nuevo para que lo imprima:
            usuarioAutenticado,
            //usuarioAutenticado
        });//le pongo JSON
    }



//Exportamos

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}