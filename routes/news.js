const express=require('express')
const multer=require('multer');
const upload = multer();

const router = express.Router();

const newsController = require('../controllers/news');

router.get('/news', upload.none(), newsController.getList);

module.exports= router;