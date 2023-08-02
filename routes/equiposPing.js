const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearEquiposPing,
        EquiposPingGet
       } = require('../controllers/equiposPing');

const { existeUsuarioPorId,existeUIncidenciaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', [   
                validarCampos
],EquiposPingGet );
 

router.post('/', [
    check('equipo','No es un id de Mongo').isMongoId(),
    check('usuario','No es un id de Mongo').isMongoId(),
    check('usuario').custom( existeUsuarioPorId ),
    validarCampos
], crearEquiposPing );






module.exports = router;
