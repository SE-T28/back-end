const db= require("../models");
const ROLES= db.ROLES;
const Utente= db.utente;

checkDuplicatiNomeCognome= (req, res, next) => {
    Utente.findOne({
        nome: req.body.nome,
        cognome: req.body.cognome
    }).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if(user){ //se trovato un utente
            res.status(409).send({message: "Utente già presente"});
            return;
        }
        next();
    })
};

checkRoleEsiste = (req, res, next) => {
    if(req.body.role && !ROLES.includes(req.body.role)){
        res.status(400).send({
            message: req.body.role + " non esiste come ruolo"
        });
        return;
    }
    next();
};

const VerifySignUp = {
    checkDuplicatiNomeCognome,
    checkRoleEsiste
};

module.exports = VerifySignUp;