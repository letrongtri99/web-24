//email=>required,unique
//password=>required
//fullName=>required
//createdAt
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
    createdAt:{
        type:Date,
        default: new Date(),
    },
    addRess:{
        type:String,
        default:'',
    },
    avatar:{
        type:String,
        default:''
    }
});
const userModel = mongoose.model('Users',UserSchema);
module.exports = userModel;