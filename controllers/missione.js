const Missione= require('../models/missioni');

const getList= (req, res) => {
    Missione.find({}, (err, data)=>{
        if (err){
            return res.status(500).json({Error: err});
        }
        return res.status(200).json(data);
    })
};

module.exports={getList};