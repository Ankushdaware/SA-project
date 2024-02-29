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
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `userName` varchar(45) DEFAULT NULL,
  `userEmail` varchar(45) DEFAULT NULL,
  `userPassword` varchar(255) DEFAULT NULL,
  `userNumber` varchar(45) DEFAULT NULL,
  `userType` varchar(45) DEFAULT NULL,
  `tbl_usercol` varchar(45) DEFAULT NULL,
  `userStatus` varchar(45) DEFAULT NULL,
  `tbl_usercol1` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'Yash','inst_peag','aW5zdGl0dXRpb25AZXhhbXBsZS5jb20=','$2b$10$KMHtFxkVSQg2XmjFMc5ybOalyN/wMKRZcFZcrl3eN.Idb8HPnvvJe','1234567890','HeadAdmin',NULL,NULL,NULL),(2,'Vijay','vija_i8p7','dmlqYXlAZXhhbXBsZS5jb20=','$2b$10$kRoIwV04PK5nDsog6qAOie/BDfP4FBWe8OyqKWHFw8BZXLpjclmvq','4569758920','HeadAdmin',NULL,NULL,NULL),(3,'Admin','Emai_s3z7','RW1haWxAZ21pYWwuY29t','$2b$10$XML7c8ToTsWBzlCeeijyZOoa8Iz4Sc4Lb2wLVWRCg2q0YzhqPmd7.','56783590','SchoolAdmin',NULL,NULL,NULL),(4,'Teacher','Emai_xbyb','RW1haWxAdGVhY2hlci5jb20=','$2b$10$kNjTDq8wXRt7aCTkXAreJ.rFkG7EDd9YbswhYXUBtOIQex.CFsXOS','123467','teacher',NULL,NULL,NULL),(5,'AddTeacher','Teac_jqcz','VGVhY2hlckBnbWFpbC5jb20=','$2b$10$WaTeaBNcP5us1J0vNshmhO9w.oir9v6C4.AWN2cSOKJRk21iEjuP6','7986868686','teacher',NULL,NULL,NULL),(6,'TeacherName','Re@m_9606','UmVAbWdpLmNvbQ==','$2b$10$DyaFJrCITm9qULD7ido6TO/8E9zKHiYo3WpNmNb6ZYwZYin5wScbS','345674','teacher',NULL,NULL,NULL),(7,'vijay','df@f_zu27','ZGZAZmcuY29t','$2b$10$yzdJuFifbT7unS/kXVuZIOUSCp9V4VGInKS6nAYG3FC/7dmD..iXK','6467576','teacher',NULL,NULL,NULL),(8,'bgh','bgh@_gbmk','YmdoQGZnLmNvbQ==','$2b$10$kfAZ/bzkPjfn7fOiN0LeuuyzIe/VWU8G/GBndIftnWxL6mDoK6DWm','234652','teacher',NULL,NULL,NULL),(9,'bhfgdh','mvmf_qq7r','bXZtZmpoZkBnLmNvbQ==','$2b$10$iqBS3NTdtAYyTX6jWpMTgOeoCQG4HhHG/AZm9bOPmKycVDyWcCH7C','0985623','teacher',NULL,NULL,NULL),(10,'gfngj','fdff_qauh','ZmRmZmRAc2cuY29t','$2b$10$DzGAMrB354Xqv32Cig8T7OxXZVbxgYdS2EsriHR1GpdM2SbES0UJ6','752367','teacher',NULL,NULL,NULL),(11,'fjfm','mfj@_imft','bWZqQG5mYi5jb20=','$2b$10$YB9zu/2eWIV93ZfG9SDA7.T5NQoG.0GGKVs89Vm1U6zuTspZSJO4O','78543','teacher',NULL,NULL,NULL),(12,'325','dfge_widt','ZGZnZXJAZy5jb20=','$2b$10$ZQdmZuKnX.0tZ.MKJs2mKenAlEn62g6XJhz47EBGCfdgwXdlpPpUW','435','teacher',NULL,NULL,NULL),(13,'fdg','sfg@_1p0t','c2ZnQGdtYWlsLmNvbQ==','$2b$10$0cLxLkX4hoTQZWj0FDAyguDfr0QCvnoYZja5u40zgfgAGabIHSONO','35345','teacher',NULL,NULL,NULL),(14,'dfg','df@g_dgzl','ZGZAZy52','$2b$10$Yg3psmkqsN/Y.kFj.z6aQ.2LZt50Ro9KqlJFJDDFn1Bup8Qc2ppPC','234','teacher',NULL,NULL,NULL),(15,'Teacher','teac_ry7h','dGVhY2hlckBnbWFpbC5jb20=','$2b$10$hZIPDbbIhhji.80VLfcdae9tgv8w9ZUttZalE13rmjO25EFwot6gm','23098776','teacher',NULL,NULL,NULL),(16,'rg','sd@f_ubod','c2RAZmcuY29t','$2b$10$ASdrQRWOv..oF1QVOS.KnOGJdQpGATKQDQPRB71oipDJ23fz4AZ0i','3452657','teacher',NULL,NULL,NULL),(17,'TeacherName','teac_zwi1','dGVhY2hlckBleGFtcGxlLmNvbQ==','$2b$10$YWgjLjkQKRrAzDiihDDq.uH8CiKOArrRpPlqDM4zXMKlTj3QT1Iqe','59789789','teacher',NULL,NULL,NULL),(18,'Yash','yas_ooma',NULL,'$2b$10$lAdQGjaJ1SDAMeHsn/l4CO8W.RLQQ92rcqp5yFbp3/0ys11IXBaL.','348974634','student',NULL,NULL,NULL),(19,'Vijay','vij_midd',NULL,'$2b$10$K5fcnD4tUlm6FYyHvD8rEOvi08AbPcaFBGyF1tsT8SyrMiQQfxiQe','9875899434','student',NULL,NULL,NULL),(20,'Rushikesh','rus_csrb',NULL,'$2b$10$QTNPtEey1cF9ptML7SvTOeL5HMqnQfPjbaiwhfHFMCbjdp94Xyi6.','7359789769','student',NULL,NULL,NULL),(21,'Rahul','rah_dwj0',NULL,'$2b$10$M70xCTGoUyTWPONKd3srF.EMF.5ZvQrYu2tXxlJTtTi6VfU4UbrXO','9874938894','student',NULL,NULL,NULL),(22,'AdminYash','yash_6l5x','eWFzaEBhZG1pbi5jb20=','$2b$10$8sypYggjUNYNbscTGjX8Ju7mS4xKOBOz9Xt4R4MKcpT22jT6lww96','90890648','SchoolAdmin',NULL,NULL,NULL),(23,'AdminVijay','vija_nfdn','dmlqYXlAYWRtaW4uY29t','$2b$10$4LjV5Gg5z9pMH41IEyezlO5mdEMguf76tFA58QFd2iQAzRiRjbm9O','238973894','SchoolAdmin',NULL,NULL,NULL),(24,'kjhfdjkv','dklj_jxrm','ZGtsamdAa2wuc2Q=','$2b$10$LylR2/8LEjgp3rApsePYq.DQ3GAvyPxMrYD5GSp04sctAIsmAatdi','908348989','SchoolAdmin',NULL,NULL,NULL),(25,'SEND','send_un5c','c2VuZEBhZG1pbi5jb20=','$2b$10$lfDxsvy/P/4gL.NAbxXkxOXeZUbEi479e.jCB9KItHz80hWF6aIOi','907438989678','SchoolAdmin',NULL,NULL,NULL),(26,'Admin','ge@g_mtkf','Z2VAZ2tqLmNvcw==','$2b$10$iIZiFoFX5ZiyZ1PDK5rfWegnpqx5e4Skz16aAJ2yJSx/FDsZfNn1W','39485389','SchoolAdmin',NULL,NULL,NULL),(27,'sadfd','sdfd_z4qt','c2RmZGZlMndAZS5xZw==','$2b$10$15K9/CjcLKpH56MuUOS/ZupKw/QQaG/ST.i.jpPjyj6q/y2UctbhW','456487960','SchoolAdmin',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-27 12:08:40
