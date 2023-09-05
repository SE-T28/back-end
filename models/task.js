const mongoose=require('mongoose');

const Task = mongoose.model("task", new mongoose.Schema({
    "data_inizio" : {type: Date, required: true},
    "data_fine" : {type: Date, required: true},
    "nome" : {type: String, required: true},
    "modulo" : {type: String, required: false},
    "descrizione" : {type: String, required: false},
    "completata" : {type: Boolean, required: true, default: false},
    "userId" : {type: mongoose.Schema.Types.ObjectId, ref: "Utente"}
}));

module.exports = Task;