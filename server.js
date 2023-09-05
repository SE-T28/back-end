const mongoose = require("mongoose");
const express = require("express");
const cors= require("cors");
const swaggerUi= require('swagger-ui-express');
const swaggerDocument= require('./swagger.json');
const app=express();
app.use(express.json());

require('dotenv').config();

app.listen(process.env.PORT || 8080, () =>
    console.log('app listening on port ' + process.env.PORT + '!')
);

//-------------connection to DB------------------------------------------
const db= require('./models');
const Role= db.role;

db.mongoose.set('strictQuery', false);
try {
    db.mongoose.connect(
        process.env.MONGOATLASURI,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
            console.log(" Mongoose is connected");
        }
    );
} catch (e) {
    console.log("could not connect");
    process.exit();
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
//------------------------------------------------------------------------

var corsOptions = {
    origin: "http://localhost:8081"
  };

app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const path= __dirname + "/views/";
app.use(express.static(path));

app.get("/",function (req,res) {
  res.sendFile(path + "index.html");
});
/*app.get("/", function (req, res) {
    res.send(req.headers, req.originalUrl, req.method, req.body);
});*/
/*
function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if(!err && count==0){
            new Role({
                name: "tecnico_interno"
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added 'tecnico_interno' to roles collection");
              });
        
              new Role({
                name: "amministratore"
              }).save(err => {
                if (err) {
                  console.log("error", err);
                }
        
                console.log("added 'amministratore' to roles collection");
              });
        }
    })
}*/

const routesTask= require('./routes/task');
app.use('/', routesTask);

const routesModulo= require('./routes/modulo');
app.use('/', routesModulo);

const routesNews= require('./routes/news');
app.use('/', routesNews);

const routesAgenzia= require('./routes/agenzia');
app.use('/', routesAgenzia);

const routesMissioni= require('./routes/missione');
app.use('/', routesMissioni);

require('./routes/utente')(app);
//const routesUtente= require('./routes/utente');
//app.use('/', routesUtente);

require('./routes/auth.routes')(app);

//const routesAuth= require('./routes/auth.routes');
//app.use('/', routesAuth);
