const readline = require('readline');

const {
	getTeammates,
	getTeammateIdsThatLikedRestaurantId,
	getTeammateIdsThatDislikedRestaurantId,
	getTeammateFromSearchText,
} = require('./data/teammates.js');

const {recommend} = require('./recommender.js');


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


var recursiveAsyncReadLine = function () {
  rl.question("Who would you like to receive recommendations for? ", function(answer) {
  	if (answer == 'exit') {
      return rl.close();
  	}

  	let startTime = new Date();
	let results = getTeammateFromSearchText(answer);
	if (results != null) {
		let recommendations = JSON.stringify(recommend(results.id), null, '   ')
		endTime = new Date();
  		var timeDiff = endTime - startTime;
	  	console.log("Restaurant recommendations for " + results.name + ":\n" + recommendations + "\n" + "Completed in: " + timeDiff + "ms");
	} else {
	  	console.log("Sorry, I did not recognize that name\n");
	}
	recursiveAsyncReadLine();
 });
};

recursiveAsyncReadLine(); 


rl.question("Who would you like to receive recommendations for? ", function(answer) {
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
