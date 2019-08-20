const mongoose = require("mongoose");
const NewSchema = mongoose.Schema({
    createdAt:{
        type:Date,
        default: new Date()
    },
    imageUrl:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true 
    },
    overview:{
        type:String,
        require:true
    },
    kind:{
        type:String,
        require:true
    }
})
const newsModel = mongoose.model('News',NewSchema);
module.exports = newsModel;