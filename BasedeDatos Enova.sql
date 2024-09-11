-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gestion_nomina_enova
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administradores` (
  `Administrador_ID` int NOT NULL,
  `Usuario` varchar(20) NOT NULL,
  `Contrasena` varchar(20) NOT NULL,
  PRIMARY KEY (`Administrador_ID`),
  CONSTRAINT `administradores_ibfk_1` FOREIGN KEY (`Administrador_ID`) REFERENCES `empleados` (`Empleado_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
INSERT INTO `administradores` VALUES (1,'1005710145','1005710145');
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `Cargo_ID` int NOT NULL AUTO_INCREMENT,
  `Nombre_Cargo` varchar(50) NOT NULL,
  PRIMARY KEY (`Cargo_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES (1,'Jefe'),(2,'Diseñadora Gráfica'),(3,'Técnico'),(4,'Asesora Comercial'),(5,'Talento Humano'),(6,'Asistente Comercial'),(7,'Control Interno'),(8,'Coordinador Administrativo'),(9,'Aux. Administrativo'),(10,'Líder Comercial');
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `Empleado_ID` int NOT NULL AUTO_INCREMENT,
  `Sede_ID` int NOT NULL,
  `Cargo_ID` int NOT NULL,
  `Cedula` varchar(20) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Nombre_Banco` varchar(50) NOT NULL,
  `Numero_Cuenta_Bancaria` varchar(50) NOT NULL,
  `Honorarios_Mes` decimal(10,2) NOT NULL,
  PRIMARY KEY (`Empleado_ID`),
  UNIQUE KEY `Cedula` (`Cedula`),
  KEY `Sede_ID` (`Sede_ID`),
  KEY `Cargo_ID` (`Cargo_ID`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`Sede_ID`) REFERENCES `sedes` (`Sede_ID`),
  CONSTRAINT `empleados_ibfk_2` FOREIGN KEY (`Cargo_ID`) REFERENCES `cargos` (`Cargo_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,1,1,'1005710145','Alejandro Luis','Berrio Orozco','Nequi','3022554116',150000.00);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nomina`
--

DROP TABLE IF EXISTS `nomina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nomina` (
  `Nomina_ID` int NOT NULL AUTO_INCREMENT,
  `Empleado_ID` int NOT NULL,
  `Honorarios_Quincena` decimal(10,2) NOT NULL,
  `Honorarios_Dia` decimal(10,2) NOT NULL,
  `Total_Dias_Liquidar` int NOT NULL,
  `Dia_Dominical` int DEFAULT '0',
  `Clases_Instructores` int DEFAULT '0',
  `Total_Inscripciones_Liquidar` int DEFAULT '0',
  `Honorarios_Periodo_Liquidacion` decimal(10,2) NOT NULL,
  `Valor_Total_Dias_Dominicales` decimal(10,2) DEFAULT '0.00',
  `Valor_Total_Clases_Instructores` decimal(10,2) DEFAULT '0.00',
  `Comisiones_Inscripcion_Estudiantes` decimal(10,2) DEFAULT '0.00',
  `Total_Pagar` decimal(10,2) NOT NULL,
  `Pagos_Adicionales_Pendientes` decimal(10,2) DEFAULT '0.00',
  `Saldo_Pendiente` decimal(10,2) DEFAULT '0.00',
  `Observaciones` text,
  `deducciones` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`Nomina_ID`),
  KEY `Empleado_ID` (`Empleado_ID`),
  CONSTRAINT `nomina_ibfk_1` FOREIGN KEY (`Empleado_ID`) REFERENCES `empleados` (`Empleado_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nomina`
--

LOCK TABLES `nomina` WRITE;
/*!40000 ALTER TABLE `nomina` DISABLE KEYS */;
/*!40000 ALTER TABLE `nomina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sedes`
--

DROP TABLE IF EXISTS `sedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sedes` (
  `Sede_ID` int NOT NULL AUTO_INCREMENT,
  `Nombre_Sede` varchar(50) NOT NULL,
  PRIMARY KEY (`Sede_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sedes`
--

LOCK TABLES `sedes` WRITE;
/*!40000 ALTER TABLE `sedes` DISABLE KEYS */;
INSERT INTO `sedes` VALUES (1,'OFICINA CENTRAL'),(2,'TEAM 1'),(3,'TEAM 3'),(4,'TEAM 4'),(5,'SINCELEJO'),(6,'MONTERIA'),(7,'APARTADO'),(8,'CAUCASIA');
/*!40000 ALTER TABLE `sedes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-11 17:54:56
