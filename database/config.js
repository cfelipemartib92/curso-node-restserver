//14.3 confioguración de archivo
//--2. Coneccion a mongoose
    const mongoose = require('mongoose');



//--1. Creamos función
    const dbConnection = async()=>{
    //-4. como no es un db que controlamos usamos trycatch

        try {
            //--7.conexión a mongo - va a regresar una promesa
                //--8. agrego el url desde el.env en MONGODB_CNN
            await mongoose.connect(process.env.MONGODB_CNN, {
                //--9. Mando los objetos pedidos en la documentación - ya no se pone
                //userNewUrlParser: true,
                //useUnifiedTopology: true,
                //useCreateIndex: true,
                //useFindAndModify: false
            });

            console.log('Base de datos onLine');


            
        } catch (error) {//--5. agregamos un throw new error
            //--6. vemos el erro que se dispara
            console.log(error);
            throw new Error('Error en la db - a la hora de inicial la DB');        
        }

    }


//--3. Exportamos
    module.exports={
        dbConnection
    }