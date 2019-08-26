const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
    },
    passWord:{
        type:String,
        require:true,
    },
    fullName:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        default:'users'
    },
    permission:{
        type:String,
        default:'order'
    },
    createdAt:{
        type:Date,
        default: new Date(),
    },
    products:[],
    amount:[],
    priceEach:[],
    price:{
        type:Number,
        default:0
    }
});
const userModel = mongoose.model('Users',UserSchema);
module.exports = userModel;