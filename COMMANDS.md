# 🚀 Commandes Rapides - MindMap Book Writer

## 📦 Compilation et Test

### Windows
```powershell
# Restaurer les dépendances
cd Windows
dotnet restore

# Compiler
dotnet build -c Release

# Exécuter
dotnet run

# Publier (self-contained)
dotnet publish -c Release -r win-x64 --self-contained -o publish/win-x64

# Créer l'installateur avec Inno Setup
iscc Setup.iss
```

### Linux
```bash
# Restaurer les dépendances
cd Linux
dotnet restore

# Compiler
dotnet build -c Release

# Exécuter
dotnet run

# Publier (self-contained)
dotnet publish -c Release -r linux-x64 --self-contained -o publish/linux-x64

# Créer un package .deb
# Voir Linux/README.md pour les détails complets
```

### Docker
```bash
# Démarrage rapide
cd Docker
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter
docker-compose down

# Arrêter et supprimer les données
docker-compose down -v

# Rebuild après modifications
docker-compose up --build
```

## 🔧 Développement

### Restaurer toutes les dépendances
```bash
# À la racine du projet
dotnet restore
```

### Compiler toute la solution
```bash
dotnet build MindMapBookWriter.sln
```

### Nettoyer les builds
```bash
dotnet clean
```

### Vérifier les erreurs
```bash
dotnet build --no-incremental
```

## 🐞 Débogage

### Windows avec Visual Studio
```bash
# Ouvrir la solution
start MindMapBookWriter.sln
```

### Avec VS Code
```bash
# Ouvrir le workspace
code "Logiciel écriture.code-workspace"
```

### Logs Docker
```bash
cd Docker
docker-compose logs server
docker-compose logs client
```

## 📊 Structure et vérifications

### Lister les projets
```bash
dotnet sln list
```

### Vérifier les références
```bash
# Windows
cd Windows
dotnet list reference

# Linux
cd Linux
dotnet list reference

# Docker Server
cd Docker/Server
dotnet list reference

# Docker Client
cd Docker/Client
dotnet list reference
```

## 🎯 Tests manuels

### Test Windows
1. `cd Windows && dotnet run`
2. Cliquer sur "📁 Sélectionner dossier"
3. Créer un nouveau dossier de test
4. Ajouter un chapitre
5. Ajouter une scène
6. Éditer la scène en Markdown
7. Sauvegarder
8. Vérifier que les fichiers sont créés

### Test Linux
(Même procédure que Windows)

### Test Docker
1. `cd Docker && docker-compose up -d`
2. Ouvrir http://localhost:5001
3. Créer un chapitre
4. Ajouter une scène
5. Éditer la scène
6. Sauvegarder
7. Vérifier la persistance en rechargeant la page

## 🔍 Dépannage

### .NET SDK non trouvé
```bash
# Vérifier l'installation
dotnet --version

# Doit afficher : 8.0.x
# Sinon, installer depuis : https://dotnet.microsoft.com/download/dotnet/8.0
```

### Erreur de restauration NuGet
```bash
# Nettoyer le cache
dotnet nuget locals all --clear

# Restaurer à nouveau
dotnet restore
```

### Docker ne démarre pas
```bash
# Vérifier que Docker est lancé
docker --version

# Vérifier l'état des conteneurs
docker ps -a

# Nettoyer les conteneurs orphelins
docker-compose down --remove-orphans

# Reconstruire les images
docker-compose build --no-cache
```

### Erreurs de compilation
```bash
# Nettoyer et reconstruire
dotnet clean
dotnet restore
dotnet build --no-incremental
```

## 📦 Publication

### Windows - Installer avec Inno Setup
```powershell
cd Windows
dotnet publish -c Release -r win-x64 --self-contained
iscc Setup.iss
# L'installateur sera dans Windows/Output/
```

### Linux - Package .deb
```bash
cd Linux
dotnet publish -c Release -r linux-x64 --self-contained
# Suivre les étapes dans Linux/README.md pour créer le .deb
```

### Docker - Push vers registry
```bash
# Tag les images
docker tag mindmap-book-writer-server:latest yourregistry/mindmap-server:1.0.0
docker tag mindmap-book-writer-client:latest yourregistry/mindmap-client:1.0.0

# Push
docker push yourregistry/mindmap-server:1.0.0
docker push yourregistry/mindmap-client:1.0.0
```

## 🎉 Raccourcis utiles

```bash
# Tout compiler d'un coup
dotnet build

# Tout nettoyer d'un coup
dotnet clean

# Restaurer toutes les dépendances
dotnet restore

# Lancer Windows
cd Windows && dotnet run

# Lancer Linux
cd Linux && dotnet run

# Lancer Docker
cd Docker && docker-compose up
```

## 📖 Documentation

- [README principal](README.md)
- [Status du projet](STATUS.md)
- [Windows README](Windows/README.md)
- [Linux README](Linux/README.md)
- [Docker README](Docker/README.md)
