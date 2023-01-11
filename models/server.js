//traemos la parte de express y la ponemos acá:
    const express = require('express')
//6.4 traemos el CORS recien importado
    const cors = require('cors');
//14.5 importa el archivo (coin el paso anterior automaticamente)
    const { dbConnection } = require('../database/config');

//2.3 creamos clase
    class Server {
        //se declaran las variables en el contrsutrctor
        constructor (){
            this.app=express();//donde voy a almacenar la const app
            //hago visible el puerto a todo el mundo desde el costructor
            this.port=process.env.PORT || 3000;
            //3.3.1 servimos carpeta publica 
                //creando middlewares - funciones que añaden otra funcionalidad
            //7.6 creamos una constante que mantenga las rutas
            this.usuariosRoutePath= '/api/usuarios';
            //23.4 cREAMOS El nuevo path para autenticación
            this.authPath= '/api/auth';
            //14.4 Coneccion a base de datos mongo - le creo un metodo antes de middlewares
            this.conectarDB();

            this.middlewares();
            //cuando llame al constructor llamo las rutas
            this.routes();
        }
    //14.4 creamos metodo para conectar con bd mongo y luego lo montamos en constructor
        async conectarDB(){
            await dbConnection();
        }

    //3.3.1 Creamos metodo para los midelwares - en este caso para servir la carpeta public
        middlewares(){
            //6.5 Agregamos los comandos para llamar el CORS recien integrado
            this.app.use(cors());
            //8.1 configuramos el middleware para leer la info que nos llega-
                //(LECTURA Y PARSEO BODY))
            this.app.use(express.json());


            //use es la palabra clave para los middlewares
                //directorio publico:
            this.app.use(express.static('public'));
        }

    //4.2 creo un metodo para definir las rutas (ENDPOINT)
        routes(){
    //7.4 cortamos y pegamos las rutas en el nuevo archivo de Routes: User.js
            /*
            //lo transofrmo en funcion de flecha -- (el index es lo que se publica en este path)
            this.app.get('/api', (req, res)=> {//esto se vuelve un endpoint/api
                res.send('Hello World')
            });

            //probando endpoint con json GET -- read cRud
            this.app.get('/the-api', (req, res)=> {
                res.status(403).json({//le mando status 403 (forbidden)
                    ok: true,
                    msg: 'get API'
                })//le pongo JSON
            });
            
            //probando PUT -- actualizar crUd
            this.app.put('/the-api', (req, res)=> {
                res.json({
                    ok: true,
                    msg: 'put API'
                })
            });
            
            //probando POST -- crear Crud
            this.app.post('/the-api', (req, res)=> {
                res.status(500).json({//status  mensaje creado 5.1
                    ok: true,
                    msg: 'get API'
                })//le pongo JSON
            });
            
            //probando DELETE -- borrar cruD
            this.app.delete('/the-api', (req, res)=> {
                res.json({
                    ok: true,
                    msg: 'delete API'
                })//le pongo JSON
            });

            //probando PATCH
            this.app.patch('/the-api', (req, res)=> {
                res.json({
                    ok: true,
                    msg: 'patch API'
                })//le pongo JSON
            });*/
        //23.4 Creamos una nueva ruta para autenticación
            this.app.use(this.authPath, require('../routes/auth.route'));
        //7.5 llamamos las rutas al server por medio de un middleware condicional:
            //7.6 le agregamos el string qe acabamos de crear arrib aen el constructor
            this.app.use(this.usuariosRoutePath, require('../routes/usuarios.route'));
        }
        
        //creo metodo para agregar el puerto
        listen(){
                //1.9.4 Asigno el puerto - Llamo el puerto del constructor
            this.app.listen(this.port, ()=>{//est mensaje me confirma que está tomando el puerto
                console.log('servidor corriendo en puerto', this.port);
            });      
        }
    }


//2.4 exportamos el archivo
module.exports= Server;
