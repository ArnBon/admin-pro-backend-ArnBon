/* ruta: api/todo/busqueda */

const {Router} = require('express');
const {validarJWT} = require('../middleware/validar-jwt');
const {getTodo, getDocumentosColeccion} = require('../controllers/busquedasController');


const router = Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:usqueda', validarJWT, getDocumentosColeccion);

module.exports = router;