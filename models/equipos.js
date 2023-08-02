
const { Schema, model } = require('mongoose');

const EquipoSchema = Schema({
    creadoEn: { 
        type: Date, 
        default: Date.now 
    },
    nombre: {
        type: String,
        required: true
    },
    ipv4: {
        type: String
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    }
});



EquipoSchema.methods.toJSON = function() {
    const { __v,...equipo  } = this.toObject();
    
    return equipo;
}

module.exports = model( 'Equipo', EquipoSchema );
