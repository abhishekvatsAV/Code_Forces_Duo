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
							$multiply:[
								{
									$ceil:{
										$divide:[
											{
												$subtract:["$problemRating",799]
											},
											450
										]
									}
								},
								100
							]
						}
					}
				}
			}
		]);
		totalScore = totalScore.totalScore ? totalScore.totalScore : 0;
        return totalScore;
    } catch (error) {
        console.log(error);
        return 0;
    }
}