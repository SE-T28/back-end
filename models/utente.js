const mongoose= require('mongoose');

const Utente= mongoose.model("utente", new mongoose.Schema({
    "nome": {type: String, required: true},
    "cognome": {type: String, required: true},
    "email": {type: String, required: false},
    "numero_telefono": {type: String, required: false},
    "data_nascita": {type: String, required: false},
    "password": {type: String, required: true},
    "role":{type: mongoose.Schema.Types.ObjectId, ref: "Role"},
    "immagine": {type: String, required: false},
    "bio": {type: String, required: false},
    "occupazione": {type: String, required: false},
    "missioni": {type: String, required: false}
}));

module.exports= Utente;