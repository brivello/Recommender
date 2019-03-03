var ratings = require("./seed/out/ratings.json");

function ratingsForTeammate(teammateId) {
	var teamateRatings = {};
	for (var i = 0; i < ratings.length; i++){
		if (teammateId == ratings[0]["teammateId"]) {
			teamateRatings.add(ratings);
		}
	}
}

module.exports = function(teammate1, teammate2) {
	return ratingsForTeammate(teammate1);
}
