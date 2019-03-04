const restaurants = require("./../seed/out/restaurants.json");
const teammates = require("./../seed/out/teammates.json");
const ratings = require("./../seed/out/ratings.json");

const {
	getRatings,
	getRatingsForTeammateId,
	getRatingsForRestaurantId,	
	getUnvisitedRestaurantIdForTeammateId,
	confirmRatingExists
} = require('./ratings.js');

const {
	getRestaurantById,
	getRestaurants,
	getRestaurantIdsLikedByTeammateId,
	getRestaurantIdsDislikedByTeammateId
} = require('./restaurants.js');


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
	return sadTeammates;
};

const getTeammateFromSearchText = (searchText) => {
	let results = search(teammates, searchText);
	if (results.length > 0) {
		return results[0];
	}
	return null;
}

function getTeammateIdsWithOpinionOfRestaurantId (restaurantId, opinion) {
	teammateSubset = new Set();
	for (var i = 0; i < ratings.length; i++) {
		if (ratings[i].restaurantId == restaurantId && ratings[i].rating == opinion) {
			teammateSubset.add(ratings[i].teammateId);
		}
	}
	return teammateSubset;
}

function search(source, name) {
    var results = [];
    var index;
    var entry;

    name = name.toUpperCase();
    for (index = 0; index < source.length; ++index) {
        entry = source[index];
        if (entry && entry.name && entry.name.toUpperCase().indexOf(name) !== -1) {
            results.push(entry);
        }
    }
    return results;
}


module.exports = {
	getTeammates,
	getTeammateIdsThatLikedRestaurantId,
	getTeammateIdsThatDislikedRestaurantId,
	getTeammateFromSearchText
};