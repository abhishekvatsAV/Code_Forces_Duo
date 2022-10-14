const mongoose = require("mongoose");

const schema = mongoose.Schema;

const problemSchema = new schema({
    link:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        default:"Easy",
        enums:["Easy","Medium","Hard","Expert"]
    },
    solvedBy:{
        type:Number,
        default:0
    }
})
module.exports = mongoose.model("problem",problemSchema);