const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types;

const schema = mongoose.Schema;

const roomSchema = new schema({
    roomId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    },
    roomType:{
        type:String,
        enums:["Public","Private"],
        default:"Public"
    },
    host:{
        type: String,
        required: true
    },
    isRoomFull:{
        type: Boolean,
        default:false
    }
},{
    timestamps:true
});
module.exports = mongoose.model("room",roomSchema);