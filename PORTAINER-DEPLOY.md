# 🐳 Déploiement sur Portainer (OMV)

Guide complet pour déployer MindMap Book Writer sur OpenMediaVault avec Portainer.

## 📋 Prérequis

- ✅ OpenMediaVault installé et configuré
- ✅ Docker installé sur OMV
- ✅ Portainer déjà déployé
- ✅ Accès réseau à votre serveur OMV

## 🚀 Méthode 1 : Déploiement depuis GitHub (Recommandé)

### Étape 1 : Pousser le code sur GitHub

```bash
# Sur votre PC, dans le dossier du projet
cd "c:\Users\yjpm\Nextcloud\Projets informatiques et électroniques\Developpement\Logiciel écriture"

# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit - MindMap Book Writer multi-platform"

# Créer un repo sur GitHub (via l'interface web)
# Puis ajouter l'origine
git remote add origin https://github.com/VOTRE-USERNAME/mindmap-book-writer.git

# Pousser sur GitHub
git push -u origin main
```

### Étape 2 : Activer GitHub Actions

Les images Docker seront automatiquement construites et publiées sur GitHub Container Registry (ghcr.io) à chaque push.

1. Aller dans **Settings** → **Actions** → **General**
2. Activer "Allow all actions"
3. Sauvegarder

GitHub Actions va construire les images automatiquement.

### Étape 3 : Rendre les images publiques

1. Aller sur votre profil GitHub → **Packages**
2. Cliquer sur `mindmap-book-writer-server`
3. **Package settings** → **Change visibility** → **Public**
4. Répéter pour `mindmap-book-writer-client`

### Étape 4 : Déployer dans Portainer

1. **Ouvrir Portainer** : `http://votre-omv-ip:9000`

2. **Créer une Stack** :
   - Menu **Stacks** → **➕ Add stack**
   - Nom : `mindmap-book-writer`

3. **Configuration Git repository** :
   - Choisir **Repository**
   - URL : `https://github.com/VOTRE-USERNAME/mindmap-book-writer`
   - Reference : `refs/heads/main`
   - Compose path : `Docker/portainer-stack.yml`

4. **Variables d'environnement** :
   ```
   GITHUB_USERNAME=votre-username
   ```

5. **Cliquer sur** : ✅ **Deploy the stack**

6. **Accéder à l'application** :
   - Interface web : `http://votre-omv-ip:8080`
   - API backend : `http://votre-omv-ip:5000`

---

## 🔧 Méthode 2 : Upload manuel (Alternative)

Si vous ne voulez pas utiliser GitHub :

### Étape 1 : Construire les images localement

```powershell
# Sur votre PC Windows
cd "c:\Users\yjpm\Nextcloud\Projets informatiques et électroniques\Developpement\Logiciel écriture\Docker"

# Construire les images
docker-compose build

# Exporter les images
docker save -o mindmap-server.tar mindmap-book-writer-server:latest
docker save -o mindmap-client.tar mindmap-book-writer-client:latest
```

### Étape 2 : Transférer vers OMV

```bash
# Depuis votre PC
scp mindmap-server.tar root@votre-omv-ip:/tmp/
scp mindmap-client.tar root@votre-omv-ip:/tmp/
```

### Étape 3 : Importer dans OMV

```bash
# Se connecter en SSH à OMV
ssh root@votre-omv-ip

# Importer les images
docker load -i /tmp/mindmap-server.tar
docker load -i /tmp/mindmap-client.tar

# Nettoyer
rm /tmp/mindmap-*.tar
```

### Étape 4 : Déployer dans Portainer

1. Dans Portainer : **Stacks** → **Add stack**
2. Nom : `mindmap-book-writer`
3. **Web editor** → Copier le contenu de `portainer-stack.yml` en remplaçant :
   ```yaml
   image: ghcr.io/${GITHUB_USERNAME}/mindmap-book-writer-server:latest
   # par
   image: mindmap-book-writer-server:latest
   ```
4. Deploy

---

## 💾 Configuration du stockage OMV

### Option A : Volume Docker standard (Par défaut)

Les données sont stockées dans un volume Docker géré automatiquement.

**Localisation** : `/var/lib/docker/volumes/mindmap-data/_data`

### Option B : Bind mount sur dossier OMV (Recommandé)

Pour stocker les livres sur un dossier partagé OMV :

1. **Créer un dossier partagé dans OMV** :
   - OMV Web UI → **Stockage** → **Dossiers partagés**
   - Créer : `MindMapBooks`
   - Chemin exemple : `/srv/dev-disk-by-uuid-xxx/MindMapBooks`

2. **Modifier `portainer-stack.yml`** :
   ```yaml
   volumes:
     mindmap-data:
       driver: local
       driver_opts:
         type: none
         o: bind
         device: /srv/dev-disk-by-uuid-xxx/MindMapBooks/data
   ```

3. **Créer le dossier** (en SSH sur OMV) :
   ```bash
   mkdir -p /srv/dev-disk-by-uuid-xxx/MindMapBooks/data
   chmod 777 /srv/dev-disk-by-uuid-xxx/MindMapBooks/data
   ```

---

## 🌐 Accès réseau

### Accès local (LAN)

- **Interface web** : `http://192.168.x.x:8080`
- **API** : `http://192.168.x.x:5000`

### Accès externe (Internet)

**Méthode 1 : Nginx Proxy Manager (Recommandé)**

Si vous avez NPM sur OMV :

