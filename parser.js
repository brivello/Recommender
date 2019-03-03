const ratings = require("./seed/out/ratings.json");
const restaurants = require("./seed/out/restaurants.json");
const teammates = require("./seed/out/teammates.json");



const getRatings = () => {
	return ratings
};


const teammateRatingsDict = {};


/* parsing for Recommender */

const getUnvisitedRestaurantIdForTeammateId = (teammateId) => {
	let newRestaurants = new Set(restaurants.map( x => x.id));
	getRatingsForTeammateId(teammateId).map( rRating => {
		newRestaurants.delete(rRating.restaurantId);
	});
	return newRestaurants;
};

const getRestaurantById = (restaurantId) => {
	for (var i = 0; i < restaurants.length; i++) {
		if (restaurants[i].id == restaurantId) {
			return restaurants[i];
		}
	}
}


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
const getRestaurantIdsLikedByTeammateId = (teammateId) => {               /*
	- input:  (string) teammatetId
	- output: set of (string) restaurantIds                     */
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
	- output: set of (string) restaurantIds                        */
	let badRestaurants = dislikedResterauntsByTeammate[teammateId];
	if (badRestaurants == null) {
		badRestaurants = getResterauntIdsWithOpinionAndTeamateId(teammateId, "DISLIKE");
		dislikedResterauntsByTeammate[teammateId] = badRestaurants;
	}
	return badRestaurants
};

function getResterauntIdsWithOpinionAndTeamateId (teammateId, rating) {
	restaurantSubset = new Set();
	for (var i = 0; i < ratings.length; i++) {
		if (ratings[i].teammateId == teammateId && ratings[i].rating == rating) {
			restaurantSubset.add(ratings[i].restaurantId);
		}
	}
	return restaurantSubset;
}



/* Parsing for Tests */

const confirmRatingExists = (rating, teammateId, restaurantId) => {
	let rRatings = getRatingsForRestaurantId(restaurantId);
	for (let rRating of rRatings) {
		if (rRating.teammateId == teammateId && rRating.rating == rating) {
			return true;
		}
	}
	return false;
}


const testTeammatesOpinionOfRestaurant = (teammateId, restaurantId, opinion) => {
	for (var i = 0; i < ratings.length; i++) {
		if (ratings[i].restaurantId == restaurantId && ratings[i].teammateId == teammateId) {
			if (ratings[i].rating == opinion) {
				return true;
			}
		}
	}
	return false;
}

module.exports = {
	getUnvisitedRestaurantIdForTeammateId,
	getRestaurantById,
	getRatings,
	getRatingsForTeammateId,
	getRatingsForRestaurantId,
	getTeammates,
	getTeammateIdsThatLikedRestaurantId,
	getTeammateIdsThatDislikedRestaurantId,
	getRestaurants,
	getRestaurantIdsLikedByTeammateId,
	getRestaurantIdsDislikedByTeammateId,
	testTeammatesOpinionOfRestaurant,
	confirmRatingExists
};