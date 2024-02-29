-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: sadb
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_school`
--

DROP TABLE IF EXISTS `tbl_school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_school` (
  `school_id` int NOT NULL AUTO_INCREMENT,
  `institute_name` varchar(225) DEFAULT NULL,
  `school_name` varchar(255) DEFAULT NULL,
  `school_reg_no` varchar(255) DEFAULT NULL,
  `board_type` varchar(255) DEFAULT NULL,
  `school_address` varchar(255) DEFAULT NULL,
  `school_pincode` varchar(45) DEFAULT NULL,
  `school_city` varchar(45) DEFAULT NULL,
  `school_state` varchar(45) DEFAULT NULL,
  `school_country` varchar(45) DEFAULT NULL,
  `school_email_id` varchar(255) DEFAULT NULL,
  `school_contact_no` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`school_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_school`
--

LOCK TABLES `tbl_school` WRITE;
/*!40000 ALTER TABLE `tbl_school` DISABLE KEYS */;
INSERT INTO `tbl_school` VALUES (1,'INSTITUTION','SCHOOL','123','Board','ADDRESS',NULL,'COTY','STATE','COUNTRY','nj@email.com','8765'),(2,'Shubham Institution','Shubham School of Testing','12387','International','Bandal Complex',NULL,'Pune','Maharashtra','India','shubham@institute.com','9595256632'),(3,'Shubham Institution','Shubham School Of Arts','2098934','State','JM road',NULL,'Pune','Maharashtra','India','shubham@school.com','9879833222');
/*!40000 ALTER TABLE `tbl_school` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-27 12:08:39
