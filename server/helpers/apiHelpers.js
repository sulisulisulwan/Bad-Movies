const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');
const moviedb = 'https://api.themoviedb.org/3';
const apiKey = `api_key=${API_KEY}&language=en-US`;
// write out logic/functions required to query TheMovieDB.org
module.exports.getGenreList = () => {
  return axios.get(`${moviedb}/genre/movie/list?${apiKey}`)
    .then((genres) => {
      console.log('SUCCESS with obtaining genre list')
      return genres;
    })
    .catch(() => {
      console.error('ERROR with GET request to themoviedb.org at /list endpoint')
    })
};

module.exports.getMoviesByGenre = (genreID) => {
  return axios.get(`${moviedb}/discover/movie?${apiKey}&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&with_genres=${genreID}&with_watch_monetization_types=flatrate`)
    .then((movies) => {
      console.log('SUCCESS with obtaining movies by genre')
      return movies;
    })
    .catch(() => {
      console.error('ERROR with GET request to themoviedb.org at /discover/movie endpoint')
    })
}

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file