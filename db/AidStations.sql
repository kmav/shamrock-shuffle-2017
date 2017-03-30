-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2015 at 05:48 AM
-- Server version: 5.5.43-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `c9`
--

-- --------------------------------------------------------

--
-- Table structure for table `AidStations`
--

DROP TABLE IF EXISTS `AidStations`;
CREATE TABLE IF NOT EXISTS `AidStations` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `timeUpdate` time DEFAULT NULL,
  `StationType` varchar(30) NOT NULL,
  `Location` varchar(30) NOT NULL,
  `Comments` varchar(30) NOT NULL,
  `CurrentPatients` int(11) DEFAULT NULL,
  `CumulativePatients` int(11) DEFAULT NULL,
  `Beds` int(11) DEFAULT NULL,
  `Latitude` double DEFAULT NULL,
  `Longitude` double DEFAULT NULL,
  `Km` float DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  `Display` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `AidStations`
--

INSERT INTO `AidStations` (`id`, `timeUpdate`, `StationType`, `Location`, `Comments`, `CurrentPatients`, `CumulativePatients`, `Beds`, `Latitude`, `Longitude`, `Km`, `Status`, `Display`) VALUES
(1, '16:48:27', 'AS', '1', 'Closed', 0, 0, 3, 41.88392463, -87.62736229, 2.6, 0, 0),
(2, '16:48:58', 'AS', '2', 'Closed', 0, 0, 3, 41.8932313, -87.6317235, 5.2, 0, 0),
(3, '16:48:58', 'AS', '3', 'Closed', 0, 0, 3, 41.91638896, -87.63345826, 8.1, 0, 0),
(4, '16:48:58', 'AS', '4', 'Closed', 0, 0, 3, 41.92549468, -87.6328202, 9.3, 0, 0),
(5, '16:48:58', 'AS', '5', 'Closed', 0, 0, 6, 41.9415331, -87.6438161, 12, 0, 0),
(6, '16:48:58', 'AS', '6', 'Closed', 0, 0, 6, 41.92341099, -87.63925679, 15, 0, 0),
(7, '16:48:58', 'AS', '7', 'Closed', 0, 0, 6, 41.9071829, -87.63503277, 17, 0, 0),
(8, '16:48:58', 'AS', '8', 'Closed', 0, 0, 8, 41.89105978, -87.63355612, 19, 0, 0),
(9, '16:48:58', 'AS', '9', 'Closed', 0, 0, 8, 41.88313834, -87.63488341, 20, 0, 0),
(10, '16:48:58', 'AS', '10', 'Closed', 0, 0, 8, 41.87892449, -87.65615961, 22.4, 0, 0),
(11, '16:48:58', 'AS', '11', 'Closed', 0, 0, 8, 41.87601012, -87.67129521, 24.6, 0, 0),
(12, '16:48:59', 'AS', '12', 'Closed', 0, 0, 8, 41.87740682, -87.65003619, 26.3, 0, 0),
(13, '16:48:59', 'AS', '13', 'Closed', 0, 0, 8, 41.86935366, -87.65625342, 28.5, 0, 0),
(14, '16:48:59', 'AS', '14', 'Closed', 0, 0, 8, 41.85749757, -87.66019039, 30.9, 0, 0),
(15, '16:48:59', 'AS', '15', 'Closed', 0, 0, 8, 41.85438786, -87.64589533, 32.4, 0, 0),
(16, '16:48:59', 'AS', '16', 'Closed', 0, 0, 8, 41.84853382, -87.64127413, 33.6, 0, 0),
(17, '16:48:59', 'AS', '17', 'Open', 0, 0, 8, 41.84051311, -87.63088368, 35.9, 0, 0),
(18, '16:48:59', 'AS', '18', 'Open', 0, 0, 8, 41.83239237, -87.62256841, 37.8, 0, 0),
(19, '16:48:59', 'AS', '19', 'Open', 0, 0, 8, 41.84313136, -87.62289211, 38.8, 0, 0),
(20, '16:48:59', 'AS', '20', 'Open', 0, 0, 8, 41.85792682, -87.62266411, 40.6, 0, 0),
(21, '16:59:41', 'MT', 'Balbo', 'Closed', 3, 0, 74, 41.8737124, -87.6189846, 42.2, 0, 0),
(22, '17:01:31', 'MT', 'Indiana', 'Closed', 2, 0, 8, 41.867569, -87.622468, 42, 0, 0),
(23, '17:01:31', 'MT', 'Laflin', 'Closed', 1, 0, 11, 41.8760059, -87.6652664, 25.25, 0, 0),
(24, '17:01:31', 'MT', 'Podiatry', 'Closed', 7, 0, 40, 0, 0, 42.2, 0, 0),
(25, '17:01:31', 'MT', 'Jackson', 'Closed', 5, 0, 47, 41.878326, -87.6207, 25.25, 0, 0),
(26, '00:00:00', 'MT', 'ICUBalbo', 'Closed', 2, 0, 21, 0, 0, 42.2, 0, 0),
(27, '00:00:00', 'MT', 'UCBalbo', 'Closed', 1, 0, 24, 0, 0, 42.2, 0, 0),
(28, '17:01:31', 'MT', 'Ambulance', 'Closed', 0, 0, 40, 0, 0, 0, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
