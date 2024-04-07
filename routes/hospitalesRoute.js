/*
    Hospitales
    ruta: '/api/hospitales'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middleware/validar-campos');

const { validarJWT } = require('../middleware/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitalesController')


const router = Router();

router.get( '/', getHospitales );

router.post( '/',
    [
        validarJWT,
        check('nombre', 'nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
     ], 
    crearHospital 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','el nombre del hospital es necesario').not().notEmpty(),
        validarCampos
    ],
    actualizarHospital
);

router.delete( '/:id',
    validarJWT,     
    borrarHospital
);



module.exports = router;