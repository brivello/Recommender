const {similarityIndex} = require("./similarityIndex.js");

const {
	getRatings,
	getRatingsForTeammateId,
	getRatingsForRestaurantId,	
	getUnvisitedRestaurantIdForTeammateId,
	confirmRatingExists
} = require('./data/ratings.js');

const {
	getRestaurantById,
	getRestaurants,
	getRestaurantIdsLikedByTeammateId,
	getRestaurantIdsDislikedByTeammateId
} = require('./data/restaurants.js');

const {
	getTeammates,
	getTeammateIdsThatLikedRestaurantId,
	getTeammateIdsThatDislikedRestaurantId,
	getTeammateFromSearchText,
} = require('./data/teammates.js');


const recommend = (userId) => {
	let unvistedRestaurantIds = getUnvisitedRestaurantIdForTeammateId(userId);
	let recommendedRestaurants = [];

	for (let rId of unvistedRestaurantIds) {
		restaurant = getRestaurantById(rId)
		restaurant['recommendation'] = recommendationForRestaurantId(userId, rId);
		recommendedRestaurants.push(restaurant);
	}

	recommendedResaurants = recommendedRestaurants.sort( (lhs, rhs) => {
		return lhs.recommendation < rhs.recommendation ?  1
			 : lhs.recommendation > rhs.recommendation ? -1
			 : 0;
	}); // sort the highest recommended retaurants first 

	return recommendedRestaurants.slice(0,3).sort( (lhs, rhs) => {
		return lhs.rating < rhs.rating ?  1
			 : lhs.rating > rhs.rating ? -1
			 : 0;
	}); // sort the final three hightest restaurants by rating
}

function recommendationForRestaurantId (userId, restaurantId) {

	let likedSimilarityIndexSum    = 0;
	let dislikedSimilarityIndexSum = 0;
	let totalRatings = getRatingsForRestaurantId(restaurantId).length;

	let teammatesWhoLiked     = getTeammateIdsThatLikedRestaurantId(restaurantId);
	let teammatesWhoDisliked = getTeammateIdsThatDislikedRestaurantId(restaurantId);

	for (let teammateId of teammatesWhoLiked) {
		likedSimilarityIndexSum += similarityIndex(userId, teammateId);
	}
	for (let teammateId of teammatesWhoDisliked) {
		dislikedSimilarityIndexSum += similarityIndex(userId, teammateId);
	}
	
	return (likedSimilarityIndexSum - dislikedSimilarityIndexSum) / totalRatings;
}

module.exports = { recommend }
