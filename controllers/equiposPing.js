const { response } = require('express');

//const   ping  = require('node-http-ping');
const ping = require('ping');


const EquiposPing = require('../models/equipos_ping');
const Equipo = require('../models/equipos');


const obtenerEquiposPing = async(req, res = response ) => {

    let respose=  await EquiposPing.find()
    .populate('equipo')
    .populate('usuario');

     

    const { id } = req.params;
    const { respuesta} = req.query;

    if (respuesta){
      respose =  respose.filter(element => {
            return  element.respuesta == respuesta
          })

    }


    if (id){
      respose =  respose.filter(element => {
      //  console.log(element.incidencia?._id);
        return  element.equipo?._id == id
      })
    }

    res.json({
      respose
    });
}




const EquiposPingGet = async(req, res = response ) => {

  let respose=  await EquiposPing.find()
  .populate('equipo')
  .populate('usuario');

  const { respuesta} = req.query;

  let resp = false;
   
 

  if (respuesta?.toLowerCase() === 'true') {
       resp = true;
   }

  if (respuesta){
    respose =  respose.filter(element => {
  //   console.log(respuesta+'=respuesta element.respuesta =' +  element.respuesta );
    //  console.log(resp);
      //console.log(` vvvelement.respuesta == respuesta ${element.respuesta == respuesta}`);
          return  element.respuesta == resp
        })

  }

  res.json({
    respose
  });
}



const crearEquiposPing = async(req, res = response ) => {

    let {  ...body } = req.body;

    let {respuesta, equipo } = req.body;
  
    if (equipo){
      let {ipv4} = await Equipo.findById(equipo);
      try {
     console.log(respuesta);
       await ping.sys.probe(ipv4, function(isAlive){
          respuesta = isAlive;
      })
      } catch (error) {
        respuesta = false;
      }
        console.log('resp ='+respuesta);
     }
    // Generar la data a guardar
    const data = {
        ...body,
        respuesta
    }

    const rsi = new EquiposPing( data );

    // Guardar DB
    await rsi.save();

    res.status(201).json(rsi);

}





module.exports = {
    crearEquiposPing,
    obtenerEquiposPing,
    EquiposPingGet

}
