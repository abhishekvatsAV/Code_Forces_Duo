const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const schema = mongoose.Schema;

const competitionSchema = new schema({
    problems: [
        {
            problemId: {
                type: ObjectId,
                required: true,
                ref: "problem"
            }
        }
    ],
    users: [
        {
            type: ObjectId,
            required: true
        }
    ],
    competitionName: {
        type: String,
        required: true
    },
    roomId: {
        type: ObjectId,
        required: true,
        ref: "room"
    },
    ratingRange:{
        upperLimit:{
            type:Number,
            required:true
        },
        lowerLimit:{
            type:Number,
            required:true
        }
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("competition", competitionSchema);