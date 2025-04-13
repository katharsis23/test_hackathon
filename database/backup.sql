-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: ANIMAL_SHELTER
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `article_id` varchar(10) NOT NULL,
  `photo_url` text,
  `age` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `health_status` text,
  `description` text,
  `shelter_id` varchar(10) DEFAULT NULL,
  `volunteer_id` varchar(10) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `animal_type` enum('dogs','cats') DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `fk_shelter_id` (`shelter_id`),
  KEY `fk_volunteer_id` (`volunteer_id`),
  CONSTRAINT `fk_shelter_id` FOREIGN KEY (`shelter_id`) REFERENCES `shelter` (`shelter_id`),
  CONSTRAINT `fk_volunteer_id` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer` (`volunteer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` varchar(10) NOT NULL,
  `description` text NOT NULL,
  `shelter_id` varchar(10) NOT NULL,
  `volunteer_id` varchar(10) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comments_shelter_id` (`shelter_id`),
  KEY `fk_comments_volunteer_id` (`volunteer_id`),
  CONSTRAINT `fk_comments_shelter_id` FOREIGN KEY (`shelter_id`) REFERENCES `shelter` (`shelter_id`),
  CONSTRAINT `fk_comments_volunteer_id` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer` (`volunteer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shelter`
--

DROP TABLE IF EXISTS `shelter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shelter` (
  `shelter_id` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `shelter_password` varchar(255) NOT NULL,
  `shelter_address` varchar(255) DEFAULT NULL,
  `shelter_category` varchar(100) DEFAULT NULL,
  `bank_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`shelter_id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `shelter_address` (`shelter_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shelter`
--

LOCK TABLES `shelter` WRITE;
/*!40000 ALTER TABLE `shelter` DISABLE KEYS */;
/*!40000 ALTER TABLE `shelter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer`
--

DROP TABLE IF EXISTS `volunteer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer` (
  `username` varchar(100) NOT NULL,
  `volunteer_id` varchar(10) NOT NULL,
  `volunteer_password` varchar(255) NOT NULL,
  `email` text NOT NULL,
  PRIMARY KEY (`volunteer_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer`
--

LOCK TABLES `volunteer` WRITE;
/*!40000 ALTER TABLE `volunteer` DISABLE KEYS */;
/*!40000 ALTER TABLE `volunteer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer_article`
--

DROP TABLE IF EXISTS `volunteer_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volunteer_article` (
  `volunteer_article_id` varchar(10) NOT NULL,
  `volunteer_id` varchar(10) NOT NULL,
  `article_id` varchar(10) NOT NULL,
  PRIMARY KEY (`volunteer_article_id`),
  KEY `fk_volunteerXarticle_volunteer_id` (`volunteer_id`),
  KEY `fk_volunteerXarticle_article_id` (`article_id`),
  CONSTRAINT `fk_volunteerXarticle_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`),
  CONSTRAINT `fk_volunteerXarticle_volunteer_id` FOREIGN KEY (`volunteer_id`) REFERENCES `volunteer` (`volunteer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer_article`
--

LOCK TABLES `volunteer_article` WRITE;
/*!40000 ALTER TABLE `volunteer_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `volunteer_article` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-11 10:44:06
