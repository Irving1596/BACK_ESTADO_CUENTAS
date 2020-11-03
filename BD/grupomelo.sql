-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: 127.0.0.1    Database: grupomelo
-- ------------------------------------------------------
-- Server version	8.0.13-commercial

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
-- Table structure for table `CLIENTES`
--

DROP TABLE IF EXISTS `CLIENTES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CLIENTES` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NUM_CUENTA` int(14) NOT NULL,
  `NOMBRE` varchar(45) NOT NULL,
  `APELLIDO` varchar(45) NOT NULL,
  `SEXO` char(1) NOT NULL,
  `CORREO` varchar(55) NOT NULL,
  `CELULAR` int(8) unsigned DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `NUM_CUENTA_UNIQUE` (`NUM_CUENTA`),
  UNIQUE KEY `CORREO_UNIQUE` (`CORREO`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CLIENTES`
--

LOCK TABLES `CLIENTES` WRITE;
/*!40000 ALTER TABLE `CLIENTES` DISABLE KEYS */;
INSERT INTO `CLIENTES` VALUES (3,1234567890,'Irving','Sanchez','M','irving.sanchez@byondit.net',66557789,'2020-10-23 20:18:06','2020-10-29 05:33:59'),(4,1111122222,'Harry','Alvarado','M','harry@gmail.com',NULL,'2020-10-23 20:23:52','2020-10-24 04:22:03'),(5,1011121314,'Luis','Varela','M','luis.varela@byonit.net',NULL,'2020-10-23 20:24:52','2020-10-23 20:24:52');
/*!40000 ALTER TABLE `CLIENTES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `C_FACTURA`
--

DROP TABLE IF EXISTS `C_FACTURA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `C_FACTURA` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_CSERVICIOS` int(11) NOT NULL,
  `FECHA` date NOT NULL,
  `MONTO_PAGAR` decimal(6,2) NOT NULL,
  `PAGO_REALIZADO` tinyint(4) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `C_FACTURA_ibfk_1` (`ID_CSERVICIOS`),
  CONSTRAINT `C_FACTURA_ibfk_1` FOREIGN KEY (`ID_CSERVICIOS`) REFERENCES `C_SERVICIOS` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_FACTURA`
--

LOCK TABLES `C_FACTURA` WRITE;
/*!40000 ALTER TABLE `C_FACTURA` DISABLE KEYS */;
INSERT INTO `C_FACTURA` VALUES (3,3,'2020-10-29',10.56,0,'2020-10-29 01:23:55','2020-10-29 01:23:55'),(4,7,'2020-10-29',19.45,0,'2020-10-29 01:23:55','2020-10-29 01:23:55'),(5,10,'2020-10-29',19.45,0,'2020-10-29 01:23:55','2020-10-29 01:23:55'),(6,9,'2020-10-29',9.97,0,'2020-10-29 16:55:17','2020-10-29 16:55:17');
/*!40000 ALTER TABLE `C_FACTURA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `C_SERVICIOS`
--

DROP TABLE IF EXISTS `C_SERVICIOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `C_SERVICIOS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_CLIENTE` int(11) NOT NULL,
  `ID_SERVICIO` varchar(10) NOT NULL,
  `ID_PROPIEDAD` int(11) NOT NULL,
  `ESTADO` varchar(10) NOT NULL DEFAULT 'ACTIVO',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `FK_IDCLIENTE_idx` (`ID_CLIENTE`),
  KEY `FK_IDSERVICIO_idx` (`ID_SERVICIO`),
  KEY `FK_IDPROPIEDAD_idx` (`ID_PROPIEDAD`),
  CONSTRAINT `FK_IDCLIENTE` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `CLIENTES` (`num_cuenta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_IDPROPIEDAD` FOREIGN KEY (`ID_PROPIEDAD`) REFERENCES `PROPIEDADES` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_IDSERVICIO` FOREIGN KEY (`ID_SERVICIO`) REFERENCES `SERVICIOS` (`cod_servicio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `C_SERVICIOS`
--

LOCK TABLES `C_SERVICIOS` WRITE;
/*!40000 ALTER TABLE `C_SERVICIOS` DISABLE KEYS */;
INSERT INTO `C_SERVICIOS` VALUES (3,1234567890,'A01',4,'ACTIVO','2020-10-29 01:03:49','2020-10-29 01:03:49'),(7,1234567890,'L01',4,'ACTIVO','2020-10-29 01:14:24','2020-10-29 01:14:24'),(8,1234567890,'A01',5,'ACTIVO','2020-10-29 01:14:24','2020-10-29 01:14:24'),(9,1234567890,'J01',5,'ACTIVO','2020-10-29 01:14:24','2020-10-29 01:14:24'),(10,1111122222,'L01',6,'ACTIVO','2020-10-29 01:14:24','2020-10-29 01:14:24');
/*!40000 ALTER TABLE `C_SERVICIOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LOTES`
--

DROP TABLE IF EXISTS `LOTES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LOTES` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_URBANIZACIONES` int(11) NOT NULL,
  `NUM_LOTE` int(11) NOT NULL,
  `NOMBRE` varchar(55) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `LOTES_ibfk_1` (`ID_URBANIZACIONES`),
  CONSTRAINT `LOTES_ibfk_1` FOREIGN KEY (`ID_URBANIZACIONES`) REFERENCES `URBANIZACIONES` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LOTES`
--

LOCK TABLES `LOTES` WRITE;
/*!40000 ALTER TABLE `LOTES` DISABLE KEYS */;
INSERT INTO `LOTES` VALUES (6,1,1,'LOT1BUENA_VISTA','2020-10-29 00:46:58','2020-10-29 00:46:58'),(7,1,2,'LOT2BUENA_VISTA','2020-10-29 00:46:58','2020-10-29 00:46:58'),(8,1,3,'LOT3BUENA_VISTA','2020-10-29 00:46:58','2020-10-29 00:46:58'),(12,2,1,'LOT1EL_PINAL','2020-10-29 00:49:23','2020-10-29 00:49:23'),(13,3,1,'LOT1CENTINELA','2020-10-29 00:49:23','2020-10-29 00:49:23'),(14,8,1,'LOT1BUENA_VISTAIII','2020-10-29 00:49:23','2020-10-29 00:49:23'),(15,8,2,'LOT2BUENA_VISTAIII','2020-10-29 00:49:23','2020-10-29 00:49:23');
/*!40000 ALTER TABLE `LOTES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PROPIEDADES`
--

DROP TABLE IF EXISTS `PROPIEDADES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PROPIEDADES` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_CLIENTE` int(11) NOT NULL,
  `ID_URBANIZACION` int(11) NOT NULL,
  `ID_LOTE` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL,
  `updatedAt` timestamp NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `FK_IDCLIENTE_idx` (`ID_CLIENTE`),
  KEY `FK_IDURBANIZACION_idx` (`ID_URBANIZACION`),
  KEY `FK_NUMLOTE_idx` (`ID_LOTE`),
  CONSTRAINT `FK_CUENTACLIENTE` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `CLIENTES` (`num_cuenta`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_IDURBANIZACION` FOREIGN KEY (`ID_URBANIZACION`) REFERENCES `URBANIZACIONES` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_NUMLOTE` FOREIGN KEY (`ID_LOTE`) REFERENCES `LOTES` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PROPIEDADES`
--

LOCK TABLES `PROPIEDADES` WRITE;
/*!40000 ALTER TABLE `PROPIEDADES` DISABLE KEYS */;
INSERT INTO `PROPIEDADES` VALUES (4,1234567890,1,6,'2020-10-29 00:55:13','2020-10-29 00:55:13'),(5,1234567890,2,12,'2020-10-29 00:57:18','2020-10-29 00:57:18'),(6,1111122222,1,7,'2020-10-29 00:57:18','2020-10-29 00:57:18');
/*!40000 ALTER TABLE `PROPIEDADES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SERVICIOS`
--

DROP TABLE IF EXISTS `SERVICIOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SERVICIOS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `COD_SERVICIO` varchar(10) NOT NULL,
  `NOMBRE` varchar(45) NOT NULL,
  `DESCRIPCION` varchar(205) DEFAULT NULL,
  `TARIFA_MENSUAL` decimal(6,2) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `COD_SERVICIO_UNIQUE` (`COD_SERVICIO`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SERVICIOS`
--

LOCK TABLES `SERVICIOS` WRITE;
/*!40000 ALTER TABLE `SERVICIOS` DISABLE KEYS */;
INSERT INTO `SERVICIOS` VALUES (1,'A01','Agua','Mensualidad del suministro de agua',10.56),(2,'L01','Luz','Mensualidad del suministro de luz',19.45),(3,'J01','Jardineria','Mensualidad por Jardineria',9.97);
/*!40000 ALTER TABLE `SERVICIOS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `URBANIZACIONES`
--

DROP TABLE IF EXISTS `URBANIZACIONES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `URBANIZACIONES` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NOMBRE` varchar(70) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `URBANIZACIONES`
--

LOCK TABLES `URBANIZACIONES` WRITE;
/*!40000 ALTER TABLE `URBANIZACIONES` DISABLE KEYS */;
INSERT INTO `URBANIZACIONES` VALUES (1,'Buena Vista'),(2,'El Pinal'),(3,'Centinela '),(4,'Granada '),(5,'Fortin'),(6,'Navarra'),(7,'Santo Domingo'),(8,'Buena Vista III');
/*!40000 ALTER TABLE `URBANIZACIONES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIOS`
--

DROP TABLE IF EXISTS `USUARIOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USUARIOS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID_CLIENTE` int(14) NOT NULL,
  `USUARIO` varchar(45) NOT NULL,
  `PASSWORD` varchar(60) NOT NULL,
  `ACTIVO` int(4) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USUARIOS_ibfk_1` (`ID_CLIENTE`),
  UNIQUE KEY `USUARIO_UNIQUE` (`USUARIO`),
  CONSTRAINT `USUARIOS_ibfk_1` FOREIGN KEY (`ID_CLIENTE`) REFERENCES `CLIENTES` (`num_cuenta`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIOS`
--

LOCK TABLES `USUARIOS` WRITE;
/*!40000 ALTER TABLE `USUARIOS` DISABLE KEYS */;
INSERT INTO `USUARIOS` VALUES (1,1111122222,'PANCHO1','$2b$10$Gw1m9CzCEbuEXkKvalUwOeVGqdzFpWim60rcbdelO5Sgjkk6Mcpba',1,'2020-10-24 04:22:03','2020-10-24 04:22:03'),(2,1234567890,'irving15','$2b$10$VVZnjZ7jlcjsw.MhN595geJDddAbiPMUSIccK6sUJj2llyvS6n.wW',1,'2020-10-29 05:33:59','2020-10-29 05:33:59');
/*!40000 ALTER TABLE `USUARIOS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-29 13:30:17
