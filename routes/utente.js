const { authJwt } = require("../middlewares");
const controller = require("../controllers/utente");

const multer=require('multer');
const upload = multer();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/crew', upload.none(), controller.getList);
  app.delete('/crew/:nome/:cognome', upload.none(), [authJwt.verificaToken, authJwt.isAmministratore], controller.deleteUsr);
};