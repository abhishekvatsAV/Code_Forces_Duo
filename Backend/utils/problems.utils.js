const solvedProblem = require("../models/solvedProblems");

exports.markProblemAsSolved = (data) => {
    try {
        let { problemId, competitionId, userId} = data;
        (new solvedProblem({
            problemId,
            competitionId,
            userId
        })).save();
    } catch (error) {
        console.log(error);
    }
}