const express=require('express')
const multer=require('multer');
const upload = multer();

const router = express.Router();

const moduloController= require('../controllers/modulo');

router.get('/moduli', upload.none(), moduloController.getList);
router.get('/moduli/:nome', upload.none(), moduloController.getModulo);

module.exports = router;