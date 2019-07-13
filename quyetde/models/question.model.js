const mongoose = require(`mongoose`);
var random = require('mongoose-simple-random');
const QuestionSchema = new mongoose.Schema({
    questionContent:{
        type:String,
        required:true,
    },
    like:{
        type:Number,
        default:0,
    },
    dislike:{
        type:Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default: new Date(),
    },
});
QuestionSchema.plugin(random);
const questionModel = mongoose.model('Question',QuestionSchema);
module.exports = questionModel;