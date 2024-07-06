/* ruta: api/uploads/usuarios/123 */
const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');

const expressFileUpload = require('express-fileupload');
const {fileUpload, retornaImagen} = require('../controllers/uploadsController');

const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id', validarJWT , fileUpload );
router.get('/:tipo/:foto', retornaImagen ); //clase 141

module.exports = router;