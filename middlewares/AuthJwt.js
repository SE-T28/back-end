const jwt = require("jsonwebtoken");
const db = require("../models");
const Utente = db.utente;
const Role = db.role;
require('dotenv').config;

verificaToken = (req, res, next) => {

  let token=req.headers["authorization"];

  if (!token) {
    return res.status(401).send({ message: "No token provided!" });
  }
  
  if(token.substring(0,7)=="Bearer "){
    token= token.slice(7);
  }

  jwt.verify(token, process.env.SECRET , (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAmministratore = (req, res, next) => {
  Utente.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      Role.findOne(
        {
          _id: { $in: user.role}
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

        if (role.name === "amministratore") {
            next();
            return;
         }
          
        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isTecnico_Interno= (req, res, next) => {  //accesso anche per gli amministratori (isTecnico_interno_or_amministratore)
    Utente.findById(req.userId).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        Role.findOne(
          {
            _id: { $in: user.role}
          },
          (err, role) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
          if (role.name === "tecnico_interno" || role.name==='amministratore') {
              next();
              return;
           }
            
          res.status(403).send({ message: "Require tecnico interno Role!" });
          return;
        }
      );
    });
};

const AuthJwt = {
    verificaToken,
    isAmministratore,
    isTecnico_Interno,
};
module.exports= AuthJwt;