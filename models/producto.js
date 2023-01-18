//44.2 Configuración del modelo Productos

//desestructuramos lo que viene en el require de Mongoose (schema y model)
        const{Schema, model}=require('mongoose');
//Importamos el modelo de usuario y categorías (abajo los usamos)
        const {Producto, Usuarios, Categoria} = require('../models')

//construimos el Schema
    const ProductoSchema = Schema({

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
        },

        precio: {
            type: Number,
            default:0,
        },

        categoria: {
            type: Schema.Types.ObjectId,
            ref: 'Categoria',
            required: true
        },
        
        descripcion: {
            type: String
        },

        disponible: {
            type: Boolean,
            default: true
        },
    });

//pasamos el modelo de usuario a Json para que pueda ser impreso (sacamos el _v y el estado de la impresión)
    ProductoSchema.methods.toJSON = function () {
        //instanciamos los valores de usuario, sacando el _v, y estado (mostrando todo lo demaás de categoria)
            const { __v, estado, ...producto } = this.toObject();
        //If permite que se use el formato cuando no se usa populate, cuando si utiliza este ajuste (pasar _id a uid)
            if (producto.usuario._id){
                producto.usuario.uid = producto.usuario._id
                delete producto.usuario._id 
            }        
            return producto    
    }

//exportamos usando la función del modelo -- usuario en singular
    //primero el nombre del modelo y luego el schema
    module.exports= model( 'Producto',ProductoSchema );