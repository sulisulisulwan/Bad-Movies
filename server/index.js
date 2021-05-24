const config = require("../config.js")
const movieModel = require("./models/movieModel.js")
const morgan = require("morgan")
var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();

//Helpers
var apiHelpers = require("./helpers/apiHelpers.js");
//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + "/../client/dist"));

// app.all("/*", (req, res, next) => {

//   res.sendStatus(200);
// });




app.get("/genres", function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-Width');
  return apiHelpers.getGenreList()
  .then((result) => {
    return res.status(200).json(result.data.genres);
  })
  .catch(() => {
    console.error('ERROR pre render of . rendering error response')
    return res.status(500).json('Oops!  Something went wrong and we\'ll fix it soon!  Send error report to smtviolin@gmail.com')
  })
})

//MOVIE DATABASE API REQUESTS

app.get("/search", function(req, res) {
  var genreID = 16
  //searches genre id specified by client.  handler will send a genre id
  return apiHelpers.getMoviesByGenre(genreID)
  .then((moviesList) => {
    //render all moviesList.results to page
    console.log('Successfully gotten results from themoviedb.org at discover/movie endpoint.')
    return res.status(200).json(moviesList.data.results);
  })
  .catch(() => {
    //render an error to the page
    console.error('ERROR pre render of "movies by genre".  Rendering error response')
    return res.status(500).json('Oops!  These should be a list of movies!  Send error report to smtviolin@gmail.com')
  })
});

  // save movie as favorite into the database
  app.post("/save", function(req, res) {
    var movieData = 'placeHolder'
    //updates a column of that movie that is favorite
    return movieModel.addFavoriteMovie(movieData)
    .then((response) => {
      console.log('Favorite saved to database SUCCESSFULLY')
      return res.status(203).json(response);
    })
    .catch(() => {
      console.error('ERROR with POST request to database for adding a favorite')
      return res.status(500).json('Oops!  Something went wrong with saving your new favorite movie!  Send error report to smtviolin@gmail.com')
    })
  });

  //remove movie from favorites into the database
  app.post("/delete", function(req, res) {
    var unfavoritedMovieId = 'some number'

    return movieModel.deleteFavoriteMovie(unfavoritedMovieId)
    .then((response) => {
    //render the favorite list without the deleted movie
    console.log('Favorite deleted from database SUCCESSFULLY')
    return res.status(203).json(response);
  })
  .catch(() => {
    console.error('ERROR with POST request to database for adding a favorite')
    return res.status(500).json('Oops!  Something went wrong with deleting your ex-favorite movie!  Send error report to smtviolin@gmail.com')
  })
});


app.get("/favorites", function (req, res) {
  return movieModel.getAllFavorites()
    .then((listOfFavorites) => {
      console.log('Here are all of your favorites!')
      console.log(listOfFavorites)
      res.status(200).json(listOfFavorites);
    })
    .catch(() => {
      console.error('ERROR pre render of all favorites.  Render error response')
      return res.status(500).json('Oops!  These should be your favorites!  Send error report to smtviolin@gmail.com')
    })
  })


app.listen(3000, function() {
  console.log("listening on port 3000!");
});

