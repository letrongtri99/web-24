const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    createdAt:{
        type:Date,
        default: new Date()
    },
    content:{
        type:String,
        require:true
    },
    views:{
        type:Number,
        default:0
    },
    imageUrl:{
        type:String,
        require:true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
        require:true
    }
})
const postModel = mongoose.model('Posts',PostSchema);
module.exports= postModel;