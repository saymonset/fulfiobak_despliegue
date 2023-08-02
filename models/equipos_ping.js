const { Schema, model } = require('mongoose');

const EquiposPingSchema = Schema({
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    respuesta: {
        type: Boolean,
        required: true,
        default: false,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    
    equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipo',
        required: true
    }, 
});


EquiposPingSchema.methods.toJSON = function() {
    const { __v,  ...data  } = this.toObject();
    return data;
}


module.exports = model( 'EquiposPing', EquiposPingSchema );
