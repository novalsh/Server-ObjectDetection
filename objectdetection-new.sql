-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 28, 2023 at 03:43 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `objectdetection`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `from_active_time` time NOT NULL,
  `to_active_time` time NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`id`, `name`, `city`, `from_active_time`, `to_active_time`, `createdAt`, `updatedAt`, `deleteAt`) VALUES
(1, 'BINUS @Malang', 'Malang', '22:13:00', '05:04:00', '2023-07-11 23:59:55', '2023-07-12 00:37:51', NULL),
(2, 'BINUS @Kemanggisan', 'Kemanggisan', '08:30:00', '16:30:00', '2023-07-11 23:59:55', '2023-07-11 23:59:55', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `sensor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` longtext DEFAULT NULL,
  `isEmergency` tinyint(1) NOT NULL,
  `date` datetime NOT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `branch_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `sensor_id`, `user_id`, `description`, `isEmergency`, `date`, `photo_url`, `branch_id`, `createdAt`, `updatedAt`, `deleteAt`) VALUES
(8, 1, 2, 'aman saja', 1, '2023-06-12 00:00:00', 'http://localhost:83/uploads/not-allowed.png', 1, '2023-07-12 00:03:39', '2023-07-12 00:03:39', NULL),
(9, 1, 2, 'aman saja', 1, '2023-06-12 00:00:00', 'http://localhost:83/uploads/not-allowed.png', 2, '2023-07-12 00:04:13', '2023-07-12 00:04:13', NULL),
(10, 1, 2, 'aman saja', 1, '2023-06-12 00:00:00', 'http://localhost:83/uploads/empty-post.png', 2, '2023-07-12 00:07:22', '2023-07-12 00:07:22', NULL),
(11, 1, 3, 'aman saja', 1, '2023-06-12 00:00:00', 'http://localhost:83/uploads/empty-post.png', 2, '2023-07-12 00:07:47', '2023-07-12 00:07:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sensor`
--

CREATE TABLE `sensor` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `isOn` tinyint(1) NOT NULL DEFAULT 0,
  `isDetected` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sensor`
--

INSERT INTO `sensor` (`id`, `code`, `branch_id`, `latitude`, `longitude`, `isOn`, `isDetected`, `createdAt`, `updatedAt`, `deleteAt`) VALUES
(1, 'SENSOR#1', 1, 1.342323, -3.213212, 1, 0, '2023-07-12 00:00:57', '2023-07-12 00:08:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20230406190551-branch.js'),
('20230406190652-users.js'),
('20230406190735-sensor.js'),
('20230406191714-history.js');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin','security') NOT NULL,
  `branch_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deleteAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `branch_id`, `createdAt`, `updatedAt`, `deleteAt`) VALUES
(1, 'Admin', 'admin@example.com', '$2b$10$MrqjYIGTKhkQBr2h0bKh5OnQj55G2Fp/Bd4zTULMT2OPm34SuMdpW', 'admin', 1, '2023-07-11 23:59:55', '2023-07-11 23:59:55', NULL),
(2, 'SuperAdmin', 'superadmin@example.com', '$2b$10$MrqjYIGTKhkQBr2h0bKh5OnQj55G2Fp/Bd4zTULMT2OPm34SuMdpW', 'superadmin', 1, '2023-07-11 23:59:55', '2023-11-17 09:25:15', NULL),
(3, 'Reza', 'reza@gmail.com', '$2b$10$XiIvYvLHIqJmYppxQzWb3.UHmthn8sbBaaIhYGx0IbdhBB6eg3wPi', 'security', 2, '2023-07-12 00:06:57', '2023-07-12 00:06:57', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sensor_id` (`sensor_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `branch_id` (`branch_id`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `branch_id` (`branch_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sensor`
--
ALTER TABLE `sensor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`sensor_id`) REFERENCES `sensor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_3` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `sensor_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
