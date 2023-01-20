//48.11.7  Validar archivo

//Importamos el express para el tipado 
    const { response } = require("express")

//Funcion middleware para validación de montaje de archivo
    const validarArchivoSubir = (req,res=response,next)=>{//next o callback

        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            return res.status(400).json({
                msg: 'No hay archivos que subir - validarArchivoSubir'
            });
        };

        //Si pasa entonces llamamos el next para que continue

        next();
        
    }


//Exportamos
    module.exports={
        validarArchivoSubir
    }