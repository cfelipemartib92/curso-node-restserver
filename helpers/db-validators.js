//usa express valdiator
const mongoose = require('mongoose');
//16.19.1 traigo la importación del modelo
const Role = require('../models/role');
//17.1 importo el modelo de usuarios y categorias 43.4.3
/*const Usuario = require('../models/usuario');*/
const {Usuarios, Categoria, Producto} = require('../models')

const esRolValido = async (rol='')=>{//verificación personalizada con el custom - minimo es un string vacio ''
    const existeRol = await Role.findOne({rol}); //importamos el schema - buscar uno que el rol sea = a rol
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`)//ATRAPAMOS EL ERROR CON ESTE MENSAJE
    }
}

const emailExiste = async (correo='')=>{
    const existeEmail = await Usuarios.findOne({correo:correo});//16.10
        if (existeEmail){
            throw new Error(`El correo ${correo} ya está registrado`);
            };
}

//19.2 validador de usuario por id para validación de id existente
const existeUsuarioPorId = async (id='')=>{
    const existeUsuario = await Usuarios.findById(id);//funcion findbtid
        if (!existeUsuario){
            throw new Error(`El usuario con id ${id} no está registrado`);
            };
}

//43.4.3 AQUÍ VALIDAMOS QUE LA CATEGORÍA EXISTA
const existeCategoriaPorId = async (id='')=>{
    const existeCategoria = await Categoria.findById(id);//Función encontrar uno igual
        if(!existeCategoria){
            throw new Error(`La categoría con id: ${id} no está registrada`);
        };
}

//43.4.3 AQUÍ VALIDAMOS QUE EL PRODUCTO EXISTA
const existeProductoPorId = async (id='')=>{
    const existeProducto = await Producto.findById(id);//Función encontrar uno igual
        if(!existeProducto){
            throw new Error(`El producto con id: ${id} no está registrado`);
        };
}

//48.11 Custom validation para validar colecciones permitidas en el montaje de archivos
const coleccionesPermitidas = ( coleccion='', colecciones = []) =>{//esto está en la funcion del route con func(c,[])

    // Verificamos si coleccion (c) están dentro de las colecciones ([,]) del route
    const incluida = colecciones.includes(coleccion);
    //Si no includes() entonces false y error
    if( !incluida ){
        throw new Error(`La coleccion ${coleccion} no es permitida, solo se permite ${colecciones}`)
    }
    //como es una funcion con varios argumentos es importante mandar el true (se devbería colocar en todas las otras funciones)
    //en las demas funciones como solo es un return, entonces mno es necesario, aqui validamos de hecho
    return true;

}


module.exports={
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}





