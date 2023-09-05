const { authJwt } = require("../middlewares");
const express=require('express')
const multer=require('multer');
const upload = multer();

const router = express.Router();

const taskController = require('../controllers/task');

router.post('/task', upload.none(),[authJwt.verificaToken, authJwt.isTecnico_Interno], taskController.addTask);
router.get('/task', upload.none(), [authJwt.verificaToken, authJwt.isTecnico_Interno], taskController.getList);
router.get('/task/:nome', upload.none(),[authJwt.verificaToken, authJwt.isTecnico_Interno], taskController.getTask);
router.delete('/task/:nome', upload.none(), [authJwt.verificaToken, authJwt.isTecnico_Interno], taskController.deleteTask);
router.patch('/task/:nome', upload.none(), [authJwt.verificaToken, authJwt.isTecnico_Interno], taskController.modificaTask)

module.exports = router;