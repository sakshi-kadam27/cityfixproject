-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2025 at 12:05 PM
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
(11, 'Electrician', 19, 4, '2025-09-26', '20:15', 'work_done', 3),
(12, 'Electrician', 19, 4, '2025-09-25', '22:15', 'work_done', 4),
(13, 'Electrician', 19, 4, '2025-09-28', '23:18', 'work_done', 3),
(14, 'Electrician', 19, 4, '2025-10-04', '23:21', 'pending', NULL),
(15, 'Electrician', 19, 4, '2025-09-27', '21:08', 'work_done', 4),
(16, 'Electrician', 19, 4, '2025-10-04', '22:30', 'work_done', 4),
(17, 'Electrician', 19, 4, '2025-09-30', '06:56', 'accepted', NULL),
(18, 'Electrician', 19, 4, '2025-09-30', '06:56', 'accepted', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `service_provider`
--

CREATE TABLE `service_provider` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(20) NOT NULL,
  `password` varchar(10) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `work` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `price` int(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `shop_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_provider`
--

INSERT INTO `service_provider` (`id`, `name`, `email`, `phone`, `password`, `occupation`, `work`, `address`, `price`, `city`, `shop_name`) VALUES
(1, 'babu', 'babu45@gmail.com', 2147483647, 'babu@452', 'service_provider', 'plumber', 'some addres', 98, 'Thane', 'balu'),
(4, 'Rohan', 'rohan34@gmail.com', 2147483647, 'rohan@34', 'service_provider', 'Electrician', 'fghj7', 277, 'Thane', 'shiva');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `work` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `occupation`, `work`, `address`, `city`) VALUES
(1, 'RAMCHANDRA PANDURANG', 'ramadaskadam72@gmail.com', '09221522135', '$2b$08$RLr0QExPB3A57mL4I.W02.yW7QzC46K/MUb2AooXNfo', 'customer', NULL, NULL, NULL),
(18, 'sakshi', 'sakshi54@gmail.com', '9867756819', 'sakshi@540', 'customer', NULL, 'my adderesss', 'thane'),
(19, 'mohan', 'mohan34@gmail.com', '6543298760', 'mohan@34', 'customer', NULL, 'manpadaaflkasjdfkl', 'Thane');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_provider`
--
ALTER TABLE `service_provider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `service_provider`
--
ALTER TABLE `service_provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
