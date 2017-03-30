-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 07, 2015 at 11:25 PM
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
-- Table structure for table `MarathonRunners`
--

CREATE TABLE IF NOT EXISTS `MarathonRunners` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `runnerId` int(11) DEFAULT NULL,
  `minute` int(11) DEFAULT NULL,
  `started` int(11) DEFAULT NULL,
  `finished` int(11) DEFAULT NULL,
  `corral` int(11) DEFAULT NULL,
  `startTime` float DEFAULT NULL,
  `position` float DEFAULT NULL,
  `deviation` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `myIndex` (`runnerId`,`minute`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19441151 ;

--
-- Dumping data for table `MarathonRunners`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
