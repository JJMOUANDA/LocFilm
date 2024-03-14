-- MariaDB dump pour la base de données location_film
-- Structure et données de test pour les tables Film, User, et Rent

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
-- Structure pour la table `Film`
--
DROP TABLE IF EXISTS `Film`;
CREATE TABLE `Film` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `releaseDate` date NOT NULL,
  `description` text NOT NULL,
  `youtubeLink` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `state` varchar(1) NOT NULL, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Données de test pour la table `Film`
--
INSERT INTO `Film` (`name`, `releaseDate`, `description`, `youtubeLink`, `price`, `state`) VALUES
('Inception', '2010-07-16', 'Un voleur, qui s\'infiltre dans les rêves, est chargé de planter une idée dans l\'esprit d\'un C.E.O.', 'https://youtube.com/fakeLinkInception', 20, 'A'),
('Interstellar', '2014-11-07', 'Une équipe d\'explorateurs voyage à travers un trou de ver dans l\'espace dans une tentative de sauver l\'humanité.', 'https://youtube.com/fakeLinkInterstellar', 25, 'D'),
('Le Parrain', '1972-03-24', 'La vie vieillissante du patriarche d\'une dynastie du crime organisé passe le flambeau à son fils réticent.', 'https://youtube.com/fakeLinkGodfather', 30, 'A'),
('The Dark Knight', '2008-07-18', 'Batman doit accepter l\'un des plus grands tests psychologiques et physiques de sa capacité à combattre l\'injustice.', 'https://youtube.com/fakeLinkDarkKnight', 15, 'D'),
('Forrest Gump', '1994-07-06', 'La vie d\'un homme simple et son impact incroyable sur le monde autour de lui.', 'https://youtube.com/fakeLinkForrestGump', 18, 'A'),
('Pulp Fiction', '1994-10-14', 'Les vies de deux hommes de main de la mafia, un boxeur, un gangster et sa femme, et un couple de dinner se mêlent dans quatre histoires de violence et de rédemption.', 'https://youtube.com/fakeLinkPulpFiction', 22, 'A'),
('La Liste de Schindler', '1993-12-15', 'L\'histoire d\'Oskar Schindler, un industriel allemand qui a sauvé la vie de milliers de Juifs pendant l\'Holocauste.', 'https://youtube.com/fakeLinkSchindlersList', 28, 'D'),
('Le Seigneur des anneaux : La Communauté de l\'anneau', '2001-12-19', 'Un Hobbit timide de la Comté et huit compagnons se lancent dans un voyage pour détruire l\'anneau puissant et sauver la Terre du Milieu.', 'https://youtube.com/fakeLinkLordOfTheRings', 25, 'A'),
('Matrix', '1999-03-31', 'Un programmeur informatique découvre la vraie nature de la réalité et son rôle dans la guerre contre ses contrôleurs.', 'https://youtube.com/fakeLinkMatrix', 20, 'D'),
('Avatar', '2009-12-18', 'Un marine paraplégique est envoyé sur la lune Pandora où il devient partie prenante du conflit local.', 'https://youtube.com/fakeLinkAvatar', 22, 'A'),
('Titanic', '1997-12-19', 'Un artiste pauvre et une riche héritière tombent amoureux à bord du malheureux Titanic.', 'https://youtube.com/fakeLinkTitanic', 18, 'D');

-- Ajoutez d'autres films ici

--
-- Structure pour la table `User`
--
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `role` varchar(1) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `imageData` text NOT NULL,
  `state` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Données de test pour la table `User`
--
INSERT INTO `User` (`username`, `role`, `passwordHash`, `email`, `imageData`, `state`) VALUES
('admin_Pierre', 'A', 'hash_here', 'admin01@example.com', 'image_data_here', 'A'),
('user_Julie', 'U', 'hash_here', 'user01@example.com', 'image_data_here', 'A'),
('user_Amelie', 'U', 'hash_here', 'user02@example.com', 'image_data_here', 'D'),
('admin_Marc', 'A', 'hash_here', 'admin02@example.com', 'image_data_here', 'D'),
('user_Lucas', 'U', 'hash_here', 'user03@example.com', 'image_data_here', 'A'),
('user_Sophie', 'U', 'hash_here', 'user04@example.com', 'image_data_here', 'A'),
('user_Maxime', 'U', 'hash_here', 'user05@example.com', 'image_data_here', 'D'),
('admin_Laura', 'A', 'hash_here', 'admin03@example.com', 'image_data_here', 'A'),
('user_Emma', 'U', 'hash_here', 'user06@example.com', 'image_data_here', 'A'),
('user_Hugo', 'U', 'hash_here', 'user07@example.com', 'image_data_here', 'D'),
('admin_Charlotte', 'A', 'hash_here', 'admin04@example.com', 'image_data_here', 'A');
-- Ajoutez d'autres utilisateurs ici

