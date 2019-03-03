var assert = require('assert');
var expect = require('expect');

const {	getRatings,
	getRatingsForTeammateId,
	getRatingsForRestaurantId,
	getTeammates,
	getTeammateIdsThatLikedRestaurantId,
	getTeammateIdsThatDislikedRestaurantId,
	getRestaurants,
	getRestarauntIdsLikedByTeammateId,
	getRestaurantIdsDislikedByTeammateId,
	testTeammatesOpinionOfRestaurant } = require('./../parser.js');


describe('parser.js', function() {

  describe('getRatings', function() {
    it('should return valid ratings', function() {
    	var rrs = getRatings();
    	var rating = rrs[0].rating
    	assert.equal(rating, "DISLIKE");
    });
  });

   describe('getRatingsForTeammateId', function() {
    it('should return only ratings for teammateId', function() {
    	var teammateId = "e17b91cb-5a2c-4055-befb-1d1ea9f7daca";
    	var ratings = getRatingsForTeammateId(teammateId);
    	for (var i = 0; i < ratings.length; i++) {
    		let currentId = ratings[0].teammateId
    		assert.equal(currentId, teammateId);
    	}
    });
  });

    describe('getTeammateIdsThatLikedRestaurantId', function() {
    it('should return only teammateIds that gave LIKE ratings for resterauntID', function() {
    	var resterauntId = "aL53puqxtcR1KZrrj4U7Jw";
    	var teammateIds = getTeammateIdsThatLikedRestaurantId(resterauntId);
    	expect(teammateIds.size).toBeGreaterThan(0);
    	for (let _tid of teammateIds) {
    		assert.equal(testTeammatesOpinionOfRestaurant(_tid, resterauntId, "LIKE"), true);
    	}
    });
  });

    describe('getTeammateIdsThatDisikedRestaurantId', function() {
    it('should return only teammateIds that gave DISLIKE ratings for resterauntID', function() {
    	var resterauntId = "aL53puqxtcR1KZrrj4U7Jw";
    	var teammateIds = getTeammateIdsThatDislikedRestaurantId(resterauntId);
    	expect(teammateIds.size).toBeGreaterThan(0);
    	for (let _tid of teammateIds) {
    		assert.equal(testTeammatesOpinionOfRestaurant(_tid, resterauntId, "DISLIKE"), true);
    	}
    });
  });

});

