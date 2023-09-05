const express=require('express')
const multer=require('multer');
const upload = multer();

const router = express.Router();

const agenziaController= require('../controllers/agenzia');

router.get('/agenzie', upload.none(), agenziaController.getList);

module.exports= router;