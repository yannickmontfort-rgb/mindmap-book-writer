# MindMap Book Writer - Application .NET WPF

📚 **Logiciel d'écriture de livre basé sur une carte mentale interactive**

Application Windows native développée en C# avec WPF et .NET 8.

---

## ✨ Fonctionnalités

- **Carte mentale interactive** : Visualisez et organisez la structure complète de votre livre
- **Éditeur Markdown intégré** : Écrivez vos scènes avec un éditeur simple et efficace
- **Synchronisation automatique** : La carte mentale et les fichiers se synchronisent automatiquement
- **Organisation automatique** : Création automatique de dossiers et fichiers Markdown
- **Sauvegarde locale** : Tous vos fichiers sont sauvegardés localement
- **Interface Material Design** : Interface moderne et élégante
- **Drag & Drop** : Déplacez les nœuds de la carte mentale pour réorganiser

## 🎯 Structure du livre

```
Carte Mentale
│
📖 Titre du Livre (Racine)
    ├── 📚 Chapitre 1
    │   ├── 📝 Scène 1
    │   ├── 📝 Scène 2
    │   └── 📝 Scène 3
    │
    ├── 📚 Chapitre 2
    │   └── 📝 Scène 1
    └── ...
```

## 📦 Installation

### Prérequis

- **Windows 10/11** (64-bit)
- **.NET 8.0 Desktop Runtime** (l'installateur vous guidera si nécessaire)

### Méthode 1 : Installateur (Recommandé)

1. Téléchargez `MindMapBookWriter-Setup-1.0.0.exe`
2. Exécutez l'installateur
3. Suivez les instructions à l'écran
4. L'application sera disponible dans le menu Démarrer

### Méthode 2 : Compilation depuis les sources

**Prérequis de développement :**
- Visual Studio 2022 (ou version plus récente)
- .NET 8.0 SDK
- Workload "Développement Desktop .NET"

**Étapes :**

```powershell
# Cloner ou naviguer vers le dossier du projet
cd "c:\Users\yjpm\Nextcloud\Projets informatiques et électroniques\Developpement\Logiciel écriture"

# Restaurer les dépendances
dotnet restore

# Compiler le projet
dotnet build --configuration Release

# Lancer l'application
dotnet run
```

### Créer un installateur

**Avec Inno Setup :**

1. Installez [Inno Setup](https://jrsoftware.org/isdl.php)
2. Publiez l'application :
   ```powershell
   dotnet publish -c Release -r win-x64 --self-contained true
   ```
3. Compilez le script `Setup.iss` avec Inno Setup Compiler
4. L'installateur sera créé dans `.\Installer\`

## 🚀 Utilisation

### Démarrage rapide

1. **Lancez l'application** depuis le menu Démarrer
2. **Sélectionnez un dossier** : Cliquez sur "📁 Sélectionner dossier"
3. **Créez votre structure** :
   - Cliquez sur "➕ Nouveau Chapitre"
   - Dans la barre latérale, cliquez sur ➕ pour ajouter des scènes

### Navigation

- **Vue Carte Mentale** 🗺️ : Visualisez la structure complète
  - Cliquez et déplacez les nœuds pour réorganiser
  - Cliquez sur une scène (nœud orange) pour l'éditer
  
- **Vue Éditeur** ✍️ : Écrivez le contenu de vos scènes
  - Utilisez la syntaxe Markdown
  - Le contenu est sauvegardé automatiquement

### Barre latérale

- **Structure hiérarchique** : Voir tous les chapitres et scènes
- **Clic sur une scène** : Ouvrir l'éditeur pour cette scène
- **Boutons d'action** :
  - ➕ : Ajouter une scène au chapitre
  - 🗑️ : Supprimer un chapitre ou une scène

### Sauvegarde

- **💾 Sauvegarder** : Sauvegarde tout le projet
- **📂 Charger** : Charge un projet existant

## 📂 Structure des fichiers

```
MonProjet/
├── book-structure.json          # Structure complète du livre
├── Chapitre 1-Introduction/
│   ├── scene-001-Présentation.md
│   ├── scene-002-Contexte.md
│   └── scene-003-Objectifs.md
├── Chapitre 2-Développement/
│   └── scene-001-Action.md
└── ...
```

## 🎨 Personnalisation

### Couleurs des nœuds

Modifiez dans `Controls/MindMapControl.cs` :

```csharp
border.Background = node.Type switch
{
    NodeType.Root => new SolidColorBrush(Color.FromRgb(74, 144, 226)),    // Bleu
    NodeType.Chapter => new SolidColorBrush(Color.FromRgb(80, 200, 120)), // Vert
    NodeType.Scene => new SolidColorBrush(Color.FromRgb(243, 156, 18)),   // Orange
    _ => new SolidColorBrush(Colors.Gray)
};
```

### Thème Material Design

Modifiez dans `App.xaml` :

```xml
<materialDesign:BundledTheme BaseTheme="Light" PrimaryColor="Blue" SecondaryColor="Orange" />
```

Options : `Light` ou `Dark` pour BaseTheme

## 🛠️ Architecture technique

### Stack technologique

- **Framework** : .NET 8.0
- **UI** : WPF (Windows Presentation Foundation)
- **Design** : Material Design In XAML
- **Pattern** : MVVM (Model-View-ViewModel)
- **State Management** : CommunityToolkit.Mvvm
- **Serialization** : Newtonsoft.Json
- **Markdown** : Markdig

### Structure du projet

```
MindMapBookWriter/
├── Models/              # Modèles de données
│   └── BookModels.cs
├── ViewModels/          # ViewModels MVVM
│   └── MainViewModel.cs
├── Views/               # Vues XAML (implicite)
│   └── MainWindow.xaml
├── Controls/            # Contrôles personnalisés
│   └── MindMapControl.cs
├── Services/            # Services métier
│   └── FileService.cs
├── Converters/          # Convertisseurs XAML
│   └── BoolConverters.cs
└── App.xaml            # Configuration application
```

### Dépendances NuGet

| Package | Version | Usage |
|---------|---------|-------|
| MaterialDesignThemes | 5.0.0 | Interface Material Design |
| CommunityToolkit.Mvvm | 8.2.2 | MVVM helpers |
| Newtonsoft.Json | 13.0.3 | Sérialisation JSON |
| Markdig | 0.33.0 | Support Markdown |

## 📋 Commandes de développement

```powershell
# Restaurer les packages
dotnet restore

# Compiler en mode Debug
dotnet build

# Compiler en mode Release
dotnet build --configuration Release

# Exécuter l'application
dotnet run

# Publier pour Windows (self-contained)
dotnet publish -c Release -r win-x64 --self-contained true

# Publier pour Windows (framework-dependent)
dotnet publish -c Release -r win-x64 --self-contained false

# Nettoyer le projet
dotnet clean
```

## 🐛 Résolution de problèmes

### L'application ne démarre pas

1. Vérifiez que .NET 8.0 Desktop Runtime est installé :
   ```powershell
   dotnet --list-runtimes
   ```
2. Téléchargez-le ici si nécessaire : https://dotnet.microsoft.com/download/dotnet/8.0

### Erreur "The type initializer for 'Gdip' threw an exception"

Installez Visual C++ Redistributable :
https://aka.ms/vs/17/release/vc_redist.x64.exe

### La carte mentale ne s'affiche pas

Vérifiez que le dossier est sélectionné et que des chapitres ont été créés.

### Les fichiers ne se sauvegardent pas

- Vérifiez les permissions d'écriture sur le dossier
- Exécutez l'application en tant qu'administrateur si nécessaire

## 🆚 Comparaison Electron vs .NET

| Critère | Cette version (.NET) | Version Electron |
|---------|---------------------|------------------|
| Taille | ~50 Mo | ~200 Mo |
| Démarrage | Rapide (~1s) | Moyen (~3s) |
| RAM utilisée | ~100 Mo | ~300 Mo |
| Plateforme | Windows uniquement | Windows, Mac, Linux |
| Installation | Installateur .exe | Archive ou npm |
| Prérequis | .NET Runtime | Node.js + npm |

## 📝 Roadmap

### Version 1.1 (Prochainement)
- [ ] Export PDF du livre complet
- [ ] Recherche dans toutes les scènes
- [ ] Statistiques de mots
- [ ] Thème sombre

### Version 2.0 (Futur)
- [ ] Correcteur orthographique
- [ ] Templates de scènes
- [ ] Collaboration temps réel
- [ ] Import depuis Word/PDF

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
- Ouvrir des issues pour signaler des bugs
- Proposer des améliorations
- Soumettre des pull requests

## 📄 Licence

MIT License - Voir le fichier [LICENSE.txt](LICENSE.txt)

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation
- Contactez le développeur

---

**Version** : 1.0.0  
**Date** : Juin 2026  
**Développé avec** : ❤️ et C#
