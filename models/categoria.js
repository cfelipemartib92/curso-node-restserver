//42.8 Creamos el modelo de las categorias

//desestructuramos lo que viene en el require de Mongoose (schema y model)
const{Schema, model}=require('mongoose');
//43.3.2 Importamos el modelo de usuario para que funcione (abajo estamos usandolo)
const {Usuarios} = require('../models')

//construimos el Schema
    const CategoriaSchema = Schema({

        nombre:{
            type: String,
            required: [true,'El nombre es obligatorio'],
            unique: true
        },
        
        estado: {
            type: Boolean,
            default: true,
            required: [true,'El estado es obligatorio']
        },

        usuario: {
            type: Schema.Types.ObjectId,//es un objeto que vamos a tener en mongo
            ref: 'Usuarios',
            required: true
        }

    });

//43.3.1.2 pasamos el modelo de usuario a Json para que pueda ser usado en el populate y retirar de la impresion el v__ y estado
    CategoriaSchema.methods.toJSON = function () {
        //instanciamos los valores de usuario, sacando el _v, y estado (mostrando todo lo demaás de categoria)
            const { __v, estado, ...categoria } = this.toObject();
        //If permite que se use el formato cuando no se usa populate, cuando si utiliza este ajuste (pasar _id a uid)
            if (categoria.usuario._id){
                categoria.usuario.uid = categoria.usuario._id
                delete categoria.usuario._id 
            }        
            return categoria    
    }

//exportamos usando la función del modelo -- usuario en singular
    //primero el nombre del modelo y luego el schema
    module.exports= model( 'Categoria',CategoriaSchema );