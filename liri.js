require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request')
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var divider = "\n--------------------\n"
var action = process.argv[2]
var input = process.argv[3]


switch (action) {
  case 'my-tweets':
    lastTweets();
    break;

    case 'spotify-this-song':
    getSpotify();
    break;

  default:
    break;
}


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

function getSpotify(){
  if (!process.argv[3]){
    input = 'The sign ace of base'
  }
  // spotify parameters required for the search 
  var spotParam = {
    type:'track',
    query: input,
    limit: 2
  };
  // Spotify search method 
  spotify.search(spotParam, function(err,data){
    var spotArray = data.tracks.items
    if (err) throw err;
    // console.log(spotArray[0].artists)
    // console.log(divider)
    console.log("Artist name(s): ");
    // this is looking at the artists array and logging the name 
    spotArray[0].artists.forEach(function(item){
      // log each artist name 
      console.log(item.name);
    });
    console.log("\nSong name: "+ spotArray[0].name
    +"\nPreview URL: " + spotArray[0].preview_url
  +"\nAlbum name: "+ spotArray[0].album.name)
      console.log(divider)
  });
};





