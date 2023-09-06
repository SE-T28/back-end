const Utente= require('../models/utente');

const getList= (req, res) => {
    Utente.find({}, (err, data)=>{
        if (err){
            return res.status(500).json({Error: err});
        }
        return res.status(200).json(data);
    })
};

const deleteUsr= (req, res) => {
    let nome= req.params.nome;
    let cognome= req.params.cognome
    Utente.findOneAndDelete({nome: nome, cognome: cognome}, (err, data) => {
        if(err){
            return res.status(500).json({Error: err});
        }
        if(!data) {
            return res.status(404).json({message: "User '" + nome + " " + cognome + "' doesn't exist."});
        }else{
            return res.status(200).json(data); 
        }
    });
};

module.exports= {getList, deleteUsr};