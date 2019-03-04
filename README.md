# Recommender
Recommender provides restaurant recommendations based on a variant of collaborative filtering using a Jaccard similarity index. 

## Getting Started
Download node.js if you do not already have it installed and clone the git repo:
```
git clone https://github.com/brivello/Recommender

```
Node.js should manage project dependencies on its own. If you find you are missing a module try the following:
```
npm install packageName

```
The following non built-in npm modules are required to run the project:

```
readline

```
The following non built-in npm modules are required to test the project:
```
mocha
nyc
expect

```

## How to Use

To recieve a restaurant recommendation: nagivate to the project directory, enter the following command and then enter your (whole or partial) name.
```
npm start

```
To run the tests for this project: navigate to the project directory and enter the following command.
```
npm test

```

## Project Structure
### data
- contains `ratings.js`, `restaurants.js` and `teammates.js`
- each file contains the necessary functions to load and parse json files and export that data to the rest of the program.
- hashMaps/dictionaries are used to store subsets of data to increase performance for subsequent function calls.

### seed/out
- contains files with JSON data used to make recommendations (`ratings.json`, `restaurants.json` and `teammates.json` )

### index.js
- uses npm module `readline` to get text input from user via the terminal/cmd
- uses `recommender.js` to output recommendations to the terminal

### test/test.js
- unit tests for `similarityIndex.js`, `recommender.js`, `ratings.js`, `restaurants.js` and `teammates.js`

### recommender.js
- uses functions from the data folder and `similarityIndex.js` to calculate a recommendation score for each resteraunt

### similarityIndex.js
- uses functions from the data folder to calculate the similarity index for two teammates
- a hashMap/dictionary is used to store calculated similarity indexes to increase performance for subsequent function calls.

## Next Steps
The next step for this project would be a website or mobile app to take teammate selections from the user and display the recommended restaurant data.
