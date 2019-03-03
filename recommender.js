const {	getRatings,
		getRatingsForTeammateId,
		getRatingsForRestaurantId,
		getTeammates,
		getRestaurants,
		getRestaurantsFromIds} = require('./parser.js');

const {similarityIndex} = require("./similarityIndex.js");

//var fs = require("fs");
//var ratingsJSON = JSON.parse(ratings);
//var restaurants = fs.readFileSync("./seed/out/restaurants.json");
//var teammates = fs.readFileSync("./seed/out/teammates.json");
//var ratingsContent = JSON.parse(ratings)



//var ratings = parser.getRatings;

const http = require('http');

console.log(getRatingsForTeammateId("e17b91cb-5a2c-4055-befb-1d1ea9f7daca"));
console.log(getRatingsForTeammateId("e17b91cb-5a2c-4055-befb-1d1ea9f7daca"));


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