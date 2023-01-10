//importaciones de 3º
    //1.9.3 Agreegamos paquete .env
        require('dotenv').config();

//Importaciones propias
    const Server = require('./models/server'); // se agregó automáticamente


//1.7 Montamos servidor express - 2.5 lo llevamos a la clase server.js < models

//2.6 conectamos el server al app.js
    const server= new Server(); //-- llamamos clase con new Clase() - instanciamos la clase3

    //creamos el metodo listen
    server.listen();


    
