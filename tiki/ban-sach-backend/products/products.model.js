const mongoose = require("mongoose");
const ProductsSchema = mongoose.Schema({
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
    price:{
        type:String,
        require:true 
    },
    deductprice:{
        type:String,
        require:true
    },
    kind:{
        type:String,
        require:true
    }
})
const productsModel = mongoose.model('Products',ProductsSchema);
module.exports = productsModel;