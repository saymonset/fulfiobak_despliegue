
const { Router } = require('express');
const { check } = require('express-validator');


const {
    validarCampos,

} = require('../middlewares');


const router = Router();


const { equiposGet,
         equipoPost,
        equiposPut,
        equipoDelete
   } = require('../controllers/equipos');

router.get('/:id', equiposGet );

router.get('/', equiposGet );

router.post('/',[
    check('nombre', 'El nombre del obligatorio').not().isEmpty(),
    check('ipv4', 'El IP es obligatorio').not().isEmpty(),
    validarCampos
], equipoPost );

router.put('/:id',[
    check('status', 'El  status es obligatorio').not().isEmpty(),
    validarCampos
],equiposPut );



router.delete('/:id',equipoDelete );

module.exports = router;
