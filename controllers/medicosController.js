const { response } = require('express');

const Medico = require('../models/medicoModel');

const getMedicos = async (req, res = response) => {

    const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre img')
   
    res.json({
        ok: true,
        medicos
    })
}

const crearMedico = async (req, res = response) => {
   
    const uid = req.uid;
    const medico = new Medico({
        usuario:uid,
        ...req.body
    });
    console.log(uid)
    try {
        const medicoDB = await medico.save();
        
        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
       console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable conmigo jajajaja'
        }) 
    }

}

const actualizarMedico = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

try {
    const medico = await Medico.findById(id);

    if (!medico) {
        return res.status(404).json({
            ok: true,
            msg: 'Registro de médico no encontrado',
        });        
    }
    const cambiosMedico = { ...req.body, usuario: uid }

    const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

    res.json({
        ok: true,
        msg: 'Datos del Médico actualizados !!!',
        medico: medicoActualizado
    })    
} catch (error) {
    console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarMedico = async (req, res = response) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            res.status(404).json({
                ok: true,
                msg: 'Registro de médico no encontrado',
            });            
        }
        await Medico.findByIdAndDelete(id);        
        res.json({
            ok: true,
            msg: 'borrarMedico'
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }); 
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}