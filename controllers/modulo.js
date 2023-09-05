const Modulo= require('../models/modulo');

// GET 
const getList= (req, res) => {
    Modulo.find({}, (err, data)=>{
        if (err){
            return res.status(500).json({Error: err});
        }
        if(!data){
            return res.status(404);
        }else{
            return res.status(200).json(data);
        }
    })
};

const getModulo= (req, res) => {
    let name= req.params.nome;
    Modulo.findOne({nome:name}, (err, data) => {
        if(err){
            return res.status(500);
        }
        if (!data){
            return res.status(404).json({message: "Module " + name + " doesn't exist."});
        }else{
            return res.status(200).json(data);
        }
    })    
};

module.exports = {getList, getModulo};