const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {//hace referencia al usuario esto es como un idUsuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true        
    },
    hospital: {//hace referencia al hospital esto es como un idHospital
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true        
    },

});

MedicoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Medico', MedicoSchema);