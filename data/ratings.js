const restaurants = require("./../seed/out/restaurants.json");
const teammates = require("./../seed/out/teammates.json");
const ratings = require("./../seed/out/ratings.json");

const {
	getRestaurantById,
	getRestaurants,
	getRestaurantIdsLikedByTeammateId,
	getRestaurantIdsDislikedByTeammateId
} = require('./restaurants.js');

const {
	getTeammates,
	getTeammateIdsThatLikedRestaurantId,
	getTeammateIdsThatDislikedRestaurantId,
	getTeammateFromSearchText,
} = require('./teammates.js');

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

const getRatingsForRestaurantId = (restaurantId) => {
	var restaurantRatings = [];
	for (var i = 0; i < ratings.length; i++){ 
		if (ratings[i].restaurantId == restaurantId) {
			restaurantRatings.push(ratings[i]);
		}
	}
	return restaurantRatings
};

const getUnvisitedRestaurantIdForTeammateId = (teammateId) => {              /*
	- input:  (string) teammatetId
	- output: set of (string) restaurantIds                                   */
	let newRestaurants = new Set(restaurants.map( x => x.id));
	getRatingsForTeammateId(teammateId).map( rRating => {
		newRestaurants.delete(rRating.restaurantId);
	});
	return newRestaurants;
};


/* For tests */
const confirmRatingExists = (rating, teammateId, restaurantId) => {
	let rRatings = getRatingsForRestaurantId(restaurantId);
	for (let rRating of rRatings) {
		if (rRating.teammateId == teammateId && rRating.rating == rating) {
			return true;
		}
	}
	return false;
}



module.exports = {
	getRatings,
	getRatingsForTeammateId,
	getRatingsForRestaurantId,
	getUnvisitedRestaurantIdForTeammateId,
	confirmRatingExists
};