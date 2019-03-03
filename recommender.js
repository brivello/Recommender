const readline = require('readline');

const {	getUnvisitedRestaurantIdForTeammateId,
	getRestaurantById,
	getRatings,
	getRatingsForTeammateId,
	getRatingsForRestaurantId,
	getTeammates,
	getTeammateIdsThatLikedRestaurantId,
	getTeammateIdsThatDislikedRestaurantId,
	getTeammateFromSearchText,
	getRestaurants,
	getRestaurantIdsLikedByTeammateId,
	getRestaurantIdsDislikedByTeammateId,
	testTeammatesOpinionOfRestaurant,
	confirmRatingExists} = require('./parser.js');

const {similarityIndex} = require("./similarityIndex.js");



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
	});

	return recommendedRestaurants.slice(0,3);
}


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Who do you want to receive recommendations for? ", function(answer) {
	if (answer == "exit") {
	  	rl.close();
	}
	let results = getTeammateFromSearchText(answer);
	if (results != null) {
	  	console.log("Restaurant recommendations for " + results.name + ":\n" + JSON.stringify(recommend(results.id), null, '   '));
	} else {
	  	console.log("Sorry, I did not recognize that name\n");
	}
	rl.close();
});




module.exports = { recommend }

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