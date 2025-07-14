-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2025 at 07:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `work` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `Name`, `email`, `phone`, `password`, `occupation`, `work`) VALUES
(1, 'RAMCHANDRA PANDURANG', 'ramadaskadam72@gmail.com', '09221522135', '$2b$08$RLr0QExPB3A57mL4I.W02.yW7QzC46K/MUb2AooXNfo', 'customer', NULL),
(13, 'tirtha', 'tirtha34@gmail.com', '09221522135', 'trm34', 'customer', NULL),
(14, 'sakshi kadam', 'sakshikadam1607@gmail.com', '9029744509', 'srk123', 'service_provider', 'plumber'),
(16, 'RAMCHANDRA PANDURANG', 'ramadaskadam72@gmail.com', '8221522135', 'asdfask@234', 'customer', NULL),
(17, 'sakshi', 'sakshi34@gmail.com', '9221522135', 'srk@1239', 'customer', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