1. Créer un **Proxy Host** :
   - Domain : `books.votredomaine.com`
   - Forward Hostname/IP : `mindmap-client`
   - Forward Port : `80`
   - ✅ Websockets Support
   - ✅ SSL (Let's Encrypt)

2. Créer un deuxième pour l'API :
   - Domain : `books-api.votredomaine.com`
   - Forward to : `mindmap-server:5000`

**Méthode 2 : Port forwarding direct**

Sur votre box/routeur :
- Port externe `8080` → OMV IP:8080
- Port externe `5000` → OMV IP:5000

---

## 🔍 Gestion dans Portainer

### Démarrer/Arrêter

- Portainer → **Stacks** → `mindmap-book-writer`
- Cliquer sur **Stop** ou **Start**

### Voir les logs

- **Containers** → Cliquer sur un conteneur
- Onglet **Logs**
- Activer **Auto-refresh**

### Mettre à jour

Si vous avez modifié le code :

1. Push sur GitHub (les images se rebuilderont automatiquement)
2. Dans Portainer : **Stacks** → `mindmap-book-writer`
3. Cliquer sur **Pull and redeploy**

### Redémarrer après crash

Les conteneurs ont `restart: unless-stopped`, ils redémarrent automatiquement.

Pour forcer un redémarrage :
- **Containers** → Sélectionner les conteneurs
- Cliquer sur **Restart**

---

## 📊 Monitoring

### Health checks

Les conteneurs ont des health checks intégrés :

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5000/api/book"]
  interval: 30s
  timeout: 10s
  retries: 3
```

Statut visible dans Portainer : **Containers** → Colonne **State**

### Logs en temps réel

```bash
# Via SSH sur OMV
docker logs -f mindmap-server
docker logs -f mindmap-client
```

### Ressources utilisées

Portainer → **Containers** → Vue d'ensemble :
- CPU %
- Mémoire utilisée
- Réseau I/O
- Disque I/O

---

## 🔧 Dépannage

### Conteneurs ne démarrent pas

```bash
# SSH sur OMV
docker ps -a  # Voir l'état
docker logs mindmap-server  # Voir les erreurs
docker logs mindmap-client
```

### Erreur "Cannot pull image"

Les images doivent être publiques sur GitHub :
- GitHub → Packages → Package settings → Change visibility → Public

Ou utiliser un token :
```bash
# Dans Portainer : Registries → Add registry
# Type: GitHub Container Registry
# Username: votre-username
# Access token: (créer un PAT sur GitHub avec read:packages)
```

### Port déjà utilisé

Modifier les ports dans `portainer-stack.yml` :
```yaml
ports:
  - "8081:80"  # Au lieu de 8080
```

### Problème de permissions sur le volume

```bash
# SSH sur OMV
chmod -R 777 /chemin/vers/MindMapBooks/data
chown -R 1000:1000 /chemin/vers/MindMapBooks/data
```

### Reset complet

```bash
# Dans Portainer ou SSH
docker-compose down -v  # Supprime tout y compris les volumes
# Puis redéployer
```

---

## 🔒 Sécurité

### Recommandations production

1. **Activer HTTPS** via Nginx Proxy Manager
2. **Ajouter authentification** (Basic Auth via NPM ou dans l'app)
3. **Limiter l'accès** :
   ```yaml
   # Dans portainer-stack.yml
   ports:
     - "127.0.0.1:8080:80"  # Seulement localhost
   ```
4. **Sauvegarder le volume** régulièrement
5. **Mettre à jour** les images régulièrement

### Sauvegarde automatique

Créer un script de backup :

```bash
#!/bin/bash
# /root/backup-mindmap.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/srv/dev-disk-by-uuid-xxx/Backups/MindMap"

# Sauvegarder le volume Docker
docker run --rm -v mindmap-data:/data -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/mindmap-data-$DATE.tar.gz -C /data .

# Garder seulement les 7 dernières sauvegardes
cd $BACKUP_DIR
ls -t mindmap-data-*.tar.gz | tail -n +8 | xargs -r rm

echo "Backup completed: mindmap-data-$DATE.tar.gz"
```

Ajouter au cron :
```bash
crontab -e
# Ajouter :
0 3 * * * /root/backup-mindmap.sh
```

---

## 📈 Performances

### Ressources recommandées

- **CPU** : 1 core minimum, 2 recommandés
- **RAM** : 512 MB minimum, 1 GB recommandé
- **Disque** : Dépend du nombre de livres (environ 10-50 MB par livre)

### Optimisations

Si votre OMV est limité en ressources :

```yaml
services:
  server:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 256M
        reservations:
          memory: 128M
```

---

## ✅ Checklist de déploiement

- [ ] GitHub repo créé et code pushé
- [ ] GitHub Actions activées
- [ ] Images Docker construites (vérifier dans GitHub Packages)
- [ ] Images rendues publiques
- [ ] Stack créée dans Portainer
- [ ] Variables d'environnement configurées
- [ ] Conteneurs démarrés (état : Running)
- [ ] Health checks verts
- [ ] Application accessible sur `http://omv-ip:8080`
- [ ] Test de création d'un livre
- [ ] Sauvegarde testée et fichiers visibles dans le volume
- [ ] (Optionnel) Reverse proxy configuré
- [ ] (Optionnel) SSL activé
- [ ] (Optionnel) Backup automatique configuré

---

## 🆘 Support

En cas de problème :

1. **Vérifier les logs** dans Portainer
2. **Vérifier les health checks**
3. **Tester l'accès direct** : `curl http://localhost:5000/api/book`
4. **Vérifier le réseau Docker** : `docker network ls`
5. **Redéployer** la stack en cas de doute

---

**Bon déploiement ! 🚀**
