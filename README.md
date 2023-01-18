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
    23. CREAR UNA RUTA DE AUTENTICACIÓN----------------CLASE 147--------------------
        23.1 buscamos crear una nueva url de autenticación -POST: {{url}}/api/auth/login
        23.2 Crear controlador %_ auth.js con sus configuraciones
        23.3 Crear Ruta %_ auth.js y la configuramos 
            *(traemos los validadores,la función del router, la ruta al login llamando al controlador (importa el controlador automáticamente))
        23.4 Especificar en el modelo del server 
            * En el modelo server.js Creamos un nuevo path después de usuarios path para autenticación
            * Vamos a la sección de routes() y creamos un nuevo metodo definiendo la ruta con el require
        23.5 ajustamos la ruta para que reciba los nuevos valores de correo y password
    24. LOGIN DE USUARIO ------------------------------------CLASE 148----------
        24.1 En el controlador de auth configuramos el login, extrayendo el login y el password
        24.2 evitar poner dos res en el flujo de una función del controlador
        24.3 verificamos si el email existe, está activo, contraseña y luego generamos el JWT
        24.3.1 llamamos el modelo usuario para la verificación de correo y su estado
        24.3.2 llamamos el bcrypt para validación de contraseña
    25. GENERAR JWT ------------------------------- CLASE 149----------------------
        25.1 instalamos un nuevo paquete para generar los tokens:
            * &_ npm install jsonwebtoken
            * Se necesita convertir el callback en una promesa
        25.2 actualizamos el controlador del auth en la sección de gernar el JWT
        25.3 Creamos en los helpers un archivo llamado:
            * %_ generar-jwt.js
            * creamos su constante
            25.3.1 en el helper importamos el npm jsonwebtoken 
                * agregamos el public key que creamos en el el .env (25.4)
                * agregamos el callback con el error y el token
        25.4 en las variables de entorno agregamos el secret token key
        25.5 se importa el helper de generar-jwt.js al controller de auth
    26.  CAMBIAMOS VISUALMENTE :ID POR UID EN MONGOOSE --------- CLASE 150---------
        26.1 en el modelo extraemos el _id del escquema (secciñón 16.21)
        26.2 mostramos el _id como uid asignando sus calores al usuario uid en el modelo usuarios
    27  PROTEGER RUTAS MEDIANTE USO DE TOKEN  - MIDDLEWARES ---CLASE 151 ----------
        27.1 Creamos validación para que elemine un user sólo si tiene un jwt valido
        27.2  para eso vamos a crear un middleware llamado:    
            * %_ validar-jwt.js
            * dentro del middleware llamamos el paquete jsonwebtoken
            * creamos la función validarJWT
            * exportamos el middleware
        27.3 para mandar lo jwt normalmente se manda en los headers de postman con el key llamaod authorization con un vlaue o le puedo poner algo personalizado para saber el header que están esperando... de igual manera se llamara: x-token en el header de la operación delete con el value del token: abc123
            * key: x-token
            * value: abc123
        27.4 leemos el header en la función del middleware que tiene el nombre de la key y el token:   
            * key: x-token
            * value: abc123
        27.5 agregamos el middleware en el router de usuarios (usuarios.route.js)
            * se importa en el route
            * agregamos la fución al delete
        27.6 en el middleware jwt agregamos la validación 
        27.7 extraemos el uid del usuario en el middlewaer u la asignamos a la propiedad del request uid
        27.8 en el controlador de los usuarios, en la funcióin usuarios delete podemos extraer el uid
    28. OBTENER INFORMACIÓN DEL USUARIO AUTENTICADO ---------CLASE 152------------
        28.1 en el middleware llamamos el modelo
        28.2 en el middleware de validar agregamos el req.usuario (volvemos la función validar async) 
        28.3 En el controller UsuarioDelete realizar las actualizaciones
        28.4 Agregar validación que el usuario eliminado no se puede volver a logear
            *en el middleware agreego la validación if (28.4)
        28.5 validación que si el usuario está undefined que me lo saque
    29. VERIFICAR ROL ADMINISTRADOR EN DELETE ---------------CLASE 153 -----------
        29.1 Creamos un nuevo middleware llamado:
            * %_ validar-reoles.js
            * Se tiene que agregar después del middleware JWT
        29.2 Agrego en el ROUTER de delete (usuarios.route.js) la función del middleware después del Mdwr JWT
            * se importa y se agrega después del JWT
    30. VERIFICAR QUE EL MIDDLEWARE TIENE UN ROLE ---------CLASE 154 ------------
        30.1 Comentamos el middleware de validación de Admin
        30.2 En el router Crear un validadro que pueda tener uno o varios role
            *llamada:  tieneRole('ADMIN_ROLE','VENTAS_ROLE') (con los roles que queremos dejar pasar
        30.3 Agregamos la función en el middleware de validador de roles y la función la llamaremos: tieneRole()
        30.4 lo exportamos en el router de usuarios (agregamos dentro de los {} la función con los corchetes
    31. OPTIMIZAR IMPORTACIONES EN NODE -----------------CLASE 155---------------
        31.1 Podemos unificar las tres importaciones de middlewares en uno solo
        31.2 Creamos en middlewares un archivo llamado:
            * %_ index.js
        31.3 copio todos las importaciones de middlewares en el router de usuarios y los pego en el middleware index.js
        31.4 en el index.js cambiop lo que está en {} por unas constantes que denoten el llamado al archivo middleware
        31.5 SUMARIZO TODAS LAS FUNCIONES EN constantes al momento de exportarlo con operador ...
        32.6 aplico exportaciones al router con todas los middlewares unificados
    32. DESPLIEGUE RAILWAY POR CUENTA PROPIA --------CLASE 156-------------------
        32.1. Cambios en su repositorio
            *git add .
            *git checkout -b 3.0.0
            *git commit -m "Fin sección 10 - version 3.0.0"
        32.2.Crear y subir una rama
            *git push
            *(Ese comando dará un error)
            *Usar el comando en la descripción del error para subir la rama.
        32.3. En Railway, seleccionar la rama 3.0.0 para desplegar
        32.4. Revisar si hay cambios en variables de entorno necesarias
        32.5. Esperar que el deployment se realice, si aparecen errores, tratar de corregirlos y probar de nuevo.
    
    ------------------   GOOGLE SIGN IN - FRONT END Y BACKEND    ----------------

    33. GENERAR API Key y API SECRET DE GOOGLE----------CLASE 162----------------
        33.1 Vamos al enlace de google identity: https://developers.google.com/identity/gsi/web/guides/overview
        33.1.1 Vamos a lsa sección de setup en la barra de menú de la izquiera
        33.1.2 Seguir las instrucciones: https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
            *Open the Credentials page of the Google APIs console.
            Create or select a Google APIs project. If you already have a project for the Sign In With Google button or Google One Tap, use the existing project and the web client ID.
            
            *If your project doesn't have a Web application-type client ID, click Create credentials > OAuth client ID to create one. Be sure to include your site's domain in the Authorized JavaScript origins box. Please note that Google One Tap can only be displayed in HTTPS domains. When you perform local tests or development, you must add both http://localhost and http://localhost:<port_number> to the Authorized JavaScript origins box. The Referrer-Policy header must also be set to no-referrer-when-downgrade when using http and localhost.

            *Key Point: Google One Tap can only be displayed in HTTPS domains.
            *Key Point: Add both http://localhost and http://localhost:<port_number> to the Authorized JavaScript origins box for local tests or development.
            *Key Point: Set the Referrer-Policy: no-referrer-when-downgrade header when testing using http and localhost.
            *Note: You need the client ID string that's displayed in the console to configure Sign In With Google and to verify ID tokens on your backend. A client ID looks like the following example:
            *1234567890-abc123def456.apps.googleusercontent.com
        33.1.3 Hacemos click en Google APIs Console-> luego creamos la cuenta-> creamos un nuevo proyecto-> seleccionamos el nuevo proyecto-> vamos a credenciales (dentro de apis y servicios menu de la izquierda) ->  click en el enlace de pantalla de concentimiento (del siio de google identity setup)-> pantalla de consentimiento (en el enlace que nos abrió)->Seleccionamos externos y crear->llenamos la info del sitio-> Asigné el correo de softnetholding@gmail.com -> Desuès de página de consentimiento-> vamos a credenciales -> Crear credenciales -> ID de cliente de OAuth->Asignamos aplicación web-> Agreegamos nombre -> agregar URI como: http://localhost y http://localhost:8080 -> Crear -> se generaron dos códigos: 
            *id de cliente: 1097195241288-adniv9883u2ijhjesbte7mkp4n545lbs.apps.googleusercontent.com
            *secreto del cliente: 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 (Esto sirve para hacer verificaciones)
        creamos dos variables de entorno con estos códigos ()

    34. USUARIO DE GOOGLE FORNT END--------------------------------CLASE 163---
        34.1 AGREGAMOS BOTÓN DE GOOGLE SIGNIN
        34.2 Vamos a nuestro archivo público en localhost8080
        34.3 en la documentación vamos a "Display the Sign In With Google button"  (opciones del menu a la izquierda) 
        34.3.1 Copiamos y pegamos el script en el body "<script src="https://accounts.google.com/gsi/client" async defer></script>"
        34.3.2 Copiamos y pegamos todo el codigo del html de la sección donde muestr el código y lo pegamos en el body
        34.3.3 Eliminamos en el index.html el login uri para hacerlo semimanual -es una redirección a nuestro endpoint
        34.4 Luego vamos en la documentación a "Handle credential responses with JavaScript functions" https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions
        34.4.1 Copiamos el código de calllback y lo traemos
        34.4.2 Copiamos y pegamos todo el resto del script y lo pegamos hacia el final (34.4.2)
        34.5 Asignamos el client id en el index donde corresponde (en el div con id "g_id_onload" en la función data-client_id )
        34.6 En el script retiramos la función y sólo imprimimos en consola el google token
        34.7 En el explorador podemos ver el boton y podemos salir accediendo a inspeccionar->application->cookies->elimnar todas las cookies
        34.8
    35. RUTA PARA MANEJAR AUTENTICACIÓN DE GOOGLE -------CLASE 164--------------------
        35.1 Vamos a abrirl e token desde el backend
        35.2 En la route out.js creamos una nueva autenticación para google
        35.3 en auth.controller.js definimos un nuevo controlador para autenticación de google
        35.4 En el router del auth.route.js llamamos el controlador después de validar campos // se importa en en el router en la sección de arriba entre los {}
        35.6 probamos en pstman el nuevo endpoint de /google
        35.7 llamamos el endpoint basado en nuestro front end, en el index.html procedemos con su configuración:
        36.8 Ahora que recibimos el token en el backend lo abrimos y extraemos toda su información 
    36. VALIDAR TOKEN DE GOOGLE EN BACKEND --------------------- CLASE 165-----------
        36.1 Vamos a la documentaciónd egoogle para verificar google id token is in our server side https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
        36.2 Sleccionamos la librería de Node e instalamos el npm de la librería:
            * &_ npm install google-auth-library --save
        36.3 Creamos un nuevo archivo en los helpers donde pondremos la nueva función de verificación de google llamado:
            * %_ google-verify.js
            * copiamos y pegamos el script  para node de: https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
        36.4 Haemos algunso cambios en este nuevo archivo de google (helpers->google-verify.js)
        36.5 Usaremos la función GoogleVerify() en el auth controller como un trycatch
        36.6 Vamos al helper google-verify y ajustamos un return 
    37. CREAR UN USUARIO PERSONALIZADO CON LAS CREDENCIALES DE GOOGLE --CLASE 166---
        37.1 lO GUARDAREMOS EN LA BASE DE DATOS Y GENERAREMOS UN jwt PARA QUE EL usuario pueda usar su autenticación vs nuestra propia validación
        37.2 En el auth controller verificacmnos si el correo existe en la base de datos
        37.3 Revisamos si el usuario no existe lo tengo que crear en el autch controller
        37.4 Revisamos si el usuario ya fue bloqueado (eliminado de la bd)
        37.5 generamos el jwt
    38. LOGOUT - GOOGLE IDENTITY
        38.1 En el index agregamos un botón para logout
        38.2 Debajo de la función de handlecredenciales agregamos una nueva función para logout
        38.3 en el script del index en la función handle response, en el resp guardamos el correo en el local storage  
        38.4 Usamos el correo guardado en el local storage para llamarlo en el signout del logout
    39. REDESPLIEGUE EN RAILWAY -------CLASE 168----------------------------------
        39.1 1. Cambios en su repositorio
            #_ git checkout -b 4.0.0
            #_ git add .
            #_ git commit -m "Fin sección 11 - version 4.0.0"
        39.2.Crear y subir una rama
            #_ git push
            (Ese comando dará un error)
            Usar el comando en la descripción del error para subir la rama.
        39.3. Ajustes para el performance:
            * en el archivo package.json montamos un script en "scripts" agregando:{"start":"node app.js"}  --- y guardamos los cambios como new script added
            *comentamos los archivos .env con un # antes del port
            *en alrchivo models->server.js, y en la parte de PORT se le pone la opcion de ...env.PORT || 3000 
        39.4. En Railway, seleccionar la rama 4.0.0 para desplegar
        39.5. Revisar si hay cambios en variables de entorno necesarias
        39.6. Esperar que el deployment se realice, si aparecen errores, tratar de corregirlos y probar de nuevo.
    40. GENERAR DOCUMENTACIÓN AUTOMÁTICA EN NUESTROS SERVICIOS -----CLASE 169------
        40.1 rEGISTRAMOS UNA CUENTA EN Postman
        40.2 * Hacemos click en los tres puntos del nombre de la colección
            * Click en view documentation
            * Se puede seleccionar el lenguaje - javascript - fetch o cURL
            * sE Puede agregar comentarios - "estos son los endpoints disponibles"
            * Vamos al engranaje para ajustar otras cosas
            * Una vez terminado podemos ir a publish 
            * Revisamos el webpage y luego de configurar click en publish 
            * En el URL se puede ver toda la documentación una belleza

     ------------------   CATEGORIAS Y PRODUCTOS    ----------------

    41. * Tareas
        * CRUD de categorías y productos
        * Relaciones
        * Populate
        * Búsquedas
        * Despliegues a producción
    42. CRUD Y RUTAS DE CATEGORÍAS ---------------------------CLASE 175--------------
        42.1 En postman quiero listar todas las categorías con el GET {{url}}/api/categorias
        42.2 PRIMERO: creamos las rutas en el reouter con archivo llamado: 
            * %_ categorías.js (Carpeta de rutas)
        42.3 Copiamos y pegamos las importaciones de la ruta auth
        42.4 SEGUNDO: creamos un controlador que se llame:
            * %_ categorias.controller.js
        42.5 TERCERO: En el modelo server.js se necesita definir la nueva ruta de categorias la cual llamaremos: "categorías"
        42.5.1 clonamos la linea en routes y la configuramos  
        42.6 Unificamos los path en un solo objeto y luego lo aplicamos en las routes
        42.7 (VAMOS A UTILIZAR 5 SERVICIOS REST PARA ESTE TRABAJO (CASI SIEMPRE))
        42.7.1 Creamos los servicios en la ruta del categorias (categorias.route)
            *Get todas las categorías
            *Get una categoiría
            *POST crear una categoría
            *PUT actualizar un id
            *DELETE borrar categoría
        42.8 CUARTO: Creamos el modelo de la categoría -----------clase 176
            42.8.1 Creamos el modelo en la capreta de modelos con el archivo llamado: 
            * %_ categoria.js
            * podemos tomar como referencia el modelo del rol
            * con ctrl f2 podemos cambiar el nombre de una const en todas sus instancias
            * Agregamos los elementos del schema
        42.9  Vamos a crear un index de modelos llamado: 
            * %_ index.model.js
            * Configuramos el index de modelos
        42.10 CREAR UNA NUEVA CATEGORÍA ----------------------CLASE 177---------
            * cREAR CATEGORÍA - requiere token valido para esto:
                1. Usamos middleware de validar token
                2. Actuyalizamos el route de post en el archivo categorias.route.js para que tenga la validación de JWT
                3. Se importa al archivo de middlewares de Validar JWT
                4. aGREGAMOS VALIDACIÓN DE CHECK DE NOMBRE
                5. Agregamos la validación de que todos los campos estén correctos del middleware (debe estar en la importacion de los middlewares)
        42.11 En el controlador de las categorias agregamos la función para crear categorias
            1. Agregamos la función de crear categoría: crearCategoria()
            2. Importamos el response automaticamente del express (al agregarlo en los parametros de la función req=response)
            3. Exportamos el controleador con el module.exports
            4. *TIP* Al grabar en mayus hace que choque en base de datos y permite validar que no hacyan repeticiones
            5. Validamos si existe categoría previamente garabada
                5.1 Importamos modelo de categoría
            6. Generamos la data que vamos a grabar en DB
            7. Hacemos la grabación de la data
            8. Enviamos mensaje de que se grabo
            9. Llamamos el controlador llamar categoría en la ruta de de categorías (categorias.routye.js)
            10. Importamos en la ruta de categorías el controlador de categorias
    43. CREAMOS LOS CRUD RESTANTES DE CATEGORIAS -----CLASE 178 ----
        43.1 Creamos las funciones restantes en el controlador de categorias
        43.2 Ajustamos las rutas para actualizarlas - en los que requiere id hacemos una validacion personalziada - middleware (id existe) - check('id').custom(existeCategoria)
        si no existe tira un error
        -En db validators usamos el -existeusuarioporid
        -en el put que venga el nombre 
        -que el id sea de mongo
            *CONTROLADOR
            *RUTAS
                *MIDDLEWARE - VALIDACIÓNES (FUNCI`´ON PARA VALIDARLO) 
                *Helper -existe vateogira 
        43.3 RESOLUCIÓN DE CRUD: ----CLASE 179-------------
            -----GET ALL----------------------
            1. Creamos los controladores, exportamos y lo pegamos en la ruta (lo importamos, lo asignamos en la ruta )
            1.1 Agregamos el populate (en el modedelo de categorías pasamos a json para que pueda ser leido)
            1.2 En el modelo de categorias agregamos la condición para retirar la info que no queremos imprimir en el json
            .2 Importamos el modelo de usuarios en el modelo de de categoría para que pudiera funcionar 
        43.4 ------GET BY ID --------------------
            1. HACER EL CONTROLADOR
            2. IMPORTAMOS EN LAS RUTAS EL CONTROLADOR
            3. AJUSTARMNOS LA RUTA DE GET por ID
                * ASIGNAMOS EL CONTROLADOR NUEVO
                * AGREGAMOS LAS VALIDACIONES (id existe, usar la validación de campos,validación que la categoría exista)
                * CREAMOS UN HELPER PARA VALIDAR QUE LA CATEOGRÍA EXISTA (existeCategoria)
                    * IMPORTAMOS EL MODELO CATEGORIAS
                    * CREAMOS LA FUNCIÓN DE CATEGORÍAS
                    * EXPORTAMOS LA FUNCIÓN DE CATEGORÍAS
                *ASIGNAMOS EL HELPER VALIDADOR A LA ROUTE DE GETBYID
        43.5 -------UPDATE --- CLASE 180-----------------
            1. HACER EL CONTROLADOR Y EXPORTARLO
            2. IMPORTAMOS EN LAS RUTAS EL CONTROLADOR
            3. AJUSTARMNOS LA RUTA DE GET por ID
                * ASIGNAMOS EL CONTROLADOR NUEVO
                * AGREGAMOS LAS VALIDACIONES (validar el JWT, validar que el nombre se esté enviando, validar que exista la categoría, validar campos )
        43.6 ---------DELETE--------------------------------
            1. HACER EL CONTROLADOR Y EXPORTARLO
            2. IMPORTAMOS EN LAS RUTAS EL CONTROLADOR
            3. AJUSTARMNOS LA RUTA DE GET por ID
                * ASIGNAMOS EL CONTROLADOR NUEVO
                * AGREGAMOS LAS VALIDACIONES (validar JWT, es adminrole (lo importamos), validar quie sea un mongo id), validar que exista, validar campos
    44. CREAR NUEVO MODELO DE PRODUCCIÓN ---CRUD---- CLASE 181---------------------
        1. CREAR ARCHIVO DE RUTAS, CONTROLADORES, MODELO: 
            * %_ productos.route.js - router
            * %_ productos.controller.js - controller 
            * %_ producto.js - modelo
            * En el servidor(Model) creamos un nuevo Link
                *Hacemos la importación en routes (de este mismo archivo)
        2. CONFIGURACIÓN DE ARCHIVOS --- CLASE 181-182----------------------------
            1. Configuramos el modelo (copy paste del modelo categorias)
                *Ajustamos el index de modelos
            2. Configuramos el index del modelo agregando el modelo producto
            3. Configuramos los controladores --
            4. Configuramos las rutas
            5. Configuramos las validaciones
            6. Coinfgiruamos los endpoints en Postman
    45. RUTA PARA REALIZAR BÚSQUEDAS FLEXIBLES -------CLASE 183 -----------
        1. creamos un nueva ruta, controlador llamada:
            * %_ buscar.route.js - ruta
            * %_ buscar.controller.js
        2. Configuramos la ruta (creamos funcion router)
            1. Importaciones - incluyendo el controlador de buscar
            2. Generamos el router
        3. Configuramos el controlador (funcion buscar)
            1. Enlazamos con la ruta
            2. El router 
        4. Modufucamos el modelo del server
            1. Agregamos el path con el nuevo url de 
        5. Agregamos las validaciones ---- Clase 184-----------------
            *Las agregamos en el mismo controlador ya que no es muy grande
            *Ajustamos controlador de bùsqueda de usuario
    46. BUSQUEDAS EN OTRAS COLECCIONES ----- CLASE 186 --------------
        1. Copiar y pegar y ajustar en el controlador de buscar (buscar.controller.js)
    47. DESPLIEGUE EN RAILWAY:
            * #_ git checkout -b 5.0.0
            * #_ git add .
            * #_ git commit -m "Fin sección 12 - version 5.0.0"
        2.Crear y subir una rama
            * #_ git push
            * (Ese comando dará un error)
            * Usar el comando en la descripción del error para subir la rama.
        3. En Railway, seleccionar la rama 5.0.0 para desplegar
        4. Revisar si hay cambios en variables de entorno necesarias
        5. Esperar que el deployment se realice, si aparecen errores, tratar de corregirlos y probar de nuevo


















             



        



    