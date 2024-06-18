-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: prueba-tfg
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `proveedor_id` int NOT NULL,
  `fecha_agregado` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_usuario` (`usuario_id`),
  KEY `fk_proveedor` (`proveedor_id`),
  CONSTRAINT `fk_proveedor` FOREIGN KEY (`proveedor_id`) REFERENCES `proveedor` (`id_proveedor`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `nombre_proveedor` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo_servicio` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `profesional` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` int NOT NULL,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Juan Pérez','Electricista','Juan Pérez Electricista','Paseo',912345678),(2,'Ana López','Plomera','Ana López Plomera','Calle Serrano',987654321),(3,'Pedro García','Carpintero','Pedro García Carpintería','Calle Bailén',666555444),(4,'María Rodríguez','Pintora','María Rodríguez Pinturas','Paseo de la Castellanaa',333222111),(5,'Luis González','Fontanero','Luis González Fontanería','Avenida de los Reyes Católicos',555666777),(7,'pARA EDITAR','Pintora','DDSFDSFDS','FDSFDSFDSFDS',777777777);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_proveedor` int DEFAULT NULL,
  `fecha_cita` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_reserva`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_proveedor` (`id_proveedor`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,1,1,'2022-01-01 11:00:00','2022-01-01 10:00:00','2024-05-31 15:32:20'),(2,2,2,'2022-01-05 15:00:00','2022-01-05 14:00:00','2024-05-31 15:32:20'),(3,3,3,'2022-01-10 17:00:00','2022-01-10 16:00:00','2024-05-31 15:32:20'),(4,1,4,'2022-01-15 11:00:00','2022-01-15 10:00:00','2024-05-31 15:32:20'),(5,4,5,'2022-01-20 13:00:00','2022-01-20 12:00:00','2024-05-31 15:32:20'),(6,2,5,'2024-05-27 18:26:07','2022-01-20 12:00:00','2024-05-31 15:32:20'),(7,6,7,'2024-05-31 17:53:00','2024-05-31 15:38:19','2024-05-31 15:50:07'),(9,1,7,'2024-06-08 17:00:00','2024-05-31 15:51:44','2024-05-31 15:51:44'),(10,1,5,'2024-06-04 15:00:00','2024-05-31 18:53:46','2024-06-02 10:36:51'),(11,4,5,'2024-06-02 21:00:00','2024-06-02 15:59:38','2024-06-02 16:00:00'),(12,1,3,'2024-06-02 21:00:00','2024-06-02 18:59:11','2024-06-02 18:59:11'),(13,1,3,'2024-06-02 22:00:00','2024-06-02 19:09:58','2024-06-02 19:09:58'),(14,1,2,'2024-06-03 01:00:00','2024-06-02 21:13:06','2024-06-02 21:13:06'),(15,1,1,'2024-06-03 18:04:00','2024-06-03 15:32:46','2024-06-03 15:32:46'),(16,1,1,'2024-06-03 18:35:00','2024-06-03 15:35:12','2024-06-03 15:35:12'),(17,1,4,'2024-06-03 19:00:00','2024-06-03 15:37:50','2024-06-03 15:37:50'),(18,1,4,'2024-06-03 19:40:00','2024-06-03 15:38:00','2024-06-03 15:38:00'),(19,1,3,'2024-06-04 00:00:00','2024-06-03 15:47:38','2024-06-03 15:47:38'),(20,3,3,'2024-06-04 00:00:00','2024-06-03 16:18:30','2024-06-03 16:18:30'),(21,NULL,NULL,NULL,'2024-06-03 16:36:29','2024-06-03 16:36:29'),(22,NULL,NULL,NULL,'2024-06-03 16:36:29','2024-06-03 16:36:29'),(23,NULL,NULL,NULL,'2024-06-03 16:36:50','2024-06-03 16:36:50'),(24,NULL,NULL,NULL,'2024-06-03 16:36:50','2024-06-03 16:36:50'),(25,3,3,'2024-06-04 00:23:00','2024-06-03 16:38:23','2024-06-03 16:38:23'),(26,3,3,'2024-06-04 00:43:00','2024-06-03 17:38:48','2024-06-03 17:38:48'),(27,3,4,'2024-06-05 15:46:00','2024-06-03 18:08:33','2024-06-03 19:01:34'),(31,3,4,'2024-06-05 14:46:00','2024-06-03 18:46:54','2024-06-03 18:46:54'),(33,3,7,'2022-01-31 17:57:00','2024-06-04 15:58:13','2024-06-04 15:58:13'),(35,1,1,'2024-06-19 22:00:00','2024-06-06 19:07:57','2024-06-06 19:07:57'),(36,1,3,'2024-06-22 22:08:00','2024-06-06 19:08:39','2024-06-06 19:08:39'),(37,1,1,'2024-06-27 18:01:00','2024-06-07 15:21:44','2024-06-07 15:21:53'),(38,1,5,'2024-06-07 22:24:00','2024-06-07 17:24:09','2024-06-07 17:24:09');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `dni` varchar(9) COLLATE utf8mb4_general_ci NOT NULL,
  `contraseña` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Juan','Pérez','juan.perez@example.com','12345678A','password123'),(2,'Ana','López','ana.lopez@example.com','98765432B','password456'),(3,'Pedrito','García','pedro.garcia@example.com','11122233C','password789'),(4,'María','Rodríguez','maria.rodriguez@example.com','44455566D','passwordabc'),(5,'Luis','González','luis.gonzalez@example.com','77788899E','passworddef'),(6,'Editado','Editadooooo','editado@example.com','55555555J','editadopass'),(9,'superadmin','superadmin','superadmin@superadmin.com','00000000A','superadmin'),(10,'Proabdno','Nuevo LOGIN','probando@example.es','77777777D','password'),(12,'aaaaaaaaaaaaaaa','aaaaaaaaaaaaaaa','aaa@example.com','88888888J','aaaaaa');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-08 17:45:32
