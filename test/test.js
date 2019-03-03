const assert = require('assert');
const expect = require('expect');

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
	confirmRatingExists } = require('./../parser.js');

const {similarityIndex} = require('./../similarityIndex.js');

const {recommend} = require('./../recommender.js');


describe('parser.js', function() {

  describe('getRatings', function() {
    it('Should return valid ratings', function() {
    	var rrs = getRatings();
    	expect(rrs.length).toBeGreaterThan(0);
    	for (var i = 0; i < rrs.length; i++){
    		expect(rrs[i].teammateId.length).toBeGreaterThan(0);
    		expect(rrs[i].restaurantId.length).toBeGreaterThan(0);
    		expect(rrs[i].rating.length).toBeGreaterThan(0);
    	}
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

 describe('getTeammates', function() {
    it('Should return valid teammates', function() {
    	var teammates = getTeammates();
    	expect(teammates.length).toBeGreaterThan(0);
    	for (var i = 0; i < teammates.length; i++){
    		expect(teammates[i].name.length).toBeGreaterThan(0);
    		expect(teammates[i].id.length).toBeGreaterThan(0);
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

    describe('getTeammateFromSearchText', function() {
    it('Should return a teammate from partial name search', function() {
        let teammates = getTeammates();
        for (var i = 0; i < teammates.length; i++){
            let results = getTeammateFromSearchText(teammates[i].name.slice(0, teammates[i].name.length / 2));
            assert.equal(results.name, teammates[i].name);
        }
    });
  });

    describe('getRestaurants', function() {
    it('Should return valid restaurants', function() {
    	var rrs = getRestaurants();
    	expect(rrs.length).toBeGreaterThan(0);
    	for (var i = 0; i < rrs.length; i++){
    		expect(rrs[i].name.length).toBeGreaterThan(0);
    		expect(rrs[i].id.length).toBeGreaterThan(0);
    		expect(rrs[i].image_url.length).toBeGreaterThan(0);
    		expect(rrs[i].categories.length).toBeGreaterThan(0);
    		expect(rrs[i].rating).toBeGreaterThan(-10);
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
    			let simIndex = similarityIndex(teammates[i].id, teammates[j].id);
    			expect(simIndex).not.toBeLessThan(-1.0)
    			expect(simIndex).not.toBeGreaterThan(1.0);
    			if (i == j) {
    				assert.equal(simIndex, 1.0);
    			}
    		}
    	}
    });
  });
});


describe('recommender.js', function() {

    describe('recommend()', function() {
    it('Should return the three highest recommended restaurants for teammateId', function() {
        const teammates = getTeammates();
        expect(teammates.length).toBeGreaterThan(0);
        for (var i = 0; i < teammates.length; i++) {
            recommendedRestaurants = recommend(teammates[i].id);
            assert.equal(recommendedRestaurants.length, 3);
            expect(recommendedRestaurants[0].recommendation).toBeGreaterThan(recommendedRestaurants[1].recommendation);
            expect(recommendedRestaurants[1].recommendation).toBeGreaterThan(recommendedRestaurants[2].recommendation);
        }
    });
  });
});



