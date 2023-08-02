const Role = require('../models/role');
const { Usuario } = require('../models');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}


const rolExiste = async( rol = '' ) => {

    // Verificar si el role existe
    const existeRole = await Role.findOne({ rol });
    if ( existeRole ) {
        throw new Error(`El role: ${ rol }, ya está registrado`);
    }
}



const existeRolPorId = async( id ) => {

    // Verificar si el correo existe
    const existeRole = await Rol.findById(id);
    if ( !existeRole) {
        throw new Error(`El id no existe ${ id }`);
    }
}


const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

const existeRolePorId = async( id ) => {

    // Verificar si el correo existe
    const exite = await Role.findById(id);
    if ( !exite ) {
        throw new Error(`El id no existe ${ id }`);
    }
}




module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    rolExiste,
    existeRolPorId,
    existeRolePorId
}

