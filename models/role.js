//tiene el mismo nombre del archivo son la s

//desestructuramos lo que viene en el require de Mongoose (schema y model)
    const{Schema, model}=require('mongoose');

//construimos el Schema
    const RoleSchema = Schema({

        rol:{
            type: String,
            required: [true,'El rol es obligatorio']//para que no se creen un doc vacio
        }
    });


//exportamos usando la función del modelo -- usuario en singular
    //primero el nombre del modelo y luego el schema
    module.exports= model( 'Roles',RoleSchema );