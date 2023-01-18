//NO ME FUNCIONO

//Importación del express por si acaso
    const {response,request} = require('express');
//Importamos el Modelo de Categoría
    const { Categoria } = require('../models');

//Middleware no mostrar(paginar) ni actualizar categorías ya eliminadas
    const validaCategoriaActiva = async (req,res=response,next)=>{

    //extraemos el id
        const {id} = req.params;
    //Extremos el status de la base de datos
        const categoriaEstado = await Categoria.findById(id);
    //Revisamos si en la sb el estado está false
        if (! categoriaEstado){
            return res.status(400).json({
                msg: 'Esta Categoría ha sido exterminada :)'
            })
        }

    }

//Exportamos
    module.exports={
        validaCategoriaActiva
    }

