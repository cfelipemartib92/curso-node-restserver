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
        
        img: { // url de la imagen usuario 
            type:String
        },
        rol: {
            type:String,
            required: true,
            default:"USER_ROLE",
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

//16.21 creo una función para extraer la contraseña e imprimir el modelo en un JSON
    //cuando se llame el toJSON va a ejecutar esta función
    UsuariosSchema.methods.toJSON = function (){//tiene que ser una función normal - el this es interno
        //separo el _v y password del resto que contiene usuario para luego sólo imprimir usuario (sacar v_ y password de la impresion) 
        // los tre puntos (...)se llamao operador rest y selecciona el resto
        const {__v,password,_id,...usuario} = this.toObject();//instancia con los valores respectivos como objeto de JS en formato JSON
        //26.2 quiero mostrar el _id como uid entonces le asigno los valores de id:
        usuario.uid = _id; 
        return usuario;//esto me permite retornar el usuario mas no el v y el password
    }

//exportamos usando la función del modelo -- usuario en singular
    //primero el nombre del modelo y luego el schema
module.exports= model( 'Usuarios',UsuariosSchema );