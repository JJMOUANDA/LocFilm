-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : jeu. 14 mars 2024 à 12:53
-- Version du serveur : 11.2.2-MariaDB
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `location_film`
--

-- --------------------------------------------------------

--
-- Structure de la table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
CREATE TABLE IF NOT EXISTS `Cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Cart_ibfk_1` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Cart`
--

INSERT INTO `Cart` (`id`, `userId`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);

-- --------------------------------------------------------

--
-- Structure de la table `Cartitem`
--

DROP TABLE IF EXISTS `Cartitem`;
CREATE TABLE IF NOT EXISTS `Cartitem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cartId` int(11) NOT NULL,
  `filmId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `CartItem_ibfk_1` (`cartId`),
  KEY `CartItem_ibfk_2` (`filmId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Cartitem`
--

INSERT INTO `Cartitem` (`id`, `cartId`, `filmId`) VALUES
(1, 1, 3),
(2, 1, 2),
(3, 1, 1),
(4, 2, 4),
(5, 2, 5),
(6, 2, 1),
(7, 3, 6),
(8, 3, 2),
(9, 4, 3),
(10, 4, 5),
(11, 5, 4),
(12, 6, 6);

-- --------------------------------------------------------

--
-- Structure de la table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
CREATE TABLE IF NOT EXISTS `Comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `filmId` int(11) NOT NULL,
  `text` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Comment_ibfk_1` (`userId`),
  KEY `Comment_ibfk_2` (`filmId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Comment`
--

INSERT INTO `Comment` (`id`, `userId`, `filmId`, `text`, `date`) VALUES
(1, 1, 1, 'Un film absolument incroyable, avec un scénario qui vous garde en haleine du début à la fin.', '2023-03-14 10:00:00'),
(2, 2, 2, 'Interstellar offre une aventure visuelle et émotionnelle hors du commun. À voir absolument.', '2023-03-14 11:30:00'),
(3, 3, 3, 'Le Parrain est un classique intemporel qui dépeint la vie de la mafia avec élégance et profondeur.', '2023-03-15 09:45:00'),
(4, 1, 4, 'The Dark Knight révolutionne le genre des films de super-héros. Heath Ledger est phénoménal.', '2023-03-15 14:20:00'),
(5, 2, 5, 'Forrest Gump est une œuvre émouvante et inspirante qui montre Comment un homme simple traverse des moments historiques.', '2023-03-16 08:15:00'),
(6, 3, 6, 'Pulp Fiction est un chef-d\'œuvre de Tarantino. Un scénario brillant, une réalisation stylée et une bande-son inoubliable.', '2023-03-16 16:40:00');

-- --------------------------------------------------------

--
-- Structure de la table `Film`
--

DROP TABLE IF EXISTS `Film`;
CREATE TABLE IF NOT EXISTS `Film` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `releaseDate` date NOT NULL,
  `description` text NOT NULL,
  `youtubeLink` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `state` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `film`
--

INSERT INTO `Film` (`id`, `name`, `releaseDate`, `description`, `youtubeLink`, `price`, `state`) VALUES
(1, 'Inception', '2010-07-16', 'Un voleur, qui s\'infiltre dans les rêves, est chargé de planter une idée dans l\'esprit d\'un C.E.O.', 'https://youtube.com/fakeLinkInception', 20, 'A'),
(2, 'Interstellar', '2014-11-07', 'Une équipe d\'explorateurs voyage à travers un trou de ver dans l\'espace dans une tentative de sauver l\'humanité.', 'https://youtube.com/fakeLinkInterstellar', 25, 'D'),
(3, 'Le Parrain', '1972-03-24', 'La vie vieillissante du patriarche d\'une dynastie du crime organisé passe le flambeau à son fils réticent.', 'https://youtube.com/fakeLinkGodfather', 30, 'A'),
(4, 'The Dark Knight', '2008-07-18', 'Batman doit accepter l\'un des plus grands tests psychologiques et physiques de sa capacité à combattre l\'injustice.', 'https://youtube.com/fakeLinkDarkKnight', 15, 'D'),
(5, 'Forrest Gump', '1994-07-06', 'La vie d\'un homme simple et son impact incroyable sur le monde autour de lui.', 'https://youtube.com/fakeLinkForrestGump', 18, 'A'),
(6, 'Pulp Fiction', '1994-10-14', 'Les vies de deux hommes de main de la mafia, un boxeur, un gangster et sa femme, et un couple de dinner se mêlent dans quatre histoires de violence et de rédemption.', 'https://youtube.com/fakeLinkPulpFiction', 22, 'A'),
(7, 'La Liste de Schindler', '1993-12-15', 'L\'histoire d\'Oskar Schindler, un industriel allemand qui a sauvé la vie de milliers de Juifs pendant l\'Holocauste.', 'https://youtube.com/fakeLinkSchindlersList', 28, 'D'),
(8, 'Le Seigneur des anneaux : La Communauté de l\'anneau', '2001-12-19', 'Un Hobbit timide de la Comté et huit compagnons se lancent dans un voyage pour détruire l\'anneau puissant et sauver la Terre du Milieu.', 'https://youtube.com/fakeLinkLordOfTheRings', 25, 'A'),
(9, 'Matrix', '1999-03-31', 'Un programmeur informatique découvre la vraie nature de la réalité et son rôle dans la guerre contre ses contrôleurs.', 'https://youtube.com/fakeLinkMatrix', 20, 'D'),
(10, 'Avatar', '2009-12-18', 'Un marine paraplégique est envoyé sur la lune Pandora où il devient partie prenante du conflit local.', 'https://youtube.com/fakeLinkAvatar', 22, 'A'),
(11, 'Titanic', '1997-12-19', 'Un artiste pauvre et une riche héritière tombent amoureux à bord du malheureux Titanic.', 'https://youtube.com/fakeLinkTitanic', 18, 'D');

-- --------------------------------------------------------

--
-- Structure de la table `photo`
--

DROP TABLE IF EXISTS `Photo`;
CREATE TABLE IF NOT EXISTS `Photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filmId` int(11) DEFAULT NULL,
  `CommentId` int(11) DEFAULT NULL,
  `imageData` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Photo_ibfk_1` (`filmId`),
  KEY `Photo_ibfk_2` (`CommentId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `photo`
--

INSERT INTO `Photo` (`id`, `filmId`, `commentId`, `imageData`) VALUES
(1, 1, NULL, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'),
(2, NULL, 1, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...'),
(3, 2, NULL, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAA...'),
(4, NULL, 2, 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAA...'),
(5, 3, NULL, 'data:image/png;base64,IVBORw0KGgoAAAANSUhEUgAAA...'),
(6, NULL, 3, 'data:image/png;base64,IVBORw0KGgoAAAANSUhEUgAAA...');

-- --------------------------------------------------------

--
-- Structure de la table `rent`
--

DROP TABLE IF EXISTS `Rent`;
CREATE TABLE IF NOT EXISTS `Rent` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `filmId` int(11) NOT NULL,
  `rentalDate` datetime NOT NULL,
  `returnDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `filmId` (`filmId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rent`
--

INSERT INTO `Rent` (`id`, `userId`, `filmId`, `rentalDate`, `returnDate`) VALUES
(1, 1, 1, '2024-03-10 14:00:00', '2024-03-17 14:00:00'),
(2, 2, 2, '2024-03-12 10:00:00', '2024-03-19 10:00:00'),
(3, 3, 2, '2024-03-03 00:00:00', '2024-03-10 00:00:00'),
(4, 4, 1, '2024-03-04 00:00:00', '2024-03-11 00:00:00'),
(5, 5, 4, '2024-03-05 00:00:00', '2024-03-12 00:00:00'),
(6, 6, 6, '2024-03-06 00:00:00', '2024-03-13 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `role` varchar(1) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `imageData` text,
  `state` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`id`, `username`, `role`, `passwordHash`, `email`, `imageData`, `state`) VALUES
(1, 'admin_Pierre', 'A', 'hash_here', 'admin01@example.com', 'image_data_here', 'A'),
(2, 'User_Julie', 'U', 'hash_here', 'User01@example.com', 'image_data_here', 'A'),
(3, 'User_Amelie', 'U', 'hash_here', 'User02@example.com', 'image_data_here', 'D'),
(4, 'admin_Marc', 'A', 'hash_here', 'admin02@example.com', 'image_data_here', 'D'),
(5, 'User_Lucas', 'U', 'hash_here', 'User03@example.com', 'image_data_here', 'A'),
(6, 'User_Sophie', 'U', 'hash_here', 'User04@example.com', 'image_data_here', 'A'),
(7, 'User_Maxime', 'U', 'hash_here', 'User05@example.com', 'image_data_here', 'D'),
(8, 'admin_Laura', 'A', 'hash_here', 'admin03@example.com', 'image_data_here', 'A'),
(9, 'User_Emma', 'U', 'hash_here', 'User06@example.com', 'image_data_here', 'A'),
(10, 'User_Hugo', 'U', 'hash_here', 'User07@example.com', 'image_data_here', 'D'),
(11, 'admin_Charlotte', 'A', 'hash_here', 'admin04@example.com', 'image_data_here', 'A');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`);

--
-- Contraintes pour la table `Cartitem`
--
ALTER TABLE `Cartitem`
  ADD CONSTRAINT `CartItem_ibfk_1` FOREIGN KEY (`CartId`) REFERENCES `Cart` (`id`),
  ADD CONSTRAINT `CartItem_ibfk_2` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`);

--
-- Contraintes pour la table `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `Comment_ibfk_2` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`);

--
-- Contraintes pour la table `photo`
--
ALTER TABLE `Photo`
  ADD CONSTRAINT `Photo_ibfk_1` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`),
  ADD CONSTRAINT `Photo_ibfk_2` FOREIGN KEY (`commentId`) REFERENCES `Comment` (`id`);

--
-- Contraintes pour la table `rent`
--
ALTER TABLE `Rent`
  ADD CONSTRAINT `Rent_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  ADD CONSTRAINT `Rent_ibfk_2` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
