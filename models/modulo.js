const mongoose= require('mongoose');

const Modulo= mongoose.model("modulo", new mongoose.Schema({
    "nome" : {type: String, required:true},
    "descrizione" : {type: String, required:true},
    "nazione" : {type: String, required:true},
    "application" : {type: String, required:true},
    "operator" : {type: String, required:true},
    "contrartors" : {type: String, required:true},
    "power" : {type: String, required:true},
    "mass" : {type: String, required:true},
    "launch_date" : {type: String, required:true},
    "other_details" : {type: String, required:false},
    "image": {type: String, required: true}
}));

module.exports= Modulo;