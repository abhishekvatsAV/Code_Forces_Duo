const mongoose = require("mongoose");

const schema = mongoose.Schema;

const {ObjectId} = mongoose.Schema.Types;

const solvedProblemsSchema = new schema({
    problemId:{
        type:ObjectId,
        required:true,
        ref:"problems"
    },
    userId:{
        type:ObjectId,
        required:true,
        ref:"users"
    },
    problemRating:{
        type:Number,
        default:0
    },
    competitionId:{
        type:ObjectId,
        required:true,
        ref:"competition"
    }
},
{
    timestamps:true
});
module.exports = mongoose.model("solvedProblem",solvedProblemsSchema);
