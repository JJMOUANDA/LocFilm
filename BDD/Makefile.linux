.PHONY: backup_mariadb
.PHONY: backup_mongodb

include .env.test

GIT_USER_NAME := $(shell git config user.name 2>/dev/null || echo "?")
LATEST_BACKUP_MONGODB := $(shell ls -t mongodb/backup/*.json 2>/dev/null | head -n1)
LATEST_BACKUP_MARIADB := $(shell ls -t mariadb/backup/*.sql 2>/dev/null | head -n1)

ifeq ($(LATEST_BACKUP_MONGODB),)
    LATEST_BACKUP_MONGODB :=
else
    LATEST_BACKUP_MONGODB := backup/$(shell basename $(LATEST_BACKUP_MONGODB))
endif

# Créer les services mariadb, mongodb et phpmyadmin
create_all: create_mariadb create_mongodb create_phpmyadmin

# Démarrer les services mariadb, mongodb et phpmyadmin
start_all: start_mariadb start_mongodb start_phpmyadmin

# Arrêter les services mariadb, mongodb et phpmyadmin
stop_all: stop_mariadb stop_mongodb stop_phpmyadmin

# Redémarrer les services mariadb, mongodb et phpmyadmin
restart_all: restart_mariadb restart_mongodb restart_phpmyadmin

# Supprimer les services mariadb, mongodb et phpmyadmin
remove_all: remove_mariadb remove_mongodb remove_phpmyadmin

################# MARIADB #################

# Créer le service mariadb
create_mariadb:
	@docker compose -p gestion_association up -d mariadb

# Démarrer le service mariadb
start_mariadb:
	@docker compose -p gestion_association start mariadb

# Arrêter le service mariadb
stop_mariadb:
	@docker compose -p gestion_association stop mariadb

# Redémarrer le service mariadb
restart_mariadb: stop_mariadb start_mariadb

# Supprimer le service mariadb
remove_mariadb:
	@docker compose -p gestion_association down mariadb --volumes --remove-orphans

# Se connecter au shell du service mariadb
shell_mariadb:
	@docker exec -it mariadb_gestassoc /bin/bash

# Créer une backup de la base de données mariadb
backup_mariadb:
	@docker exec -it mariadb_gestassoc /bin/bash -c "mysqldump -u root -p$(MYSQL_ROOT_PASSWORD) $(MYSQL_DATABASE) > /backup/backup_$(GIT_USER_NAME)_$$(date +'%Y-%m-%d_%H-%M-%S').sql"

# Restaurer une backup de la base de données mariadb (fournir le chemin du fichier)
# exemple : make restore_mariadb f=mariadb/backup/backup_user_2021-08-25_15-00-00.sql
restore_mariadb:
	@docker exec -i mariadb_gestassoc /bin/bash -c "mysql -u root -pdev gestion_association" < $(f)

# Restaurer la dernière backup de la base de données mariadb
restore_latest_mariadb:
	@echo "Restoring from backup $(LATEST_BACKUP_MARIADB)"; \
	make restore_mariadb f=$(LATEST_BACKUP_MARIADB)

################# MONGODB #################

# Créer le service mongodb
create_mongodb:
	@docker compose -p gestion_association up -d mongodb

# Démarrer le service mongodb
start_mongodb:
	@docker compose -p gestion_association start mongodb

# Arrêter le service mongodb
stop_mongodb:
	@docker compose -p gestion_association stop mongodb

# Redémarrer le service mongodb
restart_mongodb: stop_mongodb start_mongodb

# Supprimer le service mongodb
remove_mongodb:
	@docker compose -p gestion_association down mongodb --volumes --remove-orphans

# Se connecter au shell du service mongodb
shell_mongodb:
	@docker exec -it mongodb_gestassoc /bin/bash

# Créer une backup de la collection mongodb
backup_mongodb:
	@docker exec mongodb_gestassoc mongoexport --host localhost --port 27017 --db $(MONGO_DATABASE) --collection $(MONGO_COLLECTION) --out /backup/backup_$(GIT_USER_NAME)_$$(date +'%Y-%m-%d_%H-%M-%S').json --jsonArray

# Restaurer une backup de la collection mongodb (fournir le chemin du fichier)
# exemple : make restore_mongodb f=mongodb/backup/backup_user_2021-08-25_15-00-00.json
restore_mongodb:
	@docker exec mongodb_gestassoc mongosh --quiet --host localhost --port 27017 --eval "db.getSiblingDB('$(MONGO_DATABASE)').dropDatabase()"
	@docker exec mongodb_gestassoc mongoimport --host localhost --port 27017 --db $(MONGO_DATABASE) --collection $(MONGO_COLLECTION) --type json --file $(f) --jsonArray

# Restaurer la dernière backup de la collection mongodb
restore_latest_mongodb:
	@echo "Restoring from backup $(LATEST_BACKUP_MONGODB)"; \
	make restore_mongodb f=$(LATEST_BACKUP_MONGODB)

################# PHPMYADMIN #################

# Créer le service phpmyadmin
create_phpmyadmin:
	@docker compose -p gestion_association up -d phpmyadmin

# Démarrer le service phpmyadmin
start_phpmyadmin:
	@docker compose -p gestion_association start phpmyadmin

# Arrêter le service phpmyadmin
stop_phpmyadmin:
	@docker compose -p gestion_association stop phpmyadmin

# Redémarrer le service phpmyadmin
restart_phpmyadmin: stop_phpmyadmin start_phpmyadmin

# Supprimer le service phpmyadmin
remove_phpmyadmin:
	@docker compose -p gestion_association down phpmyadmin --volumes --remove-orphans
