CREATE DATABASE IF NOT EXISTS dev0;

USE dev0;

DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS artists;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS made_by;
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS playlist_songs;

CREATE TABLE songs(
  song_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(64) NOT NULL,
  year INT DEFAULT NULL,
  length INT DEFAULT NULL,
  genre VARCHAR(64) DEFAULT NULL,
  PRIMARY KEY(song_id)
);

CREATE TABLE artists(
  artist_id INT NOT NULL AUTO_INCREMENT,
  year_formed INT DEFAULT NULL,
  primary_genre VARCHAR(64) DEFAULT NULL,
  description VARCHAR(256) DEFAULT NULL,
  PRIMARY KEY(artist_id)
);

CREATE TABLE users(
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(64) NOT NULL,
  user_email VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL,
  PRIMARY KEY(user_id)
);

CREATE TABLE made_by(
  song_id INT NOT NULL,
  artist_id INT NOT NULL,
  PRIMARY KEY(song_id, artist_id),
  FOREIGN KEY(song_id) REFERENCES songs(song_id),
  FOREIGN KEY(artist_id) REFERENCES artists(artist_id)
);

CREATE TABLE playlists(
  playlist_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  playlist_name VARCHAR(64) NOT NULL,
  PRIMARY KEY(playlist_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE playlist_songs(
  song_id INT NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY(song_id, user_id),
  FOREIGN KEY(song_id) REFERENCES songs(song_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

INSERT INTO users(user_name, user_email, password) VALUES ('alex', 'null@null.com', 'password');
