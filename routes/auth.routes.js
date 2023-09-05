const { verifySignUp } = require("../middlewares"); //object destructuring
const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const multer= require('multer');
const upload= multer();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-control, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/crew/addusr", upload.none(), [authJwt.verificaToken, authJwt.isAmministratore, verifySignUp.checkDuplicatiNomeCognome, verifySignUp.checkRoleEsiste, ], controller.signup);

  app.post("/login", upload.none(), controller.signin);
};