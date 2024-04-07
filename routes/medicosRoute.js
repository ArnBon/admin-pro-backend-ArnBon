/*
    Medicos
    ruta: '/api/medico'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { validarJWT } = require('../middleware/validar-jwt');

const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicosController')


const router = Router();

router.get( '/', getMedicos );

router.post( '/',
    [ 

        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),   //tiene que ser un id de mongo     
        validarCampos

    ], 
    crearMedico 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','el nombre del médico es necesario').not().notEmpty(),
        check('hospital','El hospital id debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete( '/:id',
    borrarMedico
);



module.exports = router;