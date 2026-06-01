# 📤 Pousser le projet sur GitHub

Guide rapide pour mettre votre projet sur GitHub avec actions automatiques.

## 🚀 Étapes rapides

### 1. Créer le repository sur GitHub

1. Aller sur [github.com](https://github.com) et se connecter
2. Cliquer sur **➕** (en haut à droite) → **New repository**
3. **Repository name** : `mindmap-book-writer`
4. **Description** : `Logiciel d'écriture de livre multi-plateforme basé sur une carte mentale (Windows/Linux/Docker)`
5. ✅ **Public** (pour Portainer gratuit)
6. ❌ Ne pas initialiser avec README (on a déjà les fichiers)
7. Cliquer sur **Create repository**

### 2. Pousser le code depuis votre PC

```powershell
# Ouvrir PowerShell dans le dossier du projet
cd "c:\Users\yjpm\Nextcloud\Projets informatiques et électroniques\Developpement\Logiciel écriture"

# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Vérifier les fichiers ajoutés
git status

# Premier commit
git commit -m "🎉 Initial commit - MindMap Book Writer multi-platform

- Version Windows (WPF + Material Design)
- Version Linux (Avalonia UI)
- Version Docker (Blazor + ASP.NET Core)
- Modèles partagés
- Documentation complète"

# Ajouter votre repository GitHub (remplacer VOTRE-USERNAME)
git remote add origin https://github.com/VOTRE-USERNAME/mindmap-book-writer.git

# Vérifier la branche par défaut
git branch -M main

# Pousser sur GitHub
git push -u origin main
```

### 3. Activer GitHub Actions (Build automatique des images Docker)

1. Sur GitHub, aller dans votre repo → **Settings**
2. Menu **Actions** → **General**
3. **Actions permissions** : Sélectionner "Allow all actions and reusable workflows"
4. **Workflow permissions** : Sélectionner "Read and write permissions"
5. ✅ Cocher "Allow GitHub Actions to create and approve pull requests"
6. **Save**

### 4. Déclencher le premier build

```powershell
# Créer un petit changement pour déclencher le build
echo "" >> README.md
git add README.md
git commit -m "🚀 Trigger GitHub Actions build"
git push
```

Ou cliquez sur **Actions** → **Build and Push Docker Images** → **Run workflow**

### 5. Vérifier le build

1. Aller dans **Actions** sur GitHub
2. Vous devriez voir le workflow "Build and Push Docker Images" en cours
3. Attendre la fin (environ 5-10 minutes)
4. ✅ Les images seront publiées dans **Packages**

### 6. Rendre les images publiques

1. Sur votre profil GitHub → **Packages**
2. Cliquer sur `mindmap-book-writer-server`
3. **Package settings** (en bas à droite)
4. **Danger Zone** → **Change visibility**
5. Sélectionner **Public**
6. Taper le nom du package pour confirmer
7. **Répéter pour** `mindmap-book-writer-client`

---

## 📦 Images Docker disponibles

Une fois le build terminé, vos images seront disponibles sur :

```
ghcr.io/VOTRE-USERNAME/mindmap-book-writer-server:latest
ghcr.io/VOTRE-USERNAME/mindmap-book-writer-client:latest
```

---

## 🔄 Workflow automatique

À chaque push sur `main`, GitHub Actions va :
1. ✅ Compiler le projet
2. ✅ Construire les images Docker
3. ✅ Les pousser sur GitHub Container Registry (ghcr.io)
4. ✅ Les tagger avec `latest`

---

## 🏷️ Créer une release

Pour créer une version officielle :

```powershell
# Tag la version
git tag -a v1.0.0 -m "🎉 Version 1.0.0 - Initial release"
git push origin v1.0.0
```

Les images seront aussi taguées `v1.0.0` automatiquement.

---

## 📝 Mettre à jour le projet

Après des modifications :

```powershell
# Ajouter les fichiers modifiés
git add .

# Commit avec un message descriptif
git commit -m "✨ Ajout de nouvelles fonctionnalités"

# Pousser
git push
```

GitHub Actions rebuildera automatiquement les images.

---

## 🔐 Token d'accès (si repo privé)

Si votre repo est privé, Portainer aura besoin d'un token :

1. GitHub → **Settings** (votre profil) → **Developer settings**
2. **Personal access tokens** → **Tokens (classic)**
3. **Generate new token**
4. Nom : `Portainer Access`
5. ✅ Cocher : `read:packages`
6. **Generate token**
7. **Copier le token** (ne sera plus visible)

Dans Portainer :
- **Registries** → **Add registry**
- Type : **GitHub Container Registry**
- Username : votre-username
- Access token : coller le token

---

## 📂 Structure du repo GitHub

```
mindmap-book-writer/
├── .github/
│   └── workflows/
│       └── docker-build.yml      # ← Build automatique
├── Docker/
│   ├── portainer-stack.yml       # ← Pour Portainer
│   ├── docker-compose.yml        # ← Pour dev local
│   └── ...
├── Windows/
├── Linux/
├── Shared/
├── README.md
└── PORTAINER-DEPLOY.md           # ← Guide déploiement
```

---

## ✅ Vérification

Après le setup, vérifier :

- [ ] Repo créé sur GitHub
- [ ] Code poussé (`git push` réussi)
- [ ] GitHub Actions activées
- [ ] Premier workflow exécuté avec succès
- [ ] Images Docker visibles dans **Packages**
- [ ] Images publiques (ou token créé si privé)
- [ ] URL des images notées pour Portainer

---

## 🎯 Prêt pour Portainer !

Vous pouvez maintenant suivre le guide [PORTAINER-DEPLOY.md](PORTAINER-DEPLOY.md) pour déployer sur votre OMV.

L'URL de votre repo sera :
```
https://github.com/VOTRE-USERNAME/mindmap-book-writer
```

---

## 🆘 Dépannage

### Erreur "Authentication failed"

```powershell
# Configurer Git avec vos identifiants
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"

# Utiliser un token GitHub si demandé (au lieu du mot de passe)
# Créer un token : GitHub → Settings → Developer settings → Personal access tokens
```

### Workflow ne se lance pas

- Vérifier que GitHub Actions est activé dans Settings
- Vérifier le fichier `.github/workflows/docker-build.yml`
- Pousser un nouveau commit pour déclencher

### Images ne se construisent pas

- Aller dans Actions → Voir les logs d'erreur
- Vérifier que les chemins dans `docker-build.yml` sont corrects
- Vérifier que `Dockerfile` est présent dans `Docker/`

---

**C'est parti ! 🚀**
