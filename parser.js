const ratings = require("./seed/out/ratings.json");
const restaurants = require("./seed/out/restaurants.json");
const teammates = require("./seed/out/teammates.json");



const getRatings = () => {
	return ratings
};


const teammateRatingsDict = {};

const getRatingsForTeammateId = (teammateId) => {
	var teammateRatings;
	teammateRatings = teammateRatingsDict[teammateId];

	if (teammateRatings == null) {
		teammateRatings = [];
		for (var i = 0; i < ratings.length; i++){ 
			if (ratings[i].teammateId == teammateId) {
				teammateRatings.push(ratings[i]);
			}
		}
		teammateRatingsDict[teammateId] = teammateRatings;
	} 
	return teammateRatings
};

const getRatingsForRestaurantId = (restaurantIds) => {
	var resterauntRatings = [];
	for (var i = 0; i < ratings.length; i++){ 
		for (var j = 0; j < ratings.length; i++) {
			if (ratings[i].restaurantId == restaurantIds[j]) {
				teammateRatings.push(ratings[i]);
			}
		}
	}
	return resterauntRatings
};

const getTeammates = () => {
	return teammates
};

const teammatesThatLikedRestaurant = {};
const getTeammateIdsThatLikedRestaurantId = (restaurantId) => { /*
	- input:  (string) restaurantId
	- output: set of (string) teammateIds                       */
	let happyTeammates = getTeammateIdsWithOpinionOfRestaurantId[restaurantId];
	if (happyTeammates == null) {
		happyTeammates = getTeammateIdsWithOpinionOfRestaurantId(restaurantId, "LIKE");
		teammatesThatLikedRestaurant[restaurantId] = happyTeammates;
	}
	return happyTeammates
};

const teammatesThatDislikedRestaurant = {};
const getTeammateIdsThatDislikedRestaurantId = (restaurantId) => { /*
	- input:  (string) restaurantId
	- output: set of (string) teammateIds                        */
	let sadTeammates = getTeammateIdsWithOpinionOfRestaurantId[restaurantId];
	if (sadTeammates == null) {
		sadTeammates = getTeammateIdsWithOpinionOfRestaurantId(restaurantId, "DISLIKE");
		teammatesThatDislikedRestaurant[restaurantId] = sadTeammates;
	}
	return sadTeammates
};

function getTeammateIdsWithOpinionOfRestaurantId (restaurantId, opinion) {
	teammateSubset = new Set();
	for (var i = 0; i < ratings.length; i++) {
		if (ratings[i].restaurantId == restaurantId && ratings[i].rating == opinion) {
			teammateSubset.add(ratings[i].teammateId);
		}
	}
	return teammateSubset;
}

const getRestaurants = () => {
	return restaurants
};

/* Parsing for SimilarityIndex */
const likedResterauntsByTeammate = {};
const getRestarauntIdsLikedByTeammateId = () => {
	return restaurants
};
const dislikedResterauntsByTeammate = {};
const getRestaurantIdsDislikedByTeammateId = () => {
	return restaurants
};



/* Parsing for Tests */

const testTeammatesOpinionOfRestaurant = (teammateId, restaurantId, opinion) => {
	for (var i = 0; i < ratings.length; i++) {
		if (ratings[i].restaurantId == restaurantId && ratings[i].teammateId == teammateId) {
			if (ratings[i].rating == opinion) {
				return true;
			} else {
				return false;
			}
		}
	}
	return null;
}

module.exports = {
	getRatings,
	getRatingsForTeammateId,
	getRatingsForRestaurantId,
	getTeammates,
	getTeammateIdsThatLikedRestaurantId,
	getTeammateIdsThatDislikedRestaurantId,
	getRestaurants,
	getRestarauntIdsLikedByTeammateId,
	getRestaurantIdsDislikedByTeammateId,
	testTeammatesOpinionOfRestaurant
};


/*class Rating {
	constructor (teamateId, restaurantId, rating) {
		this.teamateId = teamateId;
		this.restaurantId = restaurantId;
		this.rating = rating;
	}
}
var parsedRatings = [];
	for (var i = 0; i < ratings.length; i++){ 
		var rating = ratings[i];
		console.log(rating.rating);
		parsedRatings.push(new Rating(rating.teammateID, rating.restaurantId, rating.rating));
	}
	return parsedRatings
*/