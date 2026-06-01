# 🚀 Installation et démarrage - MindMap Book Writer

## ✨ Application .NET WPF créée avec succès !

Votre logiciel d'écriture basé sur une carte mentale est maintenant prêt en version **Windows native (.NET)**.

---

## 📋 Prérequis nécessaires

### Pour utiliser l'application (utilisateurs finaux)

✅ **Windows 10/11** (64-bit)  
✅ **.NET 8.0 Desktop Runtime**

👉 Téléchargez le runtime ici : https://dotnet.microsoft.com/download/dotnet/8.0  
Choisissez : **"Desktop Runtime"** (x64)

### Pour compiler l'application (développeurs)

Au choix :

**Option 1 : Visual Studio 2022** (RECOMMANDÉ)
- Téléchargez : https://visualstudio.microsoft.com/fr/
- Version Community (gratuite) suffisante
- Lors de l'installation, cochez : **"Développement Desktop .NET"**

**Option 2 : .NET 8.0 SDK**
- Téléchargez : https://dotnet.microsoft.com/download/dotnet/8.0
- Choisissez : **"SDK x64"**

---

## 🎯 Démarrage rapide

### Étape 1 : Installer les prérequis

1. **Téléchargez et installez** .NET 8.0 SDK ou Visual Studio 2022
2. **Redémarrez** votre ordinateur (important !)
3. **Vérifiez l'installation** :
   ```powershell
   dotnet --version
   ```
   Devrait afficher : `8.0.x` ou supérieur

### Étape 2 : Compiler l'application

#### Avec Visual Studio

1. **Double-cliquez** sur `MindMapBookWriter.csproj`
2. **Attendez** que Visual Studio restaure les packages
3. **Appuyez sur F5** pour compiler et lancer

#### Avec la ligne de commande

```powershell
# Naviguer vers le dossier
cd "c:\Users\yjpm\Nextcloud\Projets informatiques et électroniques\Developpement\Logiciel écriture"

# Restaurer les packages NuGet
dotnet restore

# Compiler
dotnet build --configuration Release

# Lancer l'application
dotnet run
```

### Étape 3 : Utiliser l'application

1. **L'application démarre** automatiquement
2. **Cliquez sur "📁 Sélectionner dossier"**
3. **Créez un dossier** pour votre livre (ex: "MonRoman")
4. **Cliquez sur "➕ Nouveau Chapitre"**
5. **Commencez à écrire !**

---

## 📦 Créer une version distribuable

### Publier l'application

```powershell
# Version autonome (inclut .NET Runtime) - RECOMMANDÉ
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true

# Version dépendante du framework (plus petite, nécessite .NET installé)
dotnet publish -c Release -r win-x64 --self-contained false
```

L'exécutable sera dans :  
`bin\Release\net8.0-windows\win-x64\publish\MindMapBookWriter.exe`

### Créer un installateur professionnel

1. **Installez Inno Setup** : https://jrsoftware.org/isdl.php

2. **Publiez d'abord** :
   ```powershell
   dotnet publish -c Release -r win-x64 --self-contained true
   ```

3. **Ouvrez** `Setup.iss` avec Inno Setup Compiler

4. **Cliquez sur** "Build" → "Compile" (ou F9)

5. **L'installateur** sera créé dans `.\Installer\MindMapBookWriter-Setup-1.0.0.exe`

---

## 🎨 Aperçu de l'application

### Interface principale

```
┌─────────────────────────────────────────────────────┐
│ 📚 MindMap Book Writer │ Livre: [________] │ Actions│
├──────────┬──────────────────────────────────────────┤
│          │ ┌────────────────────────────────────┐   │
│ Structure│ │    🗺️ Carte Mentale  ✍️ Éditeur   │   │
│          │ └────────────────────────────────────┘   │
│ 📚 Ch.1  │                                          │
│  📝 Sc.1 │        📖 Mon Livre                      │
│  📝 Sc.2 │              │                           │
│          │    ┌─────────┴─────────┐                │
│ 📚 Ch.2  │    │                   │                │
│  📝 Sc.1 │  📚 Chapitre 1    📚 Chapitre 2          │
│          │    │                   │                │
│          │  📝 Scène 1         📝 Scène 1           │
│          │  📝 Scène 2                              │
└──────────┴──────────────────────────────────────────┘
```

### Fonctionnalités clés

✅ **Carte mentale interactive**
- Visualisation de toute la structure
- Drag & drop pour réorganiser
- Codes couleur par type

✅ **Éditeur Markdown**
- Syntaxe Markdown complète
- Sauvegarde automatique
- Affichage du chapitre et scène

✅ **Barre latérale**
- Navigation rapide
- Ajout/suppression facile
- Vue hiérarchique

---

## 📊 Structure du projet

