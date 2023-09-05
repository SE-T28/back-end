const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.utente = require("./utente");
db.role = require("./role");

db.ROLES = ["tecnico_interno", "amministratore"];

module.exports = db;