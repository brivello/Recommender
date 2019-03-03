var assert = require('assert');
var expect = require('expect');

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
	confirmRatingExists } = require('./../parser.js');

const {similarityIndex} = require('./../similarityIndex.js');


describe('parser.js', function() {

  describe('getRatings', function() {
    it('Should return valid ratings', function() {
    	var rrs = getRatings();
    	var rating = rrs[0].rating
    	assert.equal(rating, "DISLIKE");
    });
  });

   describe('getRatingsForTeammateId', function() {
    it('Should return only ratings for teammateId', function() {
    	var teammateId = "e17b91cb-5a2c-4055-befb-1d1ea9f7daca";
    	var ratings = getRatingsForTeammateId(teammateId);
    	for (var i = 0; i < ratings.length; i++) {
    		let currentId = ratings[0].teammateId
    		assert.equal(currentId, teammateId);
    	}
    });
  });

    describe('getTeammateIdsThatLikedRestaurantId', function() {
    it('Should return only teammateIds that gave LIKE ratings for restaurantID', function() {
    	var restaurantId = "aL53puqxtcR1KZrrj4U7Jw";
    	var teammateIds = getTeammateIdsThatLikedRestaurantId(restaurantId);
    	expect(teammateIds.size).toBeGreaterThan(0);
    	for (let _tid of teammateIds) {
    		assert.equal(testTeammatesOpinionOfRestaurant(_tid, restaurantId, "LIKE"), true);
    	}
    });
  });

    describe('getTeammateIdsThatDisikedRestaurantId', function() {
    it('Should return only teammateIds that gave DISLIKE ratings for restaurantID', function() {
    	var restaurantId = "aL53puqxtcR1KZrrj4U7Jw";
    	var teammateIds = getTeammateIdsThatDislikedRestaurantId(restaurantId);
    	expect(teammateIds.size).toBeGreaterThan(0);
    	for (let _tid of teammateIds) {
    		assert.equal(testTeammatesOpinionOfRestaurant(_tid, restaurantId, "DISLIKE"), true);
    	}
    });
  });


     describe('getRatingsForRestaurantId', function() {
    it('Should return > 0 ratings. Ratings should have teammateId, resaurantId and rating.', function() {
    	let restaurantId = "aL53puqxtcR1KZrrj4U7Jw";
    	let ratings = getRatingsForRestaurantId(restaurantId);
    	assert(ratings);
    	for (let rating of ratings) {
    		assert(rating.rating);
    		assert(rating.teammateId);
    		assert(rating.restaurantId);
    	}
    });
  });

     describe('getRestaurantIdsLikedByTeammateId', function() {
    it('Should return > 0 restaurantIds and teammate should have LIKE rating for all restaurantIds returned', function() {
    	var teammateId = "e17b91cb-5a2c-4055-befb-1d1ea9f7daca";
    	var restaurantIds = getRestaurantIdsLikedByTeammateId(teammateId);
    	expect(restaurantIds.size).toBeGreaterThan(0);
    	for (let _rid of restaurantIds) {
    		assert.equal(confirmRatingExists("LIKE", teammateId, _rid), true);
    	}
    });
  });

    describe('getRestaurantIdsDislikedByTeammateId', function() {
    it('Should return > 0 restaurantIds and teammate should have DISLIKE rating for all restaurantIds returned', function() {
    	var teammateId = "e17b91cb-5a2c-4055-befb-1d1ea9f7daca";
    	var restaurantIds = getRestaurantIdsDislikedByTeammateId(teammateId);
    	expect(restaurantIds.size).toBeGreaterThan(0);
    	for (let _rid of restaurantIds) {
    		assert.equal(confirmRatingExists("DISLIKE", teammateId, _rid), true);
    	}
    });
  });

     describe('getUnvisitedRestaurantIdForTeammateId', function() {
    it('Should return all resetaurants that have not been visited by the teammate', function() {
    	let teammateId = "e17b91cb-5a2c-4055-befb-1d1ea9f7daca";
    	let restaurantIds = getUnvisitedRestaurantIdForTeammateId(teammateId);
    	expect(restaurantIds.size).toBeGreaterThan(0);
    	for (let _rid of restaurantIds) {
    		assert.equal(confirmRatingExists("DISLIKE", teammateId, _rid), false);
    		assert.equal(confirmRatingExists("LIKE", teammateId, _rid), false);
    	}
    });
  });

});



describe('similarityIndex.js', function() {

	describe('similarityIndex()', function() {
    it('Should retun range of: -1.0 <= value <= 1.0. Should return 1.0 when the same teammateId is used for both arguments.', function() {
    	const teammates = getTeammates();
    	expect(teammates.length).toBeGreaterThan(0);
    	for (var i = 0; i < teammates.length; i++) {
    		for (var j = 0; j < teammates.length; j++) {
    			let si = similarityIndex(teammates[i].id, teammates[j].id);
    			expect(si).not.toBeLessThan(-1.0)
    			expect(si).not.toBeGreaterThan(1.0);
    			if (i == j) {
    				assert.equal(si, 1.0);
    			}
    		}
    	}
    });
  });
});






