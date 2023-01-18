//42.9 Configuración de Index de modelos

    //Es como un middleware pero diferente
        const Categoria = require('./categoria');
        const Roles = require('./role');
        const Server = require('./server');
        const Usuarios = require('./usuario'); // Con el nombre de como se esporto
        const Producto = require('./producto'); // Con el nombre de como se esporto

    //Exportamos
        module.exports={
            Categoria,
            Roles,
            Server,
            Usuarios,
            Producto
        }