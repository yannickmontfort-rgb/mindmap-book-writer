# 🐳 Guide de déploiement Portainer - MindMap Book Writer

## ✅ Configuration complétée pour: yannickmontfort-rgb

---

## 📋 Prérequis

Avant de déployer sur Portainer, assurez-vous que :

1. ✅ Le code est poussé sur GitHub : `https://github.com/yannickmontfort-rgb/mindmap-book-writer`
2. ✅ GitHub Actions a construit les images Docker (vérifiez l'onglet "Actions" sur GitHub)
3. ✅ Les packages sont publics sur GitHub Container Registry

---

## 🚀 Déploiement sur Portainer

### Étape 1 : Rendre les images Docker publiques

1. Allez sur votre profil GitHub : `https://github.com/yannickmontfort-rgb?tab=packages`
2. Vous devriez voir deux packages après le build :
   - `mindmap-book-writer-server`
   - `mindmap-book-writer-client`
3. Pour chaque package :
   - Cliquez dessus
   - Allez dans **Package settings** (en bas à droite)
   - Section **Danger Zone** → **Change visibility**
   - Sélectionnez **Public**
   - Confirmez

### Étape 2 : Déployer le stack dans Portainer

1. **Connectez-vous à Portainer** sur votre serveur OMV
2. Sélectionnez votre **environment** (local)
3. Allez dans **Stacks** (menu de gauche)
4. Cliquez sur **➕ Add stack**
5. Configurez le stack :

   **Name** : `mindmap-book-writer`
   
   **Build method** : Choisissez une des options ci-dessous

#### Option A : Upload du fichier (Recommandé)

1. Sélectionnez **Upload**
2. Uploadez le fichier : `Docker/portainer-stack.yml` de ce projet
3. Cliquez sur **Deploy the stack**

#### Option B : Web editor

1. Sélectionnez **Web editor**
2. Copiez-collez le contenu de `Docker/portainer-stack.yml`
3. Cliquez sur **Deploy the stack**

#### Option C : Repository Git (Avancé)

1. Sélectionnez **Repository**
2. **Repository URL** : `https://github.com/yannickmontfort-rgb/mindmap-book-writer`
3. **Repository reference** : `refs/heads/main`
4. **Compose path** : `Docker/portainer-stack.yml`
5. **Authentication** : Aucune (si repo public)
6. ✅ Cochez **Skip TLS verification** si nécessaire
7. Cliquez sur **Deploy the stack**

---

## 🔍 Vérification du déploiement

### 1. Vérifier que les conteneurs démarrent

Dans Portainer → Stacks → mindmap-book-writer :
- ✅ `mindmap-server` : Status = **running** (vert)
- ✅ `mindmap-client` : Status = **running** (vert)

### 2. Vérifier les logs

Si un conteneur ne démarre pas :
1. Cliquez sur le conteneur
2. Allez dans **Logs**
3. Cherchez les erreurs

**Problème courant** : Si l'image n'est pas trouvée
```
Error: manifest for ghcr.io/yannickmontfort-rgb/mindmap-book-writer-server:latest not found
```
➡️ **Solution** : Vérifiez que GitHub Actions a bien construit les images et qu'elles sont publiques

### 3. Tester l'application

Une fois les conteneurs démarrés :

**Backend API** : `http://IP-DE-VOTRE-SERVEUR:5000/api/book`
- Devrait retourner une réponse JSON vide ou avec données

**Frontend Client** : `http://IP-DE-VOTRE-SERVEUR:8080`
- Devrait afficher l'application MindMap Book Writer

---

## 🗂️ Volumes et données

Le volume `mindmap-data` contient toutes vos données (livres, cartes mentales).

### Backup manuel

```bash
# Sur votre serveur OMV
docker run --rm -v mindmap-data:/data -v $(pwd):/backup ubuntu tar czf /backup/mindmap-backup.tar.gz /data
```

### Restauration

```bash
docker run --rm -v mindmap-data:/data -v $(pwd):/backup ubuntu tar xzf /backup/mindmap-backup.tar.gz -C /
```

### Utiliser un dossier OMV spécifique

Si vous voulez stocker les données dans un dossier spécifique d'OMV :

1. Éditez `portainer-stack.yml` dans Portainer
2. Décommentez et modifiez la section `volumes` :

```yaml
volumes:
  mindmap-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /srv/dev-disk-by-uuid-XXXXX/MindMapBooks  # ⬅️ Votre chemin OMV
```

---

## 🔧 Ports utilisés

- **5000** : API Backend (ASP.NET Core)
- **8080** : Frontend Web (Blazor WebAssembly)

Pour changer les ports :
1. Éditez le stack dans Portainer
2. Modifiez la section `ports` :
   ```yaml
   ports:
     - "NOUVEAU_PORT:5000"  # Pour le serveur
     - "NOUVEAU_PORT:80"    # Pour le client
   ```

---

## 🔄 Mise à jour de l'application

Lorsque vous faites des modifications et poussez sur GitHub :

1. GitHub Actions reconstruit automatiquement les images
2. Dans Portainer :
   - Allez dans votre stack `mindmap-book-writer`
   - Cliquez sur **Pull and redeploy**
   - Ou cliquez sur ⟳ **Update the stack**

Portainer téléchargera les nouvelles images et redémarrera les conteneurs.

---

## 🆘 Dépannage

### Les images ne se téléchargent pas

**Vérifiez** :
1. Les images sont bien publiques sur GitHub
2. Le nom d'utilisateur est correct : `yannickmontfort-rgb`
3. Les images existent : 
   - https://github.com/yannickmontfort-rgb/mindmap-book-writer/pkgs/container/mindmap-book-writer-server
   - https://github.com/yannickmontfort-rgb/mindmap-book-writer/pkgs/container/mindmap-book-writer-client

### Le serveur ne démarre pas

```bash
# Vérifier les logs dans Portainer
# Ou en ligne de commande sur OMV :
docker logs mindmap-server
```

### Le client ne peut pas se connecter au serveur

Vérifiez dans les logs du client qu'il pointe bien vers le bon serveur.
Le client Blazor WebAssembly se connecte directement depuis le navigateur.

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans Portainer
2. Consultez la documentation GitHub Actions
3. Vérifiez que les images sont bien publiques

---

## 🎉 C'est tout !

Votre application est maintenant déployée et accessible sur votre réseau local.
Vous pouvez accéder à l'interface web depuis n'importe quel appareil sur votre réseau à l'adresse :

**http://IP-SERVEUR-OMV:8080**

Bon développement ! 📚✨
