
const sqldb = require('../../db/sql/index.js');

module.exports = {
  getAllFavoriteMovies: () => {
    return new Promise((resolve, reject) => {
      var queryString = `SELECT movieData FROM favorites;`
      return sqldb.query(queryString, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  },


  addFavoriteMovie: (movieData) => {
    return new Promise((resolve, reject) => {
      movieId = movieData.id;
      movieData = [JSON.stringify(movieData)];
      console.log('movieId is', movieId)
      var values = [movieData, movieId]
      var queryString = `INSERT INTO favorites (movieData, movieId) VALUES (?, ?);`
      return sqldb.query(queryString, values, err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  },


  //DELETE A FAVORITE MOVIE FROM FAVORITES TABLE
  deleteFavoriteMovie: (movieId) => {
    return new Promise((resolve, reject) => {
      var queryString = `DELETE FROM favorites WHERE (movieId=${movieId});`;
      return sqldb.query(queryString, movieId, err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      })
    })
  }
};
