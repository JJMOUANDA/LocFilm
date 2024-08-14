# Gestion des bases de données

## MariaDB

### Installation

#### Création du conteneur MariaDB
```bash
make create_mariadb
```
#### Import de la dernière sauvegarde de la base de données
```bash
make restore_latest_mariadb
```
### Utilisation
#### Démarage du conteneur MariaDB
```bash
make start_mariadb
```

#### Arrêt du conteneur MariaDB
```bash
make stop_mariadb
```

#### Sauvegarde de la base de données
```bash
make backup_mariadb
```

#### Import d'une sauvegarde **spécifique** de la base de données
```bash
make restore_mariadb f=mariadb/backup/backup.sql
```

#### Import de la dernière sauvegarde de la base de données
```bash
make restore_mariadb
```

#### Entrer dans le conteneur MariaDB
```bash
make shell_mariadb
```

#### Redémarrage du conteneur MariaDB
```bash
make restart_mariadb
```

#### Suppression du conteneur MariaDB
```bash
make remove_mariadb
```

## MongoDB

### Installation

#### Création du conteneur MongoDB
```bash
make create_mongodb
```
#### Import de la dernière sauvegarde de la base de données
```bash
make restore_latest_mongodb
```

### Utilisation

#### Démarage du conteneur MongoDB
```bash
make start_mongodb
```

#### Arrêt du conteneur MongoDB
```bash
make stop_mongodb
```

#### Sauvegarde de la base de données
```bash
make backup_mongodb
```

#### Import d'une sauvegarde **spécifique** de la base de données
```bash
make restore_mongodb f=mongodb/backup/backup.json
```

#### Import de la dernière sauvegarde de la base de données
```bash
make restore_latest_mongodb
```

#### Entrer dans le conteneur MongoDB
```bash
make shell_mongodb
```

#### Redémarrage du conteneur MongoDB
```bash
make restart_mongodb
```

#### Suppression du conteneur MongoDB
```bash
make remove_mongodb
```

## PhpMyAdmin

### Installation

#### Création du conteneur PhpMyAdmin
```bash
make create_phpmyadmin
```

### Utilisation

#### Démarage du conteneur PhpMyAdmin
```bash
make start_phpmyadmin
```

#### Arrêt du conteneur PhpMyAdmin
```bash
make stop_phpmyadmin
```

#### Redémarrage du conteneur PhpMyAdmin
```bash
make restart_phpmyadmin
```

#### Suppression du conteneur PhpMyAdmin
```bash
make remove_phpmyadmin
```