const mongoose = require(`mongoose`);
const GameSchema = new mongoose.Schema({
    namePerson:{
        type:Array,
        required:true,
    },
    html:{
        type:String,
        default:" ",
    },
    times:{
        type:Number,
        default: 2,
    },
    score:[],
});
const gameModel = mongoose.model('Game',GameSchema);
module.exports = gameModel;