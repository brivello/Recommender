const restaurants = require("./../seed/out/restaurants.json");
const teammates = require("./../seed/out/teammates.json");
const ratings = require("./../seed/out/ratings.json");

const {
	getRatings,
	getRatingsForTeammateId,
	getRatingsForRestaurantId,	
	confirmRatingExists
} = require('./ratings.js');

const {
	getTeammates,
	getTeammateIdsThatLikedRestaurantId,
	getTeammateIdsThatDislikedRestaurantId,
	getTeammateFromSearchText,
} = require('./teammates.js');


const getRestaurants = () => {
	return restaurants
};

const likedResterauntsByTeammate = {};
const getRestaurantIdsLikedByTeammateId = (teammateId) => {               /*
	- input:  (string) teammatetId
	- output: set of (string) restaurantIds                               */
	let goodRestaurants = likedResterauntsByTeammate[teammateId];
	if (goodRestaurants == null) {
		goodRestaurants = getResterauntIdsWithOpinionAndTeamateId(teammateId, "LIKE");
		likedResterauntsByTeammate[teammateId] = goodRestaurants;
	}
	return goodRestaurants
};

const dislikedResterauntsByTeammate = {};
const getRestaurantIdsDislikedByTeammateId = (teammateId) => {               /*
	- input:  (string) teammatetId
	- output: set of (string) restaurantIds                                  */
	let badRestaurants = dislikedResterauntsByTeammate[teammateId];
	if (badRestaurants == null) {
		badRestaurants = getResterauntIdsWithOpinionAndTeamateId(teammateId, "DISLIKE");
		dislikedResterauntsByTeammate[teammateId] = badRestaurants;
	}
	return badRestaurants
};
function getResterauntIdsWithOpinionAndTeamateId (teammateId, rating) {              /*
	- input:  (string) teammatetId
	- output: set of (string) restaurantIds                                          */
	restaurantSubset = new Set();
	for (var i = 0; i < ratings.length; i++) {
		if (ratings[i].teammateId == teammateId && ratings[i].rating == rating) {
			restaurantSubset.add(ratings[i].restaurantId);
		}
	}
	return restaurantSubset;
}

const getRestaurantById = (restaurantId) => {              /*
	- input:  (string) restaurantId
	- output: restaurant JSON object                       */
	for (var i = 0; i < restaurants.length; i++) {
		if (restaurants[i].id == restaurantId) {
			return restaurants[i];
		}
	}
}


module.exports = {
	getRestaurantById,
	getRestaurants,
	getRestaurantIdsLikedByTeammateId,
	getRestaurantIdsDislikedByTeammateId
};