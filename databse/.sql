-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2025 at 06:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cityfix`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `name_of_service` varchar(255) NOT NULL,
  `userid` int(255) NOT NULL,
  `service_provider_id` int(255) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `customer_rating` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `name_of_service`, `userid`, `service_provider_id`, `date`, `time`, `status`, `customer_rating`) VALUES
(1, 'plumber', 18, 1, '2025', '20', 'rejected', NULL),
(2, 'plumber', 18, 1, '2025-08-02', '22', 'rejected', NULL),
(3, 'plumber', 18, 1, '2025-08-03', '22:42', 'accepted', NULL),
(4, 'plumber', 19, 1, '2025-08-07', '00:13', 'accepted', NULL),
(5, 'Electrician', 19, 4, '2025-09-20', '18:36', 'rejected', NULL),
(6, 'Electrician', 19, 4, '2025-09-26', '20:05', 'rejected', NULL),
(7, 'Electrician', 19, 4, '2025-09-27', '22:10', 'rejected', NULL),
(8, 'Electrician', 19, 4, '2025-09-26', '20:10', 'rejected', NULL),
(9, 'Electrician', 19, 4, '2025-09-26', '20:10', 'rejected', NULL),
(10, 'Electrician', 19, 4, '2025-09-20', '20:15', 'rejected', NULL),
(11, 'Electrician', 19, 4, '2025-09-26', '20:15', 'work_done', 5),
(12, 'Electrician', 19, 4, '2025-09-25', '22:15', 'work_done', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
