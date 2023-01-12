//36.3 función de google -  Node - https://developers.google.com/identity/gsi/web/guides/verify-google-id-token


    const {OAuth2Client} = require('google-auth-library');
    //36.4 agregamos el client ID CON LA función process.env.GOOGLE_CLIENT_ID
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    

    //36.4 Cambiamos el nombre a la función por googleVerify
    async function /*lo borramos: verify*/googleVerify (token='') {

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID  // 36.4 Agregamos el clint id de nuestro .env
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });

        //36.6 Desestructiramos el payload
        const /*payload*/ {name,picture,email} = ticket.getPayload();

        //36.4.1 Imprimimos que funciona bien
            //console.log(payload);

        //36.6 Return de la info que realmente queremos - que desestructuramos del             
        return {
        //le puedo poner lo nombres a las variables como yo quiera poniendo "mi nombre": (nombre de variable)
            nombre: name,
            img: picture,
            correo: email
        }

        //El profe dice que no necesitamos est:
            /*const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];*/
    }

    //36.4 movemos esto para otra parte
        //verify().catch(console.error);

    //36.4 Exportamos - le cambiamos el nombre a la función como googleVerify 
    module.exports={
        googleVerify
    }