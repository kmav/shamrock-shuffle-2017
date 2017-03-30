-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2016 at 03:06 PM
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
-- Table structure for table `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `username` varchar(40) NOT NULL,
  `password` varchar(40) NOT NULL,
  `createUser` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` int(3) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `station` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `password`, `createUser`, `id`, `level`, `name`, `lastname`, `email`, `station`) VALUES
('bpeynetti', 'marathon', '2015-09-24 18:32:05', 1, 0, NULL, NULL, NULL, NULL),
('p_mirch', 'popcorn', '2015-09-24 18:32:05', 2, 0, NULL, NULL, NULL, NULL),
('et', 'phonehome', '2015-09-24 18:32:05', 3, 0, NULL, NULL, NULL, NULL),
('Bp', 'marathon', '2015-09-24 18:32:05', 4, 0, 'Bruno', 'Peynetti', NULL, NULL),
('syoung', 'marathon2015', '2015-09-24 18:32:05', 5, 0, 'Sam', 'Young', NULL, NULL),
('rrose', 'Sm3ll83!!', '2015-09-25 16:11:40', 6, 0, 'Ryan', 'Rose', 'ryanrose2017@u.northwestern.edu', NULL),
('rachellin23', 'cloud9DVS', '2015-09-25 16:12:50', 7, 0, 'Rachel', 'Lin', 'rachellin2017@u.northwestern.edu', NULL),
('glen.suerte', 'Test0101', '2015-09-29 21:07:34', 20, 1, 'Glen', 'Suerte', 'suerte52@gmail.com', 'FC'),
('smilowitz', 'krs123', '2015-10-05 12:19:41', 21, 1, 'Karen', 'Smiliowitz', 'ksmilowitz@northwestern.edu', 'FC'),
('hpeynetti', 'grasso92', '2015-10-11 12:20:12', 22, 2, 'HECTOR', 'PEYNETTI', 'HPEYNETTI@GMAIL.COM', 'AS');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
