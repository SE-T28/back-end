const Agenzia= require('../models/agenzia');

const getList= (req, res) => {
    Agenzia.find({}, (err, data)=>{
        if (err){
            return res.status(500).json({Error: err});
        }
        return res.status(200).json(data);
    })
};

module.exports= {getList};