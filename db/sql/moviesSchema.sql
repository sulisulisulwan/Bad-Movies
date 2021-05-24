-- SET UP SCHEMA HERE
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'favorites'
--
-- ---
DROP DATABASE IF EXISTS badMovies;

CREATE DATABASE badMovies;

USE badMovies;

DROP TABLE IF EXISTS favorites;

CREATE TABLE favorites (
  id INTEGER NOT NULL AUTO_INCREMENT,
  movieData MEDIUMTEXT NULL DEFAULT NULL,
  movieId INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);



-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `favorites` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `favorites` (`id`,`movieData`) VALUES
-- ('','');