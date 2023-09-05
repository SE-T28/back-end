const mongoose= require("mongoose");

const Missione= mongoose.model("missione", new mongoose.Schema({
    "titolo": {type: String, required: true},
    "descrizione": {type: String, required: true},
    "immagine": {type: String, required: true}
}))

module.exports= Missione;