const axios = require("axios");
const problemsModel = require("../models/problemsModel");
const solvedProblem = require("../models/solvedProblems");
const { getTotalScore } = require("./competition.utils");

exports.markProblemAsSolved = async (data,socket,userData,io) => {
    try {
        let { problems : competitionProblems, competitionId, userId, roomId} = data;
        console.log(data);
        for(let i = 0;i<competitionProblems.length;i++){
            let problemId = competitionProblems[i].problemId._id;
            let problemData = competitionProblems[i].problemId;
            let problems = (await axios.get(`https://codeforces.com/api/user.status?handle=${JSON.parse(userData.userName)}&from=1&count=${competitionProblems.length * 10}`)).data.result;
            let doesProblemExists = problems.find(problem => {
                return (problem.problem.contestId === problemData.contestId && problem.problem.index === problemData.difficultyIndex && problem.verdict === "OK");
            })
            let alreadySolvedProblem = await solvedProblem.findOne({
                problemId,
                competitionId,
                userId
            })
            if(!doesProblemExists || alreadySolvedProblem){
                continue;
            }

            (new solvedProblem({
                problemId,
                competitionId,
                userId,
                problemRating:problemData.rating
            })).save();
            socket.broadcast.to(roomId).emit("solved_a_problem",{
                message:`${userData.userName} solved a problem!`,
                userName:userData.userName	
            })
        }
        let totalScore = await getTotalScore(userId,competitionId);
        console.log(totalScore);
        io.in(roomId).emit("total_score",{
            totalScore,
            userId
        })
    } catch (error) {
        console.log(error);
    }
}