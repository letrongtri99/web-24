const mongoose = require("mongoose");
const BuySchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default: new Date(),
    },
    products:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    imageUrl:{
        type:String,
        require:true
    },
    fullName:{
        type:String,
        require:true
    }
});
const buyModel = mongoose.model('Buy',BuySchema);
module.exports = buyModel;