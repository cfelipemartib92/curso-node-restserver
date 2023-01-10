//mongo se guarda en objetos, el roden: documentos->colecciones

//Importe mongoose - extraigo schema y model 
    const {Schema, model} = require('mongoose');

    const UsuariosSchema = Schema({

        nombre: {
            type:String,
            required: [true,'El nombre es obligatorio']//un arreglo para mandar mensaje de error en caso de no ser enviado
        },
        correo:{
            type:String,
            required: [true,'El Correo es obligatorio'],
            unique:true //Sólo sirve un email por user- no duplicados
        },
        password: {
            type:String,
            required: [true,'La contraseña es obligatoria']
        },
        img :{ // url de la imagen usuario 
            type:String
        },
        rol: {
            type:String,
            required: true,
            emun:['ADMIN_ROLE','USER_ROLE']
        },
        estado:{
            type: Boolean,
            default: true
        },
        google:{
            type: Boolean,
            default: false
        },
    });

//16.21 creo una función para 
UsuariosSchema.methods.toJSON = function (){//tiene que ser una función normal - el this es interno
    const {__v,password,...usuario} = this.toObject();//instancia con los valores respectivos
    return usuario;//esto me permite retornar el usuario mas no el v y el password
}

//exportamos usando la función del modelo -- usuario en singular
    //primero el nombre del modelo y luego el schema
module.exports= model( 'Usuarios',UsuariosSchema );