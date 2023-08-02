const { response, request } = require('express');
const Equipo = require('../models/Equipos');




const equiposGet = async(req = request, res = response) => {

    const { id } = req.params;

    console.log({id});

    let  equipos = [];
 
    if (id){
         equipos = await Equipo.findById(id);
    }else{
         equipos = await Equipo.find();
    }

    

    const {status} = req.query;

    if (status){
        equipos =  equipos.filter(element => {
               
            return  element?.status == status
          });
    }

    res.json({
        equipos
    });
}

const equipoPost = async(req, res = response) => {

    const {  nombre, ipv4, status } = req.body;
    const equipo = new Equipo({ nombre,ipv4, status });

    // Guardar en BD
    await equipo.save();

    res.json({
        equipo
    });
}



const equiposPut = async(req, res = response) => {

    const { id } = req.params;
    const {  ...resto } = req.body;
    const equipo = await Equipo.findByIdAndUpdate( id, resto, {new:true} );
    res.json({equipo});
}

const equipoDelete = async(req, res = response) => {

    const { id } = req.params;

    const equipo = await Equipo.findByIdAndDelete( id );


    res.json(equipo);
}


module.exports = {
    equiposPut,
    equipoDelete,
    equiposGet,
    equipoPost
}
