const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types;

const schema = mongoose.Schema;

const competitionSchema = new schema({
    problemId:{
        type:ObjectId,
        required:true,
        ref:"problem"
    },
    user:{
        type:ObjectId,
        required:true
    },
    competitionName:{
        type:String,
        required:true
    },
    isQuestionSolved:{
        type:Boolean,
        default:false
    },
    solvedAt:{
        type:Date
    },
    roomId:{
        type:ObjectId,
        required:true,
        ref:"room"
    }
},{
    timestamps:true
});
module.exports = mongoose.model("competition",competitionSchema);