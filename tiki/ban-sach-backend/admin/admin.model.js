const mongoose = require("mongoose");
const AdminSchema = mongoose.Schema({
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
        default:'admin'
    },
    permission:{
        type:String,
        default:'post'
    },
    createdAt:{
        type:Date,
        default: new Date(),
    }
});
const adminModel = mongoose.model('Admins',AdminSchema);
module.exports = adminModel;