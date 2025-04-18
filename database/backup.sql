-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: animal_shelter
-- ------------------------------------------------------
-- Server version	8.0.41

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
INSERT INTO `article` VALUES ('026c3c0d67','https://i.pinimg.com/736x/c3/0e/9b/c30e9bbaef3532e9b5b8964024f25a71--princess-cat-princess-aurora.jpg',4,'╨б╨╛╨╜╤П','╨Ч╨┤╨╛╤А╨╛╨▓╨╕╨╣','╨Ч╨░╨▓╨╢╨┤╨╕ ╤Г ╨┐╨╛╤И╤Г╨║╨░╤Е ╨┐╤А╨╕╨│╨╛╨┤: ╤Б╤В╤А╨╕╨▒╨░╤Ф ╨┐╨╛ ╤И╨░╤Д╨░╤Е, ╨╗╨╛╨▓╨╕╤В╤М ╨╜╨╡╨▓╨╕╨┤╨╕╨╝╤Г ╨╖╨┤╨╛╨▒╨╕╤З, ╨░ ╨┐╨╛╤В╤Ц╨╝ ╤А╨░╨┐╤В╨╛╨▓╨╛ ╨╖╨░╤Б╨╕╨╜╨░╤Ф ╤Г ╨╜╨░╨╣╨║╤Г╨╝╨╡╨┤╨╜╤Ц╤И╤Ц╨╣ ╨┐╨╛╨╖╤Ц.',NULL,'7480ba1c76','╨Ф╤Ц╨▓╤З╨╕╨╜╨║╨░','cats'),('1316bad2de','https://www.healthypawspetinsurance.com/Images/V3/DogAndPuppyInsurance/Dog_CTA_Desktop_HeroImage.jpg',1,'╨Ж╨▓╨░╨╜','╨Я╨╛╤В╤А╨╡╨▒╤Г╤Ф ╨╗╤Ц╨║╤Г╨▓╨░╨╜╨╜╤П','╨Ч╨╜╨░╤Ф, ╨║╨╛╨╗╨╕ ╨┐╨╛╤В╤А╤Ц╨▒╨╜╨╛ ╨┐╤Ц╨┤╤В╤А╨╕╨╝╨░╤В╨╕, ╨░ ╨║╨╛╨╗╨╕ тАФ ╨┤╨░╤В╨╕ ╨┐╤А╨╛╤Б╤В╤Ц╤А. ╨Ы╤О╨▒╨╕╤В╤М ╨┤╨╛╨▓╨│╤Ц ╨┐╤А╨╛╨│╤Г╨╗╤П╨╜╨║╨╕ ╨▓ ╨┐╨░╤А╨║╤Г ╤В╨░ ╨▓╨╡╤З╤Ц╤А╨╜╤Ц ╨┐╨╛╤Б╨╕╨┤╨╡╨╜╤М╨║╨╕ ╨▒╤Ц╨╗╤П ╨╜╤Ц╨│.','2db4da7945',NULL,'╨е╨╗╨╛╨┐╤З╨╕╨║','dogs'),('207c4129e2','https://catscornervet.com/wp-content/uploads/2016/04/kitty-1.png',1,'╨Ь╤Г╤А╤З╨╕╨║','╨Я╨╛╤В╤А╨╡╨▒╤Г╤Ф ╨╗╤Ц╨║╤Г╨▓╨░╨╜╨╜╤П','╨Т╨╕╤В╨╛╨╜╤З╨╡╨╜╨╕╨╣, ╨╜╨╡╨╖╨░╨╗╨╡╨╢╨╜╨╕╨╣, ╨╖ ╨║╨╛╤А╨╛╨╗╤Ц╨▓╤Б╤М╨║╨╛╤О ╨▓╨┤╨░╤З╨╡╤О. ╨Я╨╛╨╗╤О╨▒╨╗╤П╤Ф ╤Б╨┐╨╛╨║╤Ц╨╣ ╤Ц ╤А╨╛╨╖╨▓╨░╨│╨╕ ╨╜╨░ ╨▓╨╗╨░╤Б╨╜╨╕╤Е ╤Г╨╝╨╛╨▓╨░╤Е. ╨Ж╨┤╨╡╨░╨╗╤М╨╜╨╕╨╣ ╨║╨╛╨╝╨┐╨░╨╜╤М╨╣╨╛╨╜ ╨┤╨╗╤П ╤В╨╕╤Е╨╕╤Е ╨▓╨╡╤З╨╛╤А╤Ц╨▓.',NULL,'7480ba1c76','╨е╨╗╨╛╨┐╤З╨╕╨║','cats'),('600eddf911','https://i.kinja-img.com/gawker-media/image/upload/s--kHrQ8nr7--/c_scale,f_auto,fl_progressive,q_80,w_800/18huxz4bvnfjbjpg.jpg',2,'╨С╨░╤А╤Б╤Ц╨║','╨Ч╨┤╨╛╤А╨╛╨▓╨╕╨╣','╨Ы╤О╨▒╨╕╤В╤М ╨┤╨╛╤Б╨╗╤Ц╨┤╨╢╤Г╨▓╨░╤В╨╕ ╨║╨╛╨╢╨╡╨╜ ╨║╤Г╤В╨╛╨║ ╨▒╤Г╨┤╨╕╨╜╨║╤Г, ╨╖╨░╨▓╨╢╨┤╨╕ ╨╖╨╜╨░╨╣╨┤╨╡ ╤Б╨╛╨╜╤П╤З╨╜╨╡ ╨╝╤Ц╤Б╤Ж╨╡ ╨┤╨╗╤П ╨┤╤А╤Ц╨╝╨╛╤В╨╕. ╨Ю╨▒╨╛╨╢╨╜╤О╤Ф ╤Ц╨│╤А╨╕ ╨╖ ╨╝\'╤П╤З╨╕╨║╨░╨╝╨╕-╨┤╨╖╨▓╤Ц╨╜╨╛╤З╨║╨░╨╝╨╕ ╤В╨░ ╨╗╨░╤Б╨║╨░╨▓╤Ц ╨╛╨▒╤Ц╨╣╨╝╨╕.',NULL,'7480ba1c76','╨Ф╤Ц╨▓╤З╨╕╨╜╨║╨░','cats'),('a2cd926f3d','https://catscornervet.com/wp-content/uploads/2016/04/kitty-1.png',1,'╨в╨╡╤Б╤В','╨Ч╨┤╨╛╤А╨╛╨▓╨╕╨╣','╨в╨╡╤Б╤В','1ee26b4eb2',NULL,'╨е╨╗╨╛╨┐╤З╨╕╨║','cats'),('a334d187f9','https://s7d1.scene7.com/is/image/PETCO/puppy-090517-dog-featured-355w-200h-d',4,'╨и╨░╤А╤Ц╨║','╨Ч╨┤╨╛╤А╨╛╨▓╨╕╨╣','╨Ч╨░╨▓╨╢╨┤╨╕ ╨╜╨░ ╤З╨░╤Б╤Ц: ╤Б╤Г╨┐╤А╨╛╨▓╨╛╨┤╨╢╤Г╤Ф ╨╜╨░ ╨┐╤А╨╛╨│╤Г╨╗╤П╨╜╨║╨░╤Е, ╨╖╤Г╤Б╤В╤А╤Ц╤З╨░╤Ф ╨▒╤Ц╨╗╤П ╨┤╨▓╨╡╤А╨╡╨╣, ╨░ ╨▓╨╜╨╛╤З╤Ц ╨┐╨╕╨╗╤М╨╜╤Г╤Ф ╨▓╨░╤И ╤Б╨╛╨╜. ╨Ю╨▒╨╛╨╢╨╜╤О╤Ф ╨░╨║╤В╨╕╨▓╨╜╤Ц ╤Ц╨│╤А╨╕ ╤В╨░ ╨╜╨░╨▓╤З╨░╨╜╨╜╤П ╨╜╨╛╨▓╨╕╨╝ ╨║╨╛╨╝╨░╨╜╨┤╨░╨╝.','2db4da7945',NULL,'╨е╨╗╨╛╨┐╤З╨╕╨║','dogs'),('b1dc151640','https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/2018-02/vicious_dog_0.png?itok=nsghKOHs',2,'╨С╨╛╨▒╤Ц╨║','╨Ч ╨╛╤Б╨╛╨▒╨╗╨╕╨▓╨╛╤Б╤В╤П╨╝╨╕','╨Э╤Ц╨║╨╛╨╗╨╕ ╨╜╨╡ ╤Б╨╕╨┤╨╕╤В╤М ╨╜╨░ ╨╝╤Ц╤Б╤Ж╤Ц! ╨У╨╛╤В╨╛╨▓╨╕╨╣ ╨▒╤Ц╨│╤В╨╕, ╤Б╤В╤А╨╕╨▒╨░╤В╨╕, ╨┐╨╗╨░╨▓╨░╤В╨╕ ╤Ц ╨╜╨░╨▓╤Ц╤В╤М ╤В╨░╨╜╤Ж╤О╨▓╨░╤В╨╕. ╨Ж╨┤╨╡╨░╨╗╤М╨╜╨╕╨╣ ╨┐╨░╤А╤В╨╜╨╡╤А ╨┤╨╗╤П ╤Б╨┐╨╛╤А╤В╨╕╨▓╨╜╨╕╤Е ╨╗╤О╨┤╨╡╨╣.','2db4da7945',NULL,'╨е╨╗╨╛╨┐╤З╨╕╨║','dogs'),('f017724392','https://www.jesuitroundup.org/wp-content/uploads/2018/01/tabby-cat-names.jpg',2,'╨Я╨╡╤В╤А╨╛','╨Ч ╨╛╤Б╨╛╨▒╨╗╨╕╨▓╨╛╤Б╤В╤П╨╝╨╕','╨Э╨░╨╣╨▒╤Ц╨╗╤М╤И╨╡ ╤Г ╤Б╨▓╤Ц╤В╤Ц ╨╗╤О╨▒╨╕╤В╤М ╤Б╨┐╨░╤В╨╕. ╨Ч╨╜╨░╤Ф ╨▓╤Б╤Ц ╤В╨╡╨┐╨╗╤Ц ╨║╤Г╤В╨╛╤З╨║╨╕ ╨▓ ╨┤╨╛╨╝╤Ц, ╨░╨╗╨╡ ╨╜╤Ц╨║╨╛╨╗╨╕ ╨╜╨╡ ╨▓╤Ц╨┤╨╝╨╛╨▓╨╕╤В╤М╤Б╤П ╨▓╤Ц╨┤ ╨▓╨╡╤З╨╡╤А╤Ц ╨▓ ╨╛╨▒╨╝╤Ц╨╜ ╨╜╨░ ╨╝╨░╤Б╨░╨╢ ╨╖╨░ ╨▓╤Г╤И╨║╨░╨╝╨╕.',NULL,'7480ba1c76','╨Ф╤Ц╨▓╤З╨╕╨╜╨║╨░','cats'),('fdcd885b92','https://i.ytimg.com/vi/C_lpU5DiJ0Y/maxresdefault.jpg',1,'╨Р╨╜╤В╨╛╨╜╤Ц╨╜╨░','╨Ч╨┤╨╛╤А╨╛╨▓╨╕╨╣','╨Ч╨░╨┐╤А╨╛╤И╤Г╤Ф ╨╜╨░ ╨▓╨╕╤Б╤В╨░╨▓╨╕ ╨║╨╛╨╢╨╡╨╜ ╨┤╨╡╨╜╤М: ╨║╤Г╨▓╤Л╤А╨║╨░╤Ф╤В╤М╤Б╤П, ╨╜╨╛╤Б╨╕╤В╤М ╤В╨░╨┐╨║╨╕, ╤А╨╛╨▒╨╕╤В╤М \"╨┐╨╛╨║╨╗╨╛╨╜\" ╨╖╨░ ╨╗╨░╤Б╨╛╤Й╤Ц. ╨З╤Ч ╨╡╨╝╨╛╤Ж╤Ц╤Ч тАФ ╨▓╤Ц╨┤ ╤Й╨░╤Б╤В╤П ╨┤╨╛ ╨┤╤А╨░╨╝╨░╤В╨╕╨╖╨╝╤Г тАФ ╨╖╨░╤А╤П╨┤╨╢╨░╤О╤В╤М ╨╛╨┐╤В╨╕╨╝╤Ц╨╖╨╝╨╛╨╝.','2db4da7945',NULL,'╨Ф╤Ц╨▓╤З╨╕╨╜╨║╨░','dogs');
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
INSERT INTO `shelter` VALUES ('1ee26b4eb2','╨Я╤А╨╕╤В╤Г╨╗╨╛╨║ ╨в╨╡╤Б╤В','test@gmail.com','$2b$12$ywJSD.jqp6BPfPtv2OQmZ.H/cmAzAfuWPgEeFgu2agtI8wh8Th.IC','╨╝╤Ц╤Б╤В╨╛ ╨Ы╤М╨▓╤Ц╨▓','╨Я╤А╨╕╤В╤Г╨╗╨╛╨║',NULL),('2db4da7945','╨Я╤А╨╕╤В╤Г╨╗╨╛╨║','bogdan.tyb9@gmail.com','$2b$12$GMRpHjIorcwXLo2ldX7iSerLRHuUWOBqApaQ.W83K9mSx6lk6tRNW','╨п╨▓╨╛╤А╨╜╨╕╤Ж╤М╨║╨╛╨│╨╛, 3╨С, ╨Ы╤М╨▓╤Ц╨▓','╨Я╤А╨╕╤В╤Г╨╗╨╛╨║',NULL),('f38307f281','1','1@gmail.com','$2b$12$m6xEWY/v1NZ6Cvqp3sh0peznb3GaTwb5Azh63tfMx5odc6jzT/H.S','1','╨Я╤А╨╕╤В╤Г╨╗╨╛╨║',NULL);
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
INSERT INTO `volunteer` VALUES ('UserTest','67486b8fc2','$2b$12$60cVTuw/OaTWWXW61Xtq/eTItHPN70MEW6VQzZHIh6dg4xl65Kq.G','test@gmail.com'),('Bogdan','7480ba1c76','$2b$12$dmOobxi0P2YBcwmoT2WabOkjoSGMo.E2b7W0Tz4HmJf.JZqpefvmm','bogdan.tyb9@gmail.com');
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
INSERT INTO `volunteer_article` VALUES ('27be817387','7480ba1c76','207c4129e2'),('32b856093a','7480ba1c76','026c3c0d67'),('32f8c48207','7480ba1c76','f017724392'),('4f5e4c5788','7480ba1c76','600eddf911');
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

-- Dump completed on 2025-04-13 21:07:42
