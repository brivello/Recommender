const assert = require('assert');
const expect = require('expect');

const {
    getRatings,
    getRatingsForTeammateId,
    getRatingsForRestaurantId,  
    getUnvisitedRestaurantIdForTeammateId,
    confirmRatingExists
} = require('./../data/ratings.js');

const {
    getRestaurantById,
    getRestaurants,
    getRestaurantIdsLikedByTeammateId,
    getRestaurantIdsDislikedByTeammateId
} = require('./../data/restaurants.js');

const {
    getTeammates,
    getTeammateIdsThatLikedRestaurantId,
    getTeammateIdsThatDislikedRestaurantId,
    getTeammateFromSearchText,
} = require('./../data/teammates.js');

const {similarityIndex} = require('./../similarityIndex.js');

const {recommend} = require('./../recommender.js');


describe('ratings.js', function() {
  describe('getRatings()', function() {
    it('Should return ratings', function() {
    	var rrs = getRatings();
    	expect(rrs.length).toBeGreaterThan(0);
    });
    it('Ratings should contain teammateId, restaurantId and rating', function() {
        var rrs = getRatings();
        expect(rrs.length).toBeGreaterThan(0);
        for (var i = 0; i < rrs.length; i++){
            expect(rrs[i].teammateId.length).toBeGreaterThan(0);
            expect(rrs[i].restaurantId.length).toBeGreaterThan(0);
            expect(rrs[i].rating.length).toBeGreaterThan(0);
        }
    });
  });
   describe('getRatingsForTeammateId()', function() {
     it('Should return ratings for all teammates', function() {
        var teammates = getTeammates();
        for (var j = 0; j < teammates.length; j ++) {
            var ratings = getRatingsForTeammateId(teammates[j]);
            assert(ratings);
        }
    });
    it('Should only return ratings for teammateId entered', function() {
    	var teammates = getTeammates();
        for (var j = 0; j < teammates.length; j ++) {
            var ratings = getRatingsForTeammateId(teammates[j]);
            for (var i = 0; i < ratings.length; i++) {
                let currentId = ratings[0].teammateId
                assert.equal(currentId, teammtes[j].id);
            }
        }
    });
  });
 describe('getRatingsForRestaurantId()', function() {
    it('Should return ratings.', function() {
    	let restaurantId = "aL53puqxtcR1KZrrj4U7Jw";
    	let ratings = getRatingsForRestaurantId(restaurantId);
    	assert(ratings);
    });
     it('All ratings should have teammateId, resaurantId and rating.', function() {
        let restaurantId = "aL53puqxtcR1KZrrj4U7Jw";
        let ratings = getRatingsForRestaurantId(restaurantId);
        for (let rating of ratings) {
            assert(rating.rating);
            assert(rating.teammateId);
            assert(rating.restaurantId);
        }
    });
     it('All ratings returned should be for resterauntId.', function() {
        let restaurantId = "aL53puqxtcR1KZrrj4U7Jw";
        let ratings = getRatingsForRestaurantId(restaurantId);
        for (let rating of ratings) {
            assert(rating.rating);
            assert(rating.teammateId);
            assert.equal(rating.restaurantId, restaurantId);
        }
    });
  });
 describe('getUnvisitedRestaurantIdForTeammateId()', function() {
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
 describe('confirmRatingExists()', function() {
    it('Sould ony return true if rating belongs to ratings', function() {
        let ratings = getRatings();
       for (var i = 0; i < ratings.length; i++) {
            assert(confirmRatingExists(ratings[i].rating, ratings[i].teammateId, ratings[i].restaurantId));
        }
    });
    it('Sould return false if teammateId, restaurantId or rating is incorrect', function() {
        let ratings = getRatings();
       for (var i = 0; i < ratings.length; i++) {
            assert.equal(confirmRatingExists("FAKE_RATING", ratings[i].teamateId, ratings[i].restaurantId), false);
            assert.equal(confirmRatingExists(ratings[i].rating, "teammate_id_that_does_not_exist_1029329132", ratings[i].restaurantId), false);
            assert.equal(confirmRatingExists(ratings[i].rating, ratings[i].teamateId, "restaurant_id_that_does_not_exist_1029329132"), false);
        }
    });
  });
});

describe('teammates.js', function() {
 describe('getTeammates', function() {
    it('Should return teammates', function() {
    	var teammates = getTeammates();
    	expect(teammates.length).toBeGreaterThan(0);
    });
    it('Teammates should have both a name and id', function() {
        var teammates = getTeammates();
        expect(teammates.length).toBeGreaterThan(0);
        for (var i = 0; i < teammates.length; i++){
            expect(teammates[i].name.length).toBeGreaterThan(0);
            expect(teammates[i].id.length).toBeGreaterThan(0);
        }
    });
  });
    describe('getTeammateIdsThatLikedRestaurantId', function() {
    it('Should return only teammateIds that gave LIKE ratings for restaurantIDs', function() {
        var restaurantIds = getRestaurants().map( x => x.id );
        for (var i = 0; i < restaurantIds.length ; i++){
        	var teammateIds = getTeammateIdsThatLikedRestaurantId(restaurantIds[i]);
        	expect(teammateIds.size).toBeGreaterThan(0);
        	for (let _tid of teammateIds) {
                assert(confirmRatingExists("LIKE", _tid, restaurantIds[i]));
        	}
        }
    });
  });
    describe('getTeammateIdsThatDisikedRestaurantId', function() {
    it('Should return only teammateIds that gave DISLIKE ratings for restaurantIDs', function() {
    	var restaurantIds = getRestaurants().map( x => x.id );
        let totalAssertions = 0;
        for (var i = 0; i < restaurantIds.length ; i++){
            var teammateIds = getTeammateIdsThatDislikedRestaurantId(restaurantIds[i]);
            for (let _tid of teammateIds) {
                totalAssertions ++;
                assert(confirmRatingExists("DISLIKE", _tid, restaurantIds[i]));
            }
        }
        expect(totalAssertions).toBeGreaterThan(0);
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
    it('Returned teammates should have name and id', function() {
        let teammates = getTeammates();
        for (var i = 0; i < teammates.length; i++){
            let results = getTeammateFromSearchText(teammates[i].name.slice(0, teammates[i].name.length / 2));
            expect(results.name.length).toBeGreaterThan(0);
            expect(results.id.length).toBeGreaterThan(0);
        }
    });
  });
});


describe('restaurants.js', function() {
    describe('getRestaurants', function() {
    it('Should return restaurants', function() {
    	var rrs = getRestaurants();
    	expect(rrs.length).toBeGreaterThan(0);
    });
    it('Restaurants should have name, id, image_url, categories and rating', function() {
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
    it('Should return restaurantIds', function() {
    	var teammateIds = getTeammates().map( x => x.id );
        let rIds = 0;
        for (var i = 0; i < teammateIds.length ; i++){
        	rIds += getRestaurantIdsLikedByTeammateId(teammateIds[i]).size;
        }
        expect(rIds).toBeGreaterThan(0);
    });
     it('Should have LIKE rating for all restaurantIds returned', function() {
        var teammateIds = getTeammates().map( x => x.id );
        for (var i = 0; i < teammateIds.length ; i++){
            var restaurantIds = getRestaurantIdsLikedByTeammateId(teammateIds[i]);
            for (let _rid of restaurantIds) {
                assert.equal(confirmRatingExists("LIKE", teammateIds[i], _rid), true);
            }
        }
    });
  });
    describe('getRestaurantIdsDislikedByTeammateId', function() {
    it('Should return restaurantIds', function() {
        var teammateIds = getTeammates().map( x => x.id );
        let rIds = 0;
        for (var i = 0; i < teammateIds.length ; i++){
            rIds += getRestaurantIdsDislikedByTeammateId(teammateIds[i]).size;
        }
        expect(rIds).toBeGreaterThan(0);
    });
     it('Should have DISLIKE rating for all restaurantIds returned', function() {
        var teammateIds = getTeammates().map( x => x.id );
        for (var i = 0; i < teammateIds.length ; i++){
            var restaurantIds = getRestaurantIdsDislikedByTeammateId(teammateIds[i]);
            for (let _rid of restaurantIds) {
                assert.equal(confirmRatingExists("DISLIKE", teammateIds[i], _rid), true);
            }
        }
    });
  });
});



describe('similarityIndex.js', function() {
	describe('similarityIndex()', function() {
    it('Should retun range of: -1.0 <= value <= 1.0.', function() {
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
    it('Should return 1.0 when the same teammateId is used for both arguments.', function() {
        const teammates = getTeammates();
        expect(teammates.length).toBeGreaterThan(0);
        for (var i = 0; i < teammates.length; i++) {
            for (var j = 0; j < teammates.length; j++) {
                if (i == j) {
                    let simIndex = similarityIndex(teammates[i].id, teammates[j].id);
                    assert.equal(simIndex, 1.0);
                }
            }
        }
    });
  });
});


describe('recommender.js', function() {
    describe('recommend()', function() {
    it('Should return top recommended resteraunts sorted by rating(highest first)', function() {
        const teammates = getTeammates();
        expect(teammates.length).toBeGreaterThan(0);
        for (var i = 0; i < teammates.length; i++) {
            recommendedRestaurants = recommend(teammates[i].id);
            assert.equal(recommendedRestaurants.length, 3);
            expect(recommendedRestaurants[0].rating).not.toBeLessThan(recommendedRestaurants[1].rating);
            expect(recommendedRestaurants[1].rating).not.toBeLessThan(recommendedRestaurants[2].rating);
        }
    });
  });
});



