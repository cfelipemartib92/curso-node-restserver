# Información importante Rest server

0. Banderas:
    0.1 comandos consola: #_
    0.2 instalaciones : &_
    0.3 Creación de archivo : %_

1. Clase 104 - Incialización proyecto:
    1.1 iniciamos config el JSON node js con el comando: &_ npm init -y
    1.2 creamos el punto de entrada de la app (app.js)
    1.3 lanzamos la aplicación con el comando: #_ nodemon app.js
    1.4 instalamos el express server: &_ npm install express
    1.5 instalamos el dotenav (el environment) : &_ npm install dotenv
    1.6 activamos de nuevo el nodemo
    --- MONTAJE WEB SERVER ---
    1.7 Montamos webserver con (buscamos en google npm express y nos muestra como)
        1.7.1 está en la documentación de express - copiamos y pegamos
        1.7.2 probamos con el nodemon activado montando localhost:3000 en el buscador
    1.8 Configuramos carpeta publica
    1.9 Cofiguramos el puerto en el archivo de .env
        1.9.1 Creamos el archivo en raiz llamado  %_ .env
        1.9.2 Agregamos el puerto como PORT=8080
        1.9.3 hacemos el require del paquete .env
        1.9.4 Asignamos el puerto al servidor express en archivo app.js
        19.5. vamos a mover todo a una clase para que se muevan desde allá
2. Clase 105 - Express basado en clases - vamos a mover todo el webserver a una clase
    2.1 creamos un nuevo directorio llamado %_ models
    2.2 creamos primer modelo llamado : %_ server.js
    2.3 creamos la clase internamente
    2.4 exportamos el archivo con el module.exports
    2.5 creamos la clase en archivo server.js < models
    2.6 conectamos el server con la pp.js
    2.7 avanzamos con el metodo listen
3. Configuramos nuestra carpeta púlica y creamos respuesta *
    3.1 creamos carpeta: %_ public
    3.2 creamos dentro de public el archivo: %_ index.html
    3.3 conectamos la carpeta publica
        3.3.1 creamos el middleware en el archivo server < models
4. Clase 106 ----------Peticiones: HTTP - GET - PUT - POST - DELETE ----------------
    4.1 Creamos 4 endpoints 
        4.1.1 Get regresa lo que se indica cuando se solicita
        4.2 en el server.js probamos los put-get-post-delete
        4.3 probamos en postman como simulación
