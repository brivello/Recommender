
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


similarityIndexDict = {};
const similarityIndex = (tId_1, tId_2) => {
	let hashedIds = hashTeammateIds(tId_1, tId_2);
	let similarityIndex = similarityIndexDict[hashedIds]
	if (similarityIndex == null) {
		similarityIndex = calculateSimilarityIndex(tId_1, tId_2)
	}
	return similarityIndex;	
};

function calculateSimilarityIndex(tId_1, tId_2) {

	t1_likes              = getRestaurantIdsLikedByTeammateId(tId_1);
	t1_dislikes           = getRestaurantIdsDislikedByTeammateId(tId_1);
	t2_likes              = getRestaurantIdsLikedByTeammateId(tId_2);
	t2_dislikes           = getRestaurantIdsDislikedByTeammateId(tId_2);

	let combinedLikes     = new Set ([...t1_likes].filter(x => t2_likes.has(x)));
	let combinedDislikes  = new Set ([...t2_dislikes].filter(x => t2_dislikes.has(x)));
	let asymetrySet1      = new Set ([...t1_likes].filter(x => t2_dislikes.has(x)));
	let asymetrySet2      = new Set ([...t1_dislikes].filter(x => t2_likes.has(x)));

	let unionOfAllRatings = new Set([...t1_likes, ...t1_dislikes, ...t2_likes, ...t2_dislikes]);

	return (combinedLikes.size + combinedDislikes.size - asymetrySet1.size - asymetrySet2.size) / unionOfAllRatings.size;
}

function hashTeammateIds(tId_1, tId_2) {
	var a = tId_1.split("").filter(Boolean);
	var b = tId_2.split("");
	var hashedIds = '';
	for (var i = 0; i < a.length || i < b.length; i++) {  //loop condition checks if i is less than a.length or b.length
   		if (i < a.length)  //if i is less than a.length add a[i] to string first.
     		hashedIds +=  a[i];
   		if (i < b.length)  //if i is less than b.length add b[i] to string.
           	hashedIds +=  b[i];
 	 }
	return hashedIds;
}


module.exports = { similarityIndex };


