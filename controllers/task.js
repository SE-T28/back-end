const Task = require('../models/task');
const Utente= require('../models/utente')
const Role= require('../models/role');
const { role } = require('../models');

const addTask= (req, res) => {
    Task.findOne({nome: req.body.nome}, (err, data) =>{
        //se non è già presente nel db
        if(!data){
            Utente.findById(req.userId).exec((err, user) =>{
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                //cerco il role dell'utente che ha inviato la richiesta
                Role.findOne({_id: {$in : user.role}}, (err, role) => {
                    if(err){
                        res.status(500).send({ message: err });
                        return;
                    }
                    if(role.name === "tecnico_interno"){
                        const newTask= new Task({
                            data_inizio: req.body.data_inizio,
                            data_fine: req.body.data_fine,
                            nome: req.body.nome,
                            modulo: req.body.modulo,
                            descrizione: req.body.descrizione,
                            completata: req.body.completata,
                            userId: req.userId //se un tecnico interno l'userId della task è l'Id dell'utente
                        });
                        newTask.save((err, data)=>{
                            if(err) return res.status(500).json({Error: err});
                            return res.status(201).json(data);
                        });
                    }else if(role.name==='amministratore'){
                        //cerco il tecnico interno a cui assegnare la task
                        Utente.findOne({nome: req.body.nomeuser, cognome: req.body.cognomeuser},
                            (err, utente) => {
                            if(err){
                                res.status(500).send({ message: err });
                                return;
                            }
                            if(!utente){
                                return res.status(404).json({message: "Utente non trovato"})
                            }
                            const newTask= new Task({
                                data_inizio: req.body.data_inizio,
                                data_fine: req.body.data_fine,
                                nome: req.body.nome,
                                modulo: req.body.modulo,
                                descrizione: req.body.descrizione,
                                completata: req.body.completata,
                                userId: utente._id  //se amministratore lo userId della task è l'id del tecnico interno cercato
                            });
                             newTask.save((err, data)=>{
                                if(err) return res.status(500).json({Error: err});
                                return res.status(201).json(data);
                            });                
                        });
                    }
                });
            });
        }else{
            if(err) return res.status(500).json("Qualcosa è andato storto, riprova. ${err}");
            return res.status(409).json({message: "Esiste già una task con questo nome"})
        }
    });
};






const getList= (req, res) => {
    Utente.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        
        //cerco il role dell'utente
        Role.findOne({_id: {$in : user.role}}, (err, role) => {
            if(err){
                res.status(500).send({ message: err });
                return;
            }   

            if(role.name == 'amministratore'){
                //se amministratore prende tutte le task nel db
                Task.find({}, (err, data)=>{
                    if (err){
                        return res.json({Error: err});
                    }
                    return res.status(200).json(data);
                });
            }else if(role.name == 'tecnico_interno'){
                //se tecnico interno prende solo le task riferite a quell'utente
                Task.find({userId: req.userId}, (err, data)=>{
                    if (err){
                        return res.json({Error: err});
                    }
                    return res.status(200).json(data);
                });
            }
        });
    });
};




const getTask= (req, res) => {
    Utente.findById(req.userId, (err, user)=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }
        //cerco il role dell'utente
        Role.findOne({_id: {$in : user.role}}, (err, role) => {
            if(err){
                res.status(500).send({ message: err });
                return;
            }

            Task.findOne({nome:req.params.nome}, (err, data) => {
                if(err){
                    return res.status(500).send({message: err});
                }
                if (!data){
                    return res.status(404).json({message: "Task doesn't exist."});
                }else{
                    //se amministratore oppure se tecnico interno e la task che sta cercando è la sua allora la restituisco
                    if ((role.name=='tecnico_interno' && data.userId==req.userId) || role.name=='amministratore'){
                        return res.status(200).json(data);
                    }else{
                        return res.status(403).json({message: "La task non appartiene all'utente " + req.userId})
                    }
                }
            })    
        });
    })
};




const deleteTask= (req, res) => {
    Utente.findById(req.userId, (err, user)=>{
        if(err){
            res.status(500).send({message: err});
            return;
        }
        //cerco il role dell'utente
        Role.findOne({_id: {$in : user.role}}, (err, role) => {
            if(err){
                res.status(500).send({ message: err });
                return;
            }
            if(role.name=='amministratore'){
                //se amministratore elimino la task se esiste
                Task.findOneAndDelete({nome:req.params.nome}, (err, data) => {
                    if(err){
                        return res.status(500).send({message: err});
                    }
                    if(!data) {
                        return res.status(404).json({message: "La task non esiste."});
                    }else{
                        return res.status(200).json(data);
                    }
                });
            }else if(role.name=='tecnico_interno'){
                //se tecnico interno elimino la task se esiste e appartiene all'utente
                Task.findOneAndDelete({nome:req.params.nome, userId: req.userId}, (err, data) => {
                    if(err){
                        return res.status(500).send({message: err});
                    }
                    if(!data) {
                        return res.status(404).json({message: "La task non esiste o non appartiene a questo utente."});
                    }else{
                        return res.status(200).json(data);
                    }
                });
            }
        });
    });
};

const modificaTask= (req, res) =>{
    Utente.findById(req.userId, (err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        //cerco il role dell'utente
        Role.findOne({_id: {$in : user.role}}, (err, role) => {
            if(err){
                res.status(500).send({ message: err });
                return;
            }
            if(role.name=='amministratore'){
                Task.findOneAndUpdate({nome: req.params.nome},
                    {
                        data_inizio: req.body.data_inizio,
                        data_fine: req.body.data_fine,
                        nome: req.body.nome,
                        modulo: req.body.modulo,
                        descrizione: req.body.descrizione,
                        completata: req.body.completata
                    },
                    (err, data) => {
                        if(err){
                            res.status(500).send({ message: err });
                            return;
                        }
                        if(!data){
                            return res.status(404).json({message: "La task non esiste"})
                        }else{
                            return res.status(200).send({message: "Task modificata!"})
                        }
                    });
            }else if(role.name=='tecnico_interno'){
                Task.findOneAndUpdate({nome: req.params.nome, userId: req.userId},
                    {
                        data_inizio: req.body.data_inizio,
                        data_fine: req.body.data_fine,
                        nome: req.body.nome,
                        modulo: req.body.modulo,
                        descrizione: req.body.descrizione,
                        completata: req.body.completata
                },
                (err, data) => {
                    if(err){
                        res.status(500).send({ message: err });
                        return;
                    }
                    if(!data){
                        return res.status(404).json({message: "La task non esiste o non appartiene a questo utente"})
                    }else{
                        return res.status(200).send({message: "Task modificata!"})
                    }
                });
            }
        });
    });
};


module.exports = {addTask, getList, getTask, deleteTask, modificaTask};