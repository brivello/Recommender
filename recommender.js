const {	getUnvisitedRestaurantIdForTeammateId,
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
	confirmRatingExists} = require('./parser.js');

const {similarityIndex} = require("./similarityIndex.js");

const recommendationForRestaurantId = (userId, restaurantId) => {

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

let userId = "e17b91cb-5a2c-4055-befb-1d1ea9f7daca"
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
});

console.log(recommendedRestaurants.slice(0,3));



module.exports = { recommendationForRestaurantId }

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

/*const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/