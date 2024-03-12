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
  `photoURLs` text NOT NULL,
  `youtubeLink` varchar(255) NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Données de test pour la table `Film`
--
INSERT INTO `Film` (name, releaseDate, description, photoURLs) VALUES
('Inception', '2010-07-16', 'A thief who steals corporate secrets through dream-sharing technology...', 'http://example.com/inception.jpg'),
('The Matrix', '1999-03-31', 'A computer hacker learns from mysterious rebels about the true nature of his reality...', 'http://example.com/matrix.jpg'),
('Interstellar', '2014-11-07', 'A team of explorers travel...', 'http://example.com/interstellar.jpg'),
('The Dark Knight', '2008-07-18', 'When the menace known as the Joker emerges...', 'http://example.com/darkknight.jpg'),
('Fight Club', '1999-10-15', 'An insomniac office worker and a devil-may-care soapmaker...', 'http://example.com/fightclub.jpg'),
('Pulp Fiction', '1994-10-14', 'The lives of two mob hitmen, a boxer...', 'http://example.com/pulpfiction.jpg'),
('Forrest Gump', '1994-07-06', 'The presidencies of Kennedy and Johnson, the Vietnam War...', 'http://example.com/forrestgump.jpg'),
('The Shawshank Redemption', '1994-09-23', 'Two imprisoned men bond over a number of years...', 'http://example.com/shawshank.jpg'),
('Gladiator', '2000-05-05', 'A former Roman General sets out to exact vengeance...', 'http://example.com/gladiator.jpg'),
('The Godfather', '1972-03-24', 'The aging patriarch of an organized crime dynasty...', 'http://example.com/godfather.jpg');
-- Ajoutez d'autres films ici

--
-- Structure pour la table `User`
--
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `imageData` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Données de test pour la table `User`
--
INSERT INTO `User` (username, passwordHash, email) VALUES
('john_doe', 'hashedpassword', 'john.doe@example.com'),
('jane_doe', 'hashedpassword', 'jane.doe@example.com'),
('jane_smith', 'hashed_password', 'jane.smith@example.com'),
('michael_brown', 'hashed_password', 'michael.brown@example.com'),
('sarah_jones', 'hashed_password', 'sarah.jones@example.com'),
('daniel_wilson', 'hashed_password', 'daniel.wilson@example.com'),
('lisa_taylor', 'hashed_password', 'lisa.taylor@example.com'),
('james_davis', 'hashed_password', 'james.davis@example.com'),
('emily_white', 'hashed_password', 'emily.white@example.com'),
('david_martin', 'hashed_password', 'david.martin@example.com'),
('sophia_lopez', 'hashed_password', 'sophia.lopez@example.com');
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
  `filmId` int NOT NULL,
  `imageData` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Photo_ibfk_1` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Données de test pour la table `Photo`
-- Note: Les images sont simulées par des URL, remplacez par des données base64 dans une utilisation réelle.
INSERT INTO `Photo` (filmId, imageData) VALUES
(1, 'http://example.com/photo/inception.jpg'),
(2, 'http://example.com/photo/matrix.jpg'),
(3, 'http://example.com/photo/interstellar.jpg'),
(4, 'http://example.com/photo/darkknight.jpg'),
(5, 'http://example.com/photo/fightclub.jpg'),
(6, 'http://example.com/photo/pulpfiction.jpg');

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
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `CartItem_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `Cart` (`id`),
  CONSTRAINT `CartItem_ibfk_2` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Données de test pour la table `CartItem`

INSERT INTO CartItem (cartId, filmId, quantity) VALUES
(1, 3, 2),
(1, 2, 1),
(1, 1, 2),
(2, 4, 2),
(2, 5, 1),
(2, 1, 2),
(3, 6, 1),
(3, 2, 2),
(4, 3, 1),
(4, 5, 2),
(5, 4, 1),
(6, 6, 2);

--
-- Structure pour la table `Comment`
--
DROP TABLE IF EXISTS `Comment`;
CREATE TABLE `Comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `filmId` int NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `Comment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `Comment_ibfk_2` FOREIGN KEY (`filmId`) REFERENCES `Film` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Données de test pour la table `Comment`
INSERT INTO `Comment` (userId, filmId, text) VALUES
(1, 1, 'Comment 0 for film 1'),
(2, 2, 'Comment 1 for film 2'),
(3, 3, 'Comment 2 for film 3'),
(4, 4, 'Comment 3 for film 4'),
(5, 5, 'Comment 4 for film 5'),
(6, 6, 'Comment 5 for film 6');

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOT
