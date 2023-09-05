const express=require('express')
const multer=require('multer');
const upload = multer();

const router = express.Router();

const missionController= require('../controllers/missione');

router.get('/missioni', upload.none(), missionController.getList);

module.exports= router;