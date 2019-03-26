-- phpMyAdmin SQL Dump
-- version 3.2.0
-- http://www.phpmyadmin.net
--
-- Host: mysql.cs.virginia.edu:3306
-- Generation Time: Mar 25, 2019 at 04:51 PM
-- Server version: 5.5.60
-- PHP Version: 5.4.16

CREATE DATABASE IF NOT EXISTS spot_a_song_dev0;

USE spot_a_song_dev0;

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cc5ny_6750`
--

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE IF NOT EXISTS `artists` (
  `artist_id` int(11) NOT NULL AUTO_INCREMENT,
  `year_formed` int(11) DEFAULT NULL,
  `primary_genre` varchar(50) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `artist_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`artist_id`),
  KEY `primary_genre` (`primary_genre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`artist_id`, `year_formed`, `primary_genre`, `description`, `artist_name`) VALUES
(1, 1966, 'rock', 'british guys', 'cream'),
(2, 1970, 'blues', 'has a movie about him', 'bill withers'),
(3, 2004, 'pop', '', 'taylor swift'),
(4, 1998, 'electric', 'the 5 is silent', 'deadmau5'),
(5, 1995, NULL, 'i know nothing about this guy', 'kaskade');

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE IF NOT EXISTS `genres` (
  `genre` varchar(50) NOT NULL,
  PRIMARY KEY (`genre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`genre`) VALUES
('blues'),
('country'),
('electric'),
('hip-hop'),
('pop'),
('rap'),
('rock');

-- --------------------------------------------------------

--
-- Table structure for table `made_by`
--

CREATE TABLE IF NOT EXISTS `made_by` (
  `song_id` int(11) NOT NULL DEFAULT '0',
  `artist_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`song_id`,`artist_id`),
  KEY `artist_id` (`artist_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `made_by`
--

INSERT INTO `made_by` (`song_id`, `artist_id`) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 2),
(5, 4),
(6, 4),
(6, 5);

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE IF NOT EXISTS `playlists` (
  `playlist_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `playlist_name` varchar(50) NOT NULL,
  PRIMARY KEY (`playlist_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`playlist_id`, `user_id`, `playlist_name`) VALUES
(1, 2, 'good country songs'),
(2, 1, 'good tunes'),
(3, 3, 'techno stuff'),
(4, 1, 'random');

-- --------------------------------------------------------

--
-- Table structure for table `playlist_songs`
--

CREATE TABLE IF NOT EXISTS `playlist_songs` (
  `playlist_id` int(11) NOT NULL DEFAULT '0',
  `song_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`playlist_id`,`song_id`),
  KEY `song_id` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `playlist_songs`
--

INSERT INTO `playlist_songs` (`playlist_id`, `song_id`) VALUES
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 5),
(3, 6),
(4, 1),
(4, 2),
(4, 3),
(4, 6);

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE IF NOT EXISTS `songs` (
  `song_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `genre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`song_id`),
  KEY `genre` (`genre`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`song_id`, `title`, `year`, `length`, `genre`) VALUES
(1, 'sunshine of your love', 1967, 248, 'rock'),
(2, 'white room', 1968, 298, 'rock'),
(3, 'ain''t no sunhine', 1971, 123, 'blues'),
(4, 'lean on me', 1972, 257, 'blues'),
(5, 'ghosts ''n'' stuff', 2008, 370, 'electric'),
(6, 'i remember', 2008, 593, 'electric');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`) VALUES
(1, 'ya boi', 'ummm'),
(2, 'aron harder', 'ilovecountrymusic'),
(3, 'alex', 'password123'),
(4, 'ayden', 'eea17084468c1b3f6b73f85e9a7ffc2b0583c95cf980bba9a4');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `artists`
--
ALTER TABLE `artists`
  ADD CONSTRAINT `artists_ibfk_1` FOREIGN KEY (`primary_genre`) REFERENCES `genres` (`genre`);

--
-- Constraints for table `made_by`
--
ALTER TABLE `made_by`
  ADD CONSTRAINT `made_by_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`),
  ADD CONSTRAINT `made_by_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`);

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `playlist_songs`
--
ALTER TABLE `playlist_songs`
  ADD CONSTRAINT `playlist_songs_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`),
  ADD CONSTRAINT `playlist_songs_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `songs` (`song_id`);

--
-- Constraints for table `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`genre`) REFERENCES `genres` (`genre`);