--
-- Structure pour la table `Rent`
--
DROP TABLE IF EXISTS `Rent`;
CREATE TABLE `Rent` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `filmId` int NOT NULL,
  `rentalDate` datetime NOT NULL,
  `returnDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `filmId` (`filmId`),
  CONSTRAINT `Rent_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `Rent_ibfk_2` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Données de test pour la table `Rent`
--
INSERT INTO `Rent` (userId, filmId, rentalDate, returnDate) VALUES
(1, 1, '2024-03-10 14:00:00', '2024-03-17 14:00:00'),
(2, 2, '2024-03-12 10:00:00', '2024-03-19 10:00:00'),
(3, 2, '2024-03-03', '2024-03-10'),
(4, 1, '2024-03-04', '2024-03-11'),
(5, 4, '2024-03-05', '2024-03-12'),
(6, 6, '2024-03-06', '2024-03-13');

--
-- Structure pour la table `Photo`
--
DROP TABLE IF EXISTS `Photo`;
CREATE TABLE `Photo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filmId` int,
  `commentId` int,
  `imageData` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Photo_ibfk_1` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`)
  CONSTRAINT `Photo_ibfk_2` FOREIGN KEY (`commentId`) REFERENCES `Comment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Données de test pour la table `Photo`
-- Note: Les images sont simulées par des URL, remplacez par des données base64 dans une utilisation réelle.
INSERT INTO `Photo` (`filmId`, `commentId`, `imageData`) VALUES
(1, NULL, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'),
(NULL, 1, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'),
(2, NULL, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAA...'),
(NULL, 2, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAA...'),
(3, NULL, 'data:image/png;base64,IVBORw0KGgoAAAANSUhEUgAAA...'),
(NULL, 3, 'data:image/png;base64,IVBORw0KGgoAAAANSUhEUgAAA...');


--
-- Structure pour la table `Cart`
--
DROP TABLE IF EXISTS `Cart`;
CREATE TABLE `Cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Données de test pour la table `Cart`

INSERT INTO Cart (userId) VALUES
(1),
(2),
(3),
(4),
(5),
(6);

--
-- Structure pour la table `CartItem`
--
DROP TABLE IF EXISTS `CartItem`;
CREATE TABLE `CartItem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cartId` int NOT NULL,
  `filmId` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `CartItem_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `Cart` (`id`),
  CONSTRAINT `CartItem_ibfk_2` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Données de test pour la table `CartItem`

INSERT INTO CartItem (cartId, filmId) VALUES
(1, 3),
(1, 2),
(1, 1),
(2, 4),
(2, 5),
(2, 1),
(3, 6),
(3, 2),
(4, 3),
(4, 5),
(5, 4),
(6, 6);

--
-- Structure pour la table `Comment`
--
DROP TABLE IF EXISTS `Comment`;
CREATE TABLE `Comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `filmId` int NOT NULL,
  `text` text NOT NULL,
  `date`datetime NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `Comment_ibfk_2` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Données de test pour la table `Comment`
INSERT INTO `Comment` (`userId`, `filmId`, `text`, `date`) VALUES
(1, 1, 'Un film absolument incroyable, avec un scénario qui vous garde en haleine du début à la fin.', '2023-03-14 10:00:00'),
(2, 2, 'Interstellar offre une aventure visuelle et émotionnelle hors du commun. À voir absolument.', '2023-03-14 11:30:00'),
(3, 3, 'Le Parrain est un classique intemporel qui dépeint la vie de la mafia avec élégance et profondeur.', '2023-03-15 09:45:00'),
(1, 4, 'The Dark Knight révolutionne le genre des films de super-héros. Heath Ledger est phénoménal.', '2023-03-15 14:20:00'),
(2, 5, 'Forrest Gump est une œuvre émouvante et inspirante qui montre comment un homme simple traverse des moments historiques.', '2023-03-16 08:15:00'),
(3, 6, 'Pulp Fiction est un chef-d\'œuvre de Tarantino. Un scénario brillant, une réalisation stylée et une bande-son inoubliable.', '2023-03-16 16:40:00');


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOT
