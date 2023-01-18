//usa express valdiator
const mongoose = require('mongoose');
//16.19.1 traigo la importación del modelo
const Role = require('../models/role');
//17.1 importo el modelo de usuarios y categorias 43.4.3
/*const Usuario = require('../models/usuario');*/
const {Usuario, Categoria, Producto} = require('../models')

const esRolValido = async (rol='')=>{//verificación personalizada con el custom - minimo es un string vacio ''
    const existeRol = await Role.findOne({rol}); //importamos el schema - buscar uno que el rol sea = a rol
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD`)//ATRAPAMOS EL ERROR CON ESTE MENSAJE
    }
}

const emailExiste = async (correo='')=>{
    const existeEmail = await Usuario.findOne({correo:correo});//16.10
        if (existeEmail){
            throw new Error(`El correo ${correo} ya está registrado`);
            };
}

//19.2 validador de usuario por id para validación de id existente
const existeUsuarioPorId = async (id='')=>{
    const existeUsuario = await Usuario.findById(id);//funcion findbtid
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

//43.8 Validamos que no se pueda instertar categoría existente

// const categoriaTrue = async (id)=>{

//     const {estado} = await Categoria.findOne({id,estado});

//     if(!estado){
//             throw new Error(`La categoría ${nombre} ha sido exterminada`);
//     };
// };


module.exports={
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}