5. Clase 107 usando codigos de respuyesta http en Express
    5.1 se le agrega el status(#) en la respuesta del server
    5.2 400 es del autor del frontend - 500 es responsabilidad del backend
6. Clase 109 - CORS - MIDDLEWARE-----------------------------------------------------
    6.1 Instalamos el middleware CORS (https://www.npmjs.com/package/cors) con el comando:
    * &_ npm i cors 
    6.2 Que el api sólo ciertas pag accedan a ella - proteger el cors - siempre instalarlo
    6.3 Permite proteger el servidor de manera superficial - (Cross origin access error) - restringir - lista blanca - lista negra- 
    6.4 los middlewares usan los comandos "app.use"
    6.5 lo llamamos desde el metodo middlewares del archivo server.js
7. Clase 110 - Separar las utas y el controlador de la clase
    7.1 vamos a crear un archivo de rutas y otro archivo de controladores
    7.2 creamos una nueva carpeta llamada %_routes
    7.3 creamos un archivo en routes con las rutas para los usuarios llamada %_usuario.route.js
    7.4 llamamos la funcion reoutes de express y luego cortamos y pegamos las rutas del server
    7.5 Llamamos las rutas al server con un middleware
    7.6 Resumimos las rutas en el server constructor
    7.7 vamos a separar as rutas y el controlador creando un nuevo carpeta llamada %_ controlers y un archivo lamado %_usuarios.controller.js
    7.8 copiamos la dfuncion del contro0lador y lo pegamos en la ruta 
    7.9 traemos las funciones al inicios de la route
8. Clase 111 - Obtener datos de u PSOT
    8.1 configurar donde quiero recibir la información por medio de otro middleware en express - esto lo monamos en la clase de middlewares: this.app.use(express.json());
    8.2 en los controladores monto donde quiero que se vea lo del body
    clase 112 - parametros de segmento y query:
    8.3 actualizar al usuario con id 10 - parametros de segmento - PUT (UPDATE)
    8.3.1 en la seccion request del controlador agregamos las instrucciones
    8.3.2 agregamos de manera dinamica las url dinamicas en las rutas (id) 
        * router.put('/:id', usuariosPut);
    8.3.3 Agregamos en PUT: const id = req.params.id EN LA SECCION REQ de la funcion PUT
    8.4 obtener query params para la función get
    8.4.1 en el controlador configuramos los query params de GET
9. Clase 1013 - Respaldo del RestServer a GitHub -------------------------------------
    9.1. creamos el rest server como lo necesito (server.js)
    9.2. creo el archivo para montar todo sin los modulos de node llamado %_.gitignore
    9.3 agrefamos los modulos que no queremos que estén en el git (modulos de node)
    9.4 realizamos los siguientes comandos:
        *#_ git init
        *#_ git add . //
        *#_ git commit -m "Primer Commit"
        //si algún día borro todo utilizo un #_ git checkout --. para reestablecer según el último 
    9.5 creamos el repositorio en git con el nombre que queramos
    9.6 una vez creado nos comparte los comandos para alinearlos:
        *#_ git remote add origin https://github.com/cfelipemartib92/curso-node-07-restserver.git
        *#_ git branch -M main
        *#_ git push -u origin main
        -----
        para agregar un nuevo ajuste en git le insertamos después del git commit:
        *#_ git push 
    9.7 para crear una versión de como tengo el proyecto en este momento:
        9.7.1 creo un release tag con el codigo #_ git tag -a v1.0.0 -m "Fin sección 8"
        9.7.2 lo subimos a git con:
        * #_ git push --tags
        Se crea un tag en la seccion dereca y se puede guardar a como estaba hasta este momento
    10. Clase 114 - Subir RESTSERVER a RailWay ----------------------------------------
        10.1 abrimos el archivo en github
        10.2 seleccionamos el boton arrib a a la izquiera: "main" -> luego seleccionamos la versión que queremos montar: "v1.0.0" -> le ponemos como nombre: "1.0.0-rc-1" //#versiónMayor.#NuevasFuncionalidadesMismaApp.#BugFixes-ajustes-rc=releaseCandidate-versión1
        10.3 seleccionamos create branch
        10.4 hicimos algunos ajustaes para mejorar el performance como:
            * en el archivo package.json montamos un script en "scripts" agregando:{"start":"node app.js"}  --- y guardamos los cambios como new script added
            *comentamos los archivos .env con un # antes del port
            *en alrchivo models->server.js, y en la parte de PORT se le pone la opcion de ...env.PORT || 3000 
        10.5 montamos en railway +new project->selecciono el proyecto-> como no quiero desplegar el main sino mi rama agrego +add variables-> voy a settings y cambio el main por la rama 1.0.0-rc-1 -> vamos a deployments... cuando esté en succes hacemos click -> en deploy logs veo donde lo está sirviendo (el peurto)
        10.6 para verlo desde internet voy a settings > click en "generate domain" -> se genera un dominio y lo despliega:
    11. Clase 115 - Protip: Ambiente de produccion y desarrollo en postman
        11.1 puedo generar variables de entorno para cambiar url de produccion y url de desarrollo
        11.2 en postman voy a environments -> + -> le pongo nombre -> creo una variable y le pongo url -> copio y pego la url base de produccion de railwat (en este caso: https://curso-node-07-restserver-production.up.railway.app/)
        11.3 creo el environment de pruebas (desarrollo-node)
        11.4 ya para aplicarlo en el postman, quiuto la url inicial y le pongo {{url}} ('es una variable de entorno') - ejemplos:
            * {{url}}/api/usuarios/10
            * {{url}}/api/usuarios?q=hola&apikey=123456789&limit=10&page=101
    12. Seccion 9 - Clase 119
        12.1 Alcances RESTServer y mantenimiento de la coleccion de usuarios-*--------
        Definir los alcances de nuestro RESTServer
        * CRUD
        * Encriptación de contraseñas
        * Validaciones personalizadas
        * Creación de roles
        * Conexiones con MLAB
        12.2 Se crea base de datos con 3 colecciones:
            * usuarios
            * categorias
            * productos
            -- id automatico en todas tablas
        12.3 creamos usuario en mongo atlas y un usuario para data cess
        12.4 en el archivo .env montamos el user y el paswword
        12.5 damos la propiedad de read and write to any database
        12.6 Probamos la conexion - vamos a cluster ->connect ->connect using mongoDB Compass -> I have mongodb comass - 1.12 or later-> copiamos la cadena de conexion "mongodb+srv://user_node_cafe:<password>@clustercfmb.pcbsm9p.mongodb.net/test"
        12.7 agrego en las variables de entorno el link de la conxión al cluster del compass
        12.7.1 LE PONEMOS el user y el password en <username> y <password> - quitandole el <> 
        12.8 no voy a apuntar al test y la voy a cambiar por cafeDB (NOMBRE DE BASE DE DATOS) - Se lo pongo al final del MONGO_CNN= del .env
        12.9 ya podemos cerrar la pagina web y desde el compass podemos continuar
    13. Clase 124 - conectar mongo con mongo atlñas en la nube
        13.1 utilizaremos paquete MONGOOSE - (odm: modelador de objetos) = facilita crud, queries, limpiar, prevenir injecciones, entre otros - más facil que sql
        13.2 linkde mongoose: https://mongoosejs.com/
        13.3 instalamos el mongoose:
            * &_ npm i mongoose
    14. Creamos base de datos y lo relacionado
        14.1 creamos carpeta %_ database
        14.2 creamos archivo $_ config.db.js
        14.3 configuramos el archivo config
        14.4 lo llamamos en el modelo server
        14.5 importa el archuivo config.db en el server (modelo) (en el constructor,como metodo y en las improtaciones)
    15. Creamos el MODELO de usuario
        15.1 creamos un nuevo archivo en carpeta models %_ usuario.js
        15.2 configuramos el archivo usuarios
    16. Clase 126 POST - Grabar usuario en coleccion BD------------------------------
        16.1 IMPORTAMOS AL CONTROLADOR el arcuhvo del modelo ()
        16.2 configuramos la función POST
        16.3 solicitamos a mongoose que grabe el registro
        16.4 PROBAMOS CON postman mandando  
        16.5 Encriptamos la contraseña con hash de una sola via y google no puede ser modificable
        16.6 "no confiar en la persona del forntend" - se tienen que validar todos los endpoints
        16.7 ajustamos para que se grabe sólo la info correcta ***
        16.8 ENCRIPTAMOS LA CONTRASEÑLA CON UN PAQUETE------------------------
        16.9 el paquete para encripatr la contraseña se hace con el comando: 
            * &_ npm i bcryptjs
        16.10 requerimos el paquete de encriptación de contraseñas en el controlador usuarios y en la función pòst
        16.11 hacemos la validación del correo con un paquete------------
            * &_ npm i express-validator //podemos ver la info (colección de middlewares)
        16.12 agregamos las demás validación en el usuarios.routes en la sección de POST en la segundfa posición para que se lea como un middleware (los prepara y en el controlador los desencadeno)
        16.13 desencadeno los middlewares en el controlador
        16.14 Validamos los campos que creamos en nuestro modelo mongoose
        16.15 en la route de post generamos una nueva linea de validación - otro middleware
        16.6 CREO UN MIDDLEWARE PERSONALIZADO 
        16.7 CReo una carpeta llamada: %_ MIDDLEWARES
        16.7 CReo una archivo en middlewares llamado: %_ validar-campos.js
        16.8 Copiamos y pegamos el validador del controler y los pasamos al nuevo middleware
        16.9 agregamos la funcion next en los parametros
        16.10 llevamos la función del middleware validar-campos al final de los middlewares de usuarios (routes)
        16.11 importamos el archivo validar campos.js (middlewares)
        16.13 validamnos el rol contra base de datos ----------------------------
        16.14 vamos a mongo compas y creamos la colección para las bases de datos llamada roles
        16.15 puedo agregar la data directamente en MongoDB Compass haciendo click dentro de la colección en 'ADD DATA'->'insert document'->agregamos como JSON los valores (mongo le crea el unique id)
        16.14 creamos un modelo para leer los roles - models< %_ role.js
        16.15 en usuarios.route hacemos la validación de los roles contra la nueva db de mongoose
        16.16 importamos el schema de roles EN LA RUTA "usuarios.route.js"
        16.17 para centralizar la validación del role vamos a crear una carpeta en la raiz llamada %_ helpers
        16.18 creo un archivo en helpers llamaod %_ db-valdiators
        16.19 cortamos y pegamos la función de validación del rol en la ruta al nuevo archivo de helpers->db validators
        16.19.1 tambnién llevamos la importación del modelo rol
        16.20 ajustamos y limpiamos la validación del rol en la ruta de usuarios 
        16.21 quitamos la contrasseña del resultado en la consola
    17. Clase 132 - Validación si el email existe 
        17.1 meterlo en la ruta y en el routes- sacarlo del controlador-crear la funcion en validator (importarlos en donde se vaya a usar)
    18. PUT - ACTUALIZAR INFORMACIÓN DE USUARIO -----------------------------------
        18.1 creamos y guardamos el put en el postman para probar
        18.2 vamos al controller del put y lo actualizamos
    19. Validaciones adicionales de PUT- ------------------------------------------
        19.1 vamos a las rutas y creamos nuevas verificaciones
        19.2 en los helpers db validators hacemos las validaciones nuevas al id (existeUsuarioPorId)
        19.3 importamos en las rutas la nueva funcion de validación de id (db validators)
        19.4 en las rutas agregamos un nuevo check middleware para enlazar con la validación de id
        19.5 puedo copiar y pegar la validación de rol también que usamos en post
    20. OBTENER LOS USUARIOS DE FORMA PAGINADA--GET---------------------------------
        20.1 Clase 135 - Creamos en el postman un nuevo get con ela url {{url}}/api/usuarios y creamos 15 nuevos usuarios con el rol "user_tole
        20.2 puedo eliminar el mensaje del controlador 
        20.3 en el controlador creamos el get de todos los usuarios (lo ponemos await y aync para hacerlo asyncrono)
        20.4 vamos a paginar el get para enviar parametros para el read de los usuarios
        20.5 desestructuramos los argumentosa que vendran en el re.query
        20.6 agregamosel argumeto desde... puede quedar de la siguiente forma: {{url}}/api/usuarios?desde=5&limite=10
        20.7 montar cuantyos registros tiengo guardados en la base de datos
        20.8 en el controlador hago el filtro de sacar los que tengan el estado false en lugar de eliminarlos 
        20.9 disparamos las funciones de paginaciíon e impresión de manera simultanea
    21. DELETE: BORRANDO USUARIOS ---CLASE 137 --------------------------------------
        21.1 Agregamos el id en las rutas del delete - router delete
        21.2 al llamar la ruta voy a disponer del id
        21.3 borrarlo de la base de datos fisicamente
        21.3.1 validaciones en las routes
        21.3.2 en el controlador ajustamos la función 1. async, 2.crear constante con funcion Usuario.findByIdAndDelete(id)
        21.4 borrarlo desde el estado, no se elimina sólo se le cambia el estado con la función .findByIdAndUpdate(id, {estado:false}); -- el estado es false
    22. desplegamos en railway
            #_ git add .
            #_ git commit -m "Fin seccion 9"
            --Creamos una nueva rama para este despliegue
            #_ git checkout -b 2.0.0
            --Lo montamos a github
            #_ git push
            --Aparece un error y nos sugiere usar el siguiente comando para crear el branch
            #_ git push --set-upstream origin 2.0.0



        