```
MindMapBookWriter/
├── Models/                      # Modèles de données
│   └── BookModels.cs
├── ViewModels/                  # Logique métier (MVVM)
│   └── MainViewModel.cs
├── Controls/                    # Contrôles personnalisés
│   └── MindMapControl.cs
├── Services/                    # Services (fichiers, etc.)
│   └── FileService.cs
├── Converters/                  # Convertisseurs XAML
│   └── BoolConverters.cs
├── MainWindow.xaml              # Interface principale
├── MainWindow.xaml.cs
├── App.xaml                     # Configuration app
├── App.xaml.cs
├── MindMapBookWriter.csproj     # Projet .NET
├── Setup.iss                    # Script installateur
├── LICENSE.txt                  # Licence MIT
├── README-NET.md                # Documentation complète
├── GUIDE-DEMARRAGE-NET.md       # Guide de démarrage
└── MIGRATION-NOTES.md           # Notes de migration
```

---

## 🔍 Vérification de l'installation

### Test 1 : .NET SDK

```powershell
dotnet --version
```

✅ **Devrait afficher** : `8.0.x`  
❌ **Si erreur** : Installez .NET 8.0 SDK

### Test 2 : Compilation

```powershell
dotnet build
```

✅ **Devrait afficher** : `Build succeeded. 0 Warning(s), 0 Error(s)`  
❌ **Si erreurs** : Voir section "Résolution de problèmes"

### Test 3 : Exécution

```powershell
dotnet run
```

✅ **Devrait** : Ouvrir l'application dans une fenêtre  
❌ **Si erreur** : Vérifier les dépendances

---

## 🛠️ Résolution de problèmes

### "dotnet : Le terme n'est pas reconnu"

**Cause** : .NET SDK non installé ou pas dans le PATH

**Solutions** :
1. Installez .NET 8.0 SDK
2. Redémarrez l'ordinateur
3. Ouvrez une nouvelle fenêtre PowerShell
4. Vérifiez : `dotnet --version`

### "The project file is incomplete"

**Cause** : Packages NuGet non restaurés

**Solution** :
```powershell
dotnet restore
dotnet build
```

### "Package X could not be found"

**Cause** : Cache NuGet corrompu

**Solution** :
```powershell
dotnet nuget locals all --clear
dotnet restore
```

### L'application ne démarre pas

**Vérifications** :
1. .NET 8.0 Desktop Runtime installé
2. Windows 10 version 1809 minimum
3. Antivirus ne bloque pas l'application

**Solution** :
- Exécuter en tant qu'administrateur
- Désactiver temporairement l'antivirus

---

## 📚 Documentation complète

| Document | Description |
|----------|-------------|
| [README-NET.md](README-NET.md) | Documentation technique complète |
| [GUIDE-DEMARRAGE-NET.md](GUIDE-DEMARRAGE-NET.md) | Guide utilisateur détaillé |
| [MIGRATION-NOTES.md](MIGRATION-NOTES.md) | Notes sur la migration Electron → .NET |
| [LICENSE.txt](LICENSE.txt) | Licence MIT |

---

## 🎓 Ressources d'apprentissage

### .NET et C#
- [Documentation Microsoft .NET](https://learn.microsoft.com/fr-fr/dotnet/)
- [Tutoriels C#](https://learn.microsoft.com/fr-fr/dotnet/csharp/)

### WPF
- [Guide WPF](https://learn.microsoft.com/fr-fr/dotnet/desktop/wpf/)
- [XAML](https://learn.microsoft.com/fr-fr/dotnet/desktop/wpf/xaml/)

### MVVM
- [Pattern MVVM](https://learn.microsoft.com/fr-fr/dotnet/architecture/maui/mvvm)
- [CommunityToolkit.Mvvm](https://learn.microsoft.com/windows/communitytoolkit/mvvm/introduction)

---

## 💡 Prochaines étapes recommandées

### Étape 1 : Installation ✅
- [x] Installer .NET 8.0 SDK
- [ ] Compiler le projet
- [ ] Lancer l'application

### Étape 2 : Test
- [ ] Créer un projet test
- [ ] Ajouter quelques chapitres
- [ ] Écrire du contenu
- [ ] Sauvegarder

### Étape 3 : Distribution
- [ ] Publier l'application
- [ ] Créer l'installateur
- [ ] Tester l'installation
- [ ] Distribuer !

---

## 🤝 Besoin d'aide ?

1. **Consultez** la documentation dans les fichiers `.md`
2. **Vérifiez** la section "Résolution de problèmes"
3. **Testez** les commandes de vérification
4. **Ouvrez** une issue si problème persistant

---

## ✅ Checklist de démarrage

- [ ] .NET 8.0 SDK installé
- [ ] Visual Studio 2022 installé (optionnel)
- [ ] `dotnet --version` fonctionne
- [ ] `dotnet restore` réussi
- [ ] `dotnet build` réussi
- [ ] `dotnet run` lance l'application
- [ ] Création d'un projet test
- [ ] Sauvegarde fonctionnelle

---

**Félicitations ! 🎉**

Vous avez maintenant une application Windows native, légère et performante pour écrire votre livre !

**Bonne écriture ! 📖✍️**

---

**Version** : 1.0.0  
**Date** : Juin 2026  
**Technologie** : C# .NET 8 WPF
