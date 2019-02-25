-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2018 at 03:34 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `citu_parking_app_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_parking`
--

DROP DATABASE IF EXISTS citu_parking_app_db;
CREATE DATABASE IF NOT EXISTS citu_parking_app_db;

USE citu_parking_app_db;


CREATE TABLE `tbl_parking` (
  `id` int(1) NOT NULL,
  `guard_id` int(11) NOT NULL,
  `person_type_id` int(11) NOT NULL,
  `parking_area_id` int(11) NOT NULL,
  `parking_lot_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `created_date` varchar(50) NOT NULL,
  `updated_date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tbl_violation`(
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `occupant_id` VARCHAR(30) NOT NULL,
  `rule_violated` VARCHAR(255) NOT NULL,
  `additional_notes` TEXT,
  `status` VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_parking`
--

INSERT INTO `tbl_parking` (`id`, `guard_id`, `person_type_id`, `parking_area_id`, `parking_lot_id`, `first_name`, `last_name`, `created_date`, `updated_date`) VALUES
(1, 0, 1, 1, 55, 'Shem', 'Chavez', '2018-08-20T00:06:34+0800', '2018-08-20T00:09:51+0800'),
(2, 0, 1, 1, 1, 'ADASD', 'ASDS', '2018-08-20T00:10:02+0800', '2018-08-20T00:10:02+0800'),
(3, 0, 1, 1, 2, 'asd', 'asd', '2018-08-20T00:19:20+0800', '2018-08-20T00:19:20+0800'),
(4, 0, 2, 2, 60, 'Pofay', 'Pofay', '2018-09-20T20:06:54+0800', '2018-09-20T20:06:54+0800');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_parking_area`
--

CREATE TABLE `tbl_parking_area` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_date` varchar(50) NOT NULL,
  `updated_date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_parking_area`
--

INSERT INTO `tbl_parking_area` (`id`, `name`, `created_date`, `updated_date`) VALUES
(1, 'New Academic Building', '', ''),
(2, 'S & T Building', '', ''),
(3, 'Canteen', '', ''),
(4, 'High School Building', '', ''),
(5, 'Back Gate', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_parking_lot`
--

CREATE TABLE `tbl_parking_lot` (
  `id` int(11) NOT NULL,
  `parking_area_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `created_date` varchar(50) NOT NULL,
  `updated_date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_parking_lot`
--

INSERT INTO `tbl_parking_lot` (`id`, `parking_area_id`, `name`, `status`, `created_date`, `updated_date`) VALUES
(1, 1, 'PWD', 1, '', ''),
(2, 1, 'B1', 0, '', ''),
(3, 1, 'B2', 0, '', ''),
(4, 1, 'B3', 0, '', ''),
(5, 1, 'B4', 0, '', ''),
(6, 1, 'B5', 0, '', ''),
(7, 1, 'B6', 0, '', ''),
(8, 1, 'B7', 1, '', ''),
(9, 1, 'A1', 0, '', ''),
(10, 1, 'A2', 0, '', ''),
(11, 1, 'A3', 0, '', ''),
(12, 1, 'A4', 0, '', ''),
(13, 1, 'A5', 0, '', ''),
(14, 1, 'A6', 0, '', ''),
(15, 1, 'A7', 0, '', ''),
(16, 1, 'A8', 0, '', ''),
(17, 1, 'A9', 0, '', ''),
(18, 1, 'A10', 0, '', ''),
(19, 1, 'A11', 0, '', ''),
(20, 1, 'A12', 0, '', ''),
(21, 1, 'A13', 0, '', ''),
(22, 1, 'A14', 0, '', ''),
(23, 1, 'A15', 0, '', ''),
(24, 1, 'A16', 0, '', ''),
(25, 1, 'A17', 0, '', ''),
(26, 1, 'A18', 0, '', ''),
(27, 1, 'A19', 0, '', ''),
(28, 1, 'A20', 0, '', ''),
(29, 1, 'A21', 0, '', ''),
(30, 1, 'A23', 1, '', ''),
(31, 1, 'A24', 0, '', ''),
(32, 1, 'A25', 0, '', ''),
(33, 1, 'A26', 0, '', ''),
(34, 1, 'A27', 0, '', ''),
(35, 1, 'A28', 0, '', ''),
(36, 1, 'A29', 0, '', ''),
(37, 1, 'A30', 0, '', ''),
(38, 1, 'A31', 0, '', ''),
(39, 1, 'A32', 0, '', ''),
(41, 1, 'A33', 0, '', ''),
(42, 1, 'A34', 0, '', ''),
(43, 1, 'A35', 0, '', ''),
(44, 1, 'A36', 0, '', ''),
(45, 1, 'A37', 0, '', ''),
(46, 1, 'A38', 0, '', ''),
(48, 1, 'A39', 0, '', ''),
(49, 1, 'A40', 0, '', ''),
(50, 1, 'A41', 0, '', ''),
(51, 1, 'A42', 0, '', ''),
(52, 1, 'A43', 0, '', ''),
(53, 1, 'A44', 0, '', ''),
(54, 1, 'A45', 0, '', ''),
(55, 1, 'C1', 1, '', ''),
(56, 1, 'C2', 0, '', ''),
(57, 1, 'C3', 0, '', ''),
(58, 1, 'C4', 0, '', ''),
(59, 1, 'C5', 0, '', ''),
(60, 2, 'D1', 1, '', ''),
(61, 2, 'D2', 0, '', ''),
(62, 2, 'D3', 0, '', ''),
(63, 2, 'D4', 0, '', ''),
(64, 2, 'D5', 0, '', ''),
(65, 2, 'D6', 0, '', ''),
(66, 2, 'D7', 0, '', ''),
(67, 2, 'D8', 0, '', ''),
(68, 2, 'D9', 0, '', ''),
(69, 2, 'D10', 0, '', ''),
(70, 2, 'D11', 0, '', ''),
(71, 2, 'D12', 0, '', ''),
(72, 2, 'D13', 0, '', ''),
(73, 2, 'D14', 0, '', ''),
(74, 2, 'D15', 0, '', ''),
(75, 2, 'D16', 0, '', ''),
(76, 2, 'D17', 0, '', ''),
(77, 2, 'D18', 0, '', ''),
(78, 2, 'D19', 0, '', ''),
(79, 2, 'D20', 0, '', ''),
(80, 2, 'D21', 0, '', ''),
(81, 2, 'D22', 0, '', ''),
(82, 2, 'D23', 0, '', ''),
(83, 2, 'D24', 0, '', ''),
(84, 2, 'D25', 0, '', ''),
(85, 2, 'D26', 0, '', ''),
(86, 2, 'D27', 0, '', ''),
(87, 2, 'D28', 0, '', ''),
(88, 2, 'D29', 0, '', ''),
(89, 2, 'D30', 0, '', ''),
(90, 2, 'D31', 0, '', ''),
(91, 2, 'D32', 0, '', ''),
(92, 2, 'D33', 0, '', ''),
(93, 2, 'D34', 0, '', ''),
(94, 2, 'D35', 0, '', ''),
(95, 2, 'D36', 0, '', ''),
(96, 2, 'D37', 0, '', ''),
(97, 2, 'D38', 0, '', ''),
(98, 2, 'D39', 0, '', ''),
(99, 2, 'D40', 0, '', ''),
(100, 3, 'E1', 0, '', ''),
(101, 3, 'E2', 0, '', ''),
(102, 3, 'E3', 0, '', ''),
(103, 3, 'E4', 0, '', ''),
(104, 3, 'E5', 0, '', ''),
(105, 3, 'E6', 0, '', ''),
(106, 3, 'E7', 0, '', ''),
(107, 3, 'E8', 0, '', ''),
(108, 3, 'E9', 0, '', ''),
(109, 3, 'E10', 0, '', ''),
(110, 3, 'E11', 0, '', ''),
(111, 3, 'E12', 0, '', ''),
(112, 3, 'E13', 0, '', ''),
(113, 3, 'E14', 0, '', ''),
(114, 3, 'E15', 0, '', ''),
(115, 3, 'E16', 0, '', ''),
(116, 3, 'E17', 0, '', ''),
(117, 3, 'E18', 0, '', ''),
(118, 3, 'E19', 0, '', ''),
(119, 3, 'E20', 0, '', ''),
(120, 3, 'E21', 0, '', ''),
(121, 3, 'E22', 0, '', ''),
(122, 3, 'E23', 0, '', ''),
(123, 3, 'E24', 0, '', ''),
(124, 3, 'E25', 0, '', ''),
(125, 3, 'E26', 0, '', ''),
(126, 3, 'E27', 0, '', ''),
(127, 3, 'E28', 0, '', ''),
(128, 3, 'E29', 0, '', ''),
(129, 3, 'E30', 0, '', ''),
(130, 3, 'E31', 0, '', ''),
(131, 3, 'E32', 0, '', ''),
(132, 3, 'E33', 0, '', ''),
(133, 3, 'E34', 0, '', ''),
(134, 3, 'E35', 0, '', ''),
(135, 3, 'E36', 0, '', ''),
(136, 3, 'E37', 0, '', ''),
(137, 3, 'E38', 0, '', ''),
(138, 3, 'E39', 0, '', ''),
(139, 3, 'E40', 0, '', ''),
(140, 3, 'E41', 0, '', ''),
(141, 3, 'E42', 0, '', ''),
(142, 3, 'E43', 0, '', ''),
(143, 3, 'E44', 0, '', ''),
(144, 3, 'E45', 0, '', ''),
(145, 3, 'E46', 0, '', ''),
(146, 3, 'E47', 0, '', ''),
(147, 3, 'E48', 0, '', ''),
(148, 3, 'E49', 0, '', ''),
(149, 3, 'E50', 0, '', ''),
(150, 3, 'E51', 0, '', ''),
(151, 3, 'E52', 0, '', ''),
(152, 3, 'E53', 0, '', ''),
(153, 3, 'E54', 0, '', ''),
(154, 3, 'E55', 0, '', ''),
(155, 3, 'E56', 0, '', ''),
(156, 3, 'E57', 0, '', ''),
(157, 3, 'E58', 0, '', ''),
(158, 3, 'E59', 0, '', ''),
(159, 3, 'E60', 0, '', ''),
(160, 4, 'F1', 0, '', ''),
(161, 4, 'F2', 0, '', ''),
(162, 4, 'F3', 0, '', ''),
(163, 4, 'F4', 0, '', ''),
(164, 4, 'F5', 0, '', ''),
(165, 4, 'F6', 0, '', ''),
(166, 4, 'F7', 0, '', ''),
(167, 4, 'F8', 0, '', ''),
(168, 4, 'F9', 0, '', ''),
(169, 4, 'F10', 0, '', ''),
(170, 4, 'F11', 0, '', ''),
(171, 4, 'F12', 0, '', ''),
(172, 4, 'F13', 0, '', ''),
(173, 4, 'F14', 0, '', ''),
(174, 4, 'F15', 0, '', ''),
(175, 4, 'F16', 0, '', ''),
(176, 4, 'F17', 0, '', ''),
(177, 4, 'F18', 0, '', ''),
(178, 4, 'F19', 0, '', ''),
(179, 4, 'F20', 0, '', ''),
(180, 4, 'F21', 0, '', ''),
(181, 4, 'F22', 0, '', ''),
(182, 4, 'F23', 0, '', ''),
(183, 4, 'F24', 0, '', ''),
(184, 4, 'F25', 0, '', ''),
(185, 4, 'F26', 0, '', ''),
(186, 4, 'F27', 0, '', ''),
(187, 4, 'F28', 0, '', ''),
(188, 4, 'F29', 0, '', ''),
(189, 4, 'F30', 0, '', ''),
(190, 4, 'F31', 0, '', ''),
(191, 4, 'F32', 0, '', ''),
(192, 4, 'F33', 0, '', ''),
(193, 4, 'F34', 0, '', ''),
(194, 4, 'F35', 0, '', ''),
(195, 4, 'F36', 0, '', ''),
(196, 4, 'F37', 0, '', ''),
(197, 4, 'F38', 0, '', ''),
(198, 4, 'F39', 0, '', ''),
(199, 4, 'F40', 0, '', ''),
(200, 4, 'F41', 0, '', ''),
(201, 4, 'F42', 0, '', ''),
(202, 4, 'F43', 0, '', ''),
(203, 4, 'F44', 0, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_person_type`
--

CREATE TABLE `tbl_person_type` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_date` varchar(50) NOT NULL,
  `updated_date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_person_type`
--

INSERT INTO `tbl_person_type` (`id`, `name`, `created_date`, `updated_date`) VALUES
(1, 'visitor', '', ''),
(2, 'student', '', ''),
(3, 'teacher', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `role` varchar(10) NOT NULL,
  `created_date` varchar(50) NOT NULL,
  `updated_date` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `username`, `password`, `first_name`, `last_name`, `role`, `created_date`, `updated_date`) VALUES
(1, 'admin', 'admin', 'John', 'Denver', 'admin', '', ''),
(40, 'john12', 'denver34', 'John', 'dddd', 'guard', '2018-08-15T00:24:42+0800', '2018-08-15T00:32:18+0800'),
(41, 'ggilos6ba00', 'cd1aa', 'Gian', 'Gilos', 'guard', '2018-09-23T12:54:32+0800', '2018-09-23T12:54:32+0800');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_parking`
--
ALTER TABLE `tbl_parking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_parking_area`
--
ALTER TABLE `tbl_parking_area`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_parking_lot`
--
ALTER TABLE `tbl_parking_lot`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_person_type`
--
ALTER TABLE `tbl_person_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_parking`
--
ALTER TABLE `tbl_parking`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_parking_area`
--
ALTER TABLE `tbl_parking_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_parking_lot`
--
ALTER TABLE `tbl_parking_lot`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=204;

--
-- AUTO_INCREMENT for table `tbl_person_type`
--
ALTER TABLE `tbl_person_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE TABLE `tbl_occupant` (
  `school_id_number` VARCHAR(30) PRIMARY KEY,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `tbl_occupant` (`school_id_number`,`name`) VALUES 
('16-1799-579', 'Gian Carlo Gilos'),
('16-5799-879', 'Percy Joseph Fernandez'),
('95-30-f2-29', 'Cardo Magtanggol'),
('1b-2b-a1-79', 'Jon Fritz Quilo');

CREATE TABLE `tbl_occupation` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `occupant_id_number` VARCHAR(30) NOT NULL,
  `lotName`  VARCHAR(5) NOT NULL,
  `status` VARCHAR(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `tbl_comment` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `comment` VARCHAR(255) NOT NULL
)
