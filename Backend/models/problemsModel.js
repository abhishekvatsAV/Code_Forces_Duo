const mongoose = require("mongoose");

const schema = mongoose.Schema;

const problemSchema = new schema({
    link:{
        type:String,
        required:true
    },
    difficultyIndex:{
        type:String,
        default:"A"
    },
    contestId:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    solvedBy:{
        type:Number,
        default:0
    },
    tags:[
        {
            type:String,
            required:true
        }
    ]
})
module.exports = mongoose.model("problem",problemSchema);