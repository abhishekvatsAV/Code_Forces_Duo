let solvedProblemModel = require("../models/solvedProblems");

exports.getTotalScore = async (userId,competitionId) => {
    try {
        
		let totalScore = await solvedProblemModel.aggregate([
			{
				$match: {
					userId,
					competitionId
				}
			},
			{
				$group: {
					_id: null,
					totalScore: {
						$sum: {
							$divide:[
								"$problemRating",
								100
							]
						}
					}
				}
			}
		]);
		console.log(totalScore);
		totalScore = totalScore[0] ? totalScore[0].totalScore : 0;
        return totalScore;
    } catch (error) {
        console.log(error);
        return 0;
    }
}