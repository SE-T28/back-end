const News = require('../models/news');

const getList= (req, res) => {
    News.find({}, (err, data)=>{
        if (err){
            return res.status(500).json({Error: err});
        }
        return res.status(200).json(data);
    })
};

module.exports= {getList};