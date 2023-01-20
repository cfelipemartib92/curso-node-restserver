// 49.9 Configurar helper para subir archivo

//pegamos las importaciones del controller:
    //48.6 Importación Paths para facilitar su uso
        const path = require('path');
    //48.8 Importamos el paquete de asignación automatica de id
        const { v4: uuidv4 } = require('uuid');

    //Traemos aquí las extensiones validas:
        const validext = ['png','jpg','jpeg','gif'];
    //Funcion para valdiaciones - ponemos las variables validtext, y agregamos la carpeta donde queremos upload los archivos
        const subirArchivo = (files/*o desestructuro trayendo propiedad: {archivo}*/,extensionesValidas=validext, carpeta='')=>{//recibo el req y res en <-files

    
            
        //Para agregar el req y res agregamos un promise
            return new Promise( (resolve,reject)=>{
            //....pegamos las validaciones del controlador aquí.....

            //Meter lo que viene en el req.files en la constante (samplefile) archivo
                //Esto venia de uploadexpress 
                //1. sampleFile = req.files.sampleFile;
                //2. sampleFile = req.files.archivo;
                /*3.*/ const {archivo} = files;//los files vienen arriba, no nbecesito el req

            //Para cortar el nombre de los archivos que vamos a upload - split permite cortar el string y . es el id para separar
                const nombreCortado= archivo.name.split('.');//desde donde lo cortamos
            //Para sacar la extension del archivo .txt,.jpg,.png, etc
                const extension = nombreCortado[nombreCortado.length - 1]; //la última posicion del split (-1)
            //Validar las extensiones que voy a permitir -- arreglo con ext permitidas
                //const extensionesValidas = ['png','jpg','jpeg','gif']; -> lo subimos
            //validamos si la extension está dentro de las validas
                if (!extensionesValidas.includes(extension)){
                    return reject( `La extension ${extension} no es permitida, solo se permiten archivos: ${extensionesValidas}`);
                //Ajustamos el codigo y quitamos lo de abojo y dejamos lo de arriba
                    /*return res.status(400).json({
                        msg: `La extension ${extension} no es permitida, solo se permiten archivos: ${extensionesValidas}`
                    })*/
                }
            //Actualización del nombre del archivo uploaded
                //48.8 asignamos una constante al nuevo archivo
                const nombreTemp = uuidv4() + '.' + extension;
            //Construcción de path a donde lo quiero poner - agregamos la const, importamos path y lo ajustamos
                //1.uploadPath = __dirname + '../uploads' + sampleFile.name;
                /*2.*/const uploadPath = path.join(__dirname,'../uploads', carpeta,  nombreTemp/*archivo.name*/);//lo subimos con su nombre temporal  // montamos el nombre de la carpeta               
            //Codigo pegado de extension express - upload para validar errores y montaje de archivo
                archivo.mv(uploadPath, (err)=> {
                    if (err) {
                        return reject(err);
                        //ajustamos el return para el promise:
                            //return res.status(500).json({err});
                    }
                    resolve(nombreTemp);
                //como estamos dentro de un promise no mandamos el res sino un resolve:
                    //res.json({msg: 'El archvo ha sido subido a ' + uploadPath});
                });
            });

        
        }

    //Exportar
        module.exports={
            subirArchivo
        }