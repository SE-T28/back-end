const db = require("../models");
const Utente = db.utente; 
const Role = db.role;
require('dotenv').config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const utente = new Utente({
      nome: req.body.nome,
      cognome: req.body.cognome,
      email: req.body.email,
      numero_telefono: req.body.numero_telefono,
      data_nascita: req.body.data_nascita,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    utente.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if(req.body.role){
            Role.find({ name: {$in : req.body.role}},
                (err, role) => {
                    if(err){
                        res.status(500).send({ message: err });
                        return;
                    }
                    user.role= role.map(role => role._id);
                    user.save(err => {
                        if(err){
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.status(201).send({ message: "User was registered successfully!" });
                        return;
                    });
                }
            );
        }else{
            Role.findOne({name: "tecnico_interno"}, (err, role) => {
                if(err){
                    res.status(500).send({ message: err });
                    return;
                }
                utente.role=role._id;
                utente.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.status(201).send({ message: "User was registered successfully!" });
                });
            });
        }
        
    });
};


exports.signin= (req, res) => {
    Utente.findOne({
        nome: req.body.nome,
        cognome: req.body.cognome
    })
    .populate("role", "-__v")
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if(!user){
            return res.status(404).send({ message: "User Not found." });
        }
        
        if(!req.body.password){
            return res.status(400).send({message: "Nessuna password inserita"});
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, process.env.SECRET, {expiresIn: 86400}); // 24 hours

        var authority= "ROLE_" + user.role.name.toUpperCase();
        res.status(200).send({
            id: user._id,
            nome: user.nome,
            cognome: user.cognome,
            email: user.email,
            numero_telefono: user.numero_telefono,
            data_nascita: user.data_nascita,
            role: authority,
            accessToken: token
          });
    });
};