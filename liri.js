require("dotenv").config();
var fs = require('fs')
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request')
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var divider = "\n--------------------\n"
var action = process.argv[2]
var input = process.argv[3]

// This allows you to swtich case base on the command line arguments 
switch (action) {
  // for each case we are passing thrugh a command line argument 
  // each case will be activated if the string is entered 
  case 'my-tweets':
    lastTweets();
    break;

  case 'spotify-this-song':
    getSpotify(process.argv[3]);
    break;
  
  case 'do-what-it-says':
   whatItSays();
   break;

  default:
    break;
};



function lastTweets() {
  // twitter parameters required for the search 
  var params = {
    screen_name: 'indieleak',
    count: 20
  };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (error) throw error;
    for (let i = 0; i < tweets.length; i++) {
      console.log("tweet: " + tweets[i].text
        + "\nCreated Date: " + tweets[i].created_at
        + divider);
    };

  });
};

function getSpotify(param) {
  if(!param){
    param = 'The sign ace of base'
  }
  // if (process.argv[3]) {
  //   input = process.argv[3]
  // }
  // else{
  //   input = 'The sign ace of base'
  // }
  // spotify parameters required for the search 
  var spotParam = {
    type: 'track',
    query: param,
    limit: 2
  };
  // Spotify search method 
  spotify.search(spotParam, function (err, data) {
    var spotArray = data.tracks.items
    if (err) throw err;
   
   
    console.log("Artist name(s): ");
    // this is looking at the artists array and logging the name 
    spotArray[0].artists.forEach(function (item) {
      // log each artist name 
      console.log(item.name);
    });
    console.log("\nSong name: " + spotArray[0].name
      + "\nPreview URL: " + spotArray[0].preview_url
      + "\nAlbum name: " + spotArray[0].album.name)
    console.log(divider)
  });
};

function whatItSays() {
  // Read file
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      throw error
    }
    else {
      var dataArray = data.split(",")
      // console.log(dataArray[1])
    };
    // input = dataArray[1];
    getSpotify(dataArray[1]);
  });
};


// if (!process.argv[3]){
//   input = 'Mr. Nobody'
// };
// var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

// request(queryUrl, function(error, response, body) {

//   if (!error && response.statusCode === 200) {

//     console.log("Release Year: " + JSON.parse(body).Year);
//   }
// });



//  * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.




// Write file 
// fs.appendFile("log.txt", value + divider, function (err) {
//   if (err) {
//     throw err
//   }
//   else {
//     console.log(value)
//   }
// });

