-- MariaDB dump 10.19  Distrib 10.5.23-MariaDB, for debian-linux-gnu (aarch64)
--
-- Host: localhost    Database: gestion_association
-- ------------------------------------------------------
-- Server version	10.5.23-MariaDB-1:10.5.23+maria~ubu2004

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `evenement`
--

DROP TABLE IF EXISTS `evenement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evenement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `date_heure_debut` datetime NOT NULL,
  `date_heure_fin` datetime NOT NULL,
  `max_participants` int(11) NOT NULL,
  `lieu_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lieuId` (`lieu_id`),
  CONSTRAINT `evenement_ibfk_1` FOREIGN KEY (`lieu_id`) REFERENCES `lieu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evenement`
--

LOCK TABLES `evenement` WRITE;
/*!40000 ALTER TABLE `evenement` DISABLE KEYS */;
INSERT INTO `evenement` VALUES (1,'Tournoi de tennis','2024-04-15 10:00:00','2024-04-15 18:00:00',30,2),(2,'Concert en plein air','2024-05-20 17:00:00','2024-05-20 22:00:00',150,3),(3,'Conférence sur l\'environnement','2024-06-10 09:00:00','2024-06-10 12:00:00',50,1),(4,'Exposition artistique','2024-07-05 11:00:00','2024-07-05 16:00:00',80,4),(5,'Salon du livre','2024-08-20 10:00:00','2024-08-20 18:00:00',120,5),(6,'Festival de musique','2024-09-15 14:00:00','2024-09-15 23:00:00',200,6),(7,'Séminaire professionnel','2024-10-10 09:00:00','2024-10-11 17:00:00',100,2),(8,'Match de football','2024-11-05 15:00:00','2024-11-05 17:00:00',50,3),(9,'Défilé de mode','2024-12-20 19:00:00','2024-12-20 22:00:00',70,1);
/*!40000 ALTER TABLE `evenement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscription`
--

DROP TABLE IF EXISTS `inscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `membre_id` int(11) NOT NULL,
  `evenement_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `membreId` (`membre_id`),
  KEY `evenementId` (`evenement_id`),
  CONSTRAINT `inscription_ibfk_1` FOREIGN KEY (`membre_id`) REFERENCES `membre` (`id`),
  CONSTRAINT `inscription_ibfk_2` FOREIGN KEY (`evenement_id`) REFERENCES `evenement` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscription`
--

LOCK TABLES `inscription` WRITE;
/*!40000 ALTER TABLE `inscription` DISABLE KEYS */;
INSERT INTO `inscription` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,5),(6,6,6),(7,1,7),(8,2,8),(9,3,9),(10,4,1),(11,5,2),(12,6,3);
/*!40000 ALTER TABLE `inscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lieu`
--

DROP TABLE IF EXISTS `lieu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lieu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `capacite_accueil` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lieu`
--

LOCK TABLES `lieu` WRITE;
/*!40000 ALTER TABLE `lieu` DISABLE KEYS */;
INSERT INTO `lieu` VALUES (1,'Salle des fêtes','10 Rue de la Liberté, 75002 Paris, France',100),(2,'Centre sportif','20 Avenue des Sports, 69003 Lyon, France',50),(3,'Parc municipal','30 Boulevard des Arbres, 13009 Marseille, France',200),(4,'Centre culturel','40 Rue de la Culture, 31000 Toulouse, France',80),(5,'Palais des congrès','50 Avenue des Congrès, 33000 Bordeaux, France',150),(6,'Espace événementiel','60 Rue de l\'Événement, 67000 Strasbourg, France',120);
/*!40000 ALTER TABLE `lieu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membre`
--

DROP TABLE IF EXISTS `membre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `date_naissance` date NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `mot_de_passe` char(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membre`
--

LOCK TABLES `membre` WRITE;
/*!40000 ALTER TABLE `membre` DISABLE KEYS */;
INSERT INTO `membre` VALUES (1,'Dupont','Jean','1990-05-15','123 Rue de la Paix, 75001 Paris, France','jean.dupont@email.com','motdepasse1'),(2,'Durand','Marie','1985-08-20','456 Avenue des Fleurs, 69002 Lyon, France','marie.durand@email.com','motdepasse2'),(3,'Lefebvre','Pierre','1988-12-10','789 Boulevard du Soleil, 13008 Marseille, France','pierre.lefebvre@email.com','motdepasse3'),(4,'Martin','Sophie','1993-03-25','567 Rue des Écoles, 31000 Toulouse, France','sophie.martin@email.com','motdepasse4'),(5,'Dubois','Thomas','1982-11-08','890 Avenue des Champs, 33000 Bordeaux, France','thomas.dubois@email.com','motdepasse5'),(6,'Bernard','Camille','1989-06-30','432 Rue Principale, 67000 Strasbourg, France','camille.bernard@email.com','motdepasse6');
/*!40000 ALTER TABLE `membre` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-05 15:52:39
