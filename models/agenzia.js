const mongoose= require('mongoose');

const Agenzia= mongoose.model("agenzia", new mongoose.Schema({
    "nome" : {type: String, required: true},
    "logo" : {type: String, required: true}
}));

module.exports= Agenzia;