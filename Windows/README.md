# MindMap Book Writer - Version Windows

Application Windows native en WPF/.NET 8.0 pour l'écriture de livre basée sur une carte mentale.

## 📋 Prérequis

- Windows 10/11
- .NET 8.0 Runtime (ou SDK pour la compilation)

## 🚀 Installation

### Option 1 : Installation via l'installateur (Recommandé)
1. Téléchargez `MindMapBookWriter-Setup.exe`
2. Exécutez l'installateur
3. Suivez les instructions à l'écran
4. L'application vérifiera et installera .NET 8.0 si nécessaire

### Option 2 : Compilation depuis les sources
```powershell
cd Windows
dotnet restore
dotnet build -c Release
dotnet run
```

### Création de l'installateur
```powershell
# Compilez d'abord l'application
dotnet publish -c Release -r win-x64 --self-contained

# Utilisez Inno Setup pour créer l'installateur
iscc Setup.iss
```

## 🎨 Fonctionnalités

✅ **Interface moderne** avec Material Design
✅ **Carte mentale interactive** avec drag & drop
✅ **Éditeur de texte Markdown** intégré
✅ **Organisation automatique** en chapitres et scènes
✅ **Sauvegarde automatique** en JSON + Markdown
✅ **Vue double** : carte mentale ou éditeur

## 📁 Structure du projet

```
Windows/
├── App.xaml/cs              # Point d'entrée de l'application
├── MainWindow.xaml/cs       # Fenêtre principale
├── Models/                  # Modèles de données
│   └── BookModels.cs
├── ViewModels/              # MVVM ViewModels
│   └── MainViewModel.cs
├── Services/                # Services métier
│   └── FileService.cs
├── Controls/                # Contrôles personnalisés
│   └── MindMapControl.cs
├── Converters/              # Convertisseurs XAML
│   └── BoolConverters.cs
└── Setup.iss                # Script Inno Setup
```

## 💾 Format des données

- **Structure** : `book-structure.json`
- **Contenu** : Fichiers Markdown (`.md`) par scène
- **Organisation** : Dossiers par chapitre

Exemple :
```
MonProjet/
├── book-structure.json
├── Chapitre 1/
│   ├── Scene 1.md
│   └── Scene 2.md
└── Chapitre 2/
    └── Scene 1.md
```

## 🎯 Utilisation

1. **Créer un projet** : Cliquez sur "📁 Sélectionner dossier"
2. **Ajouter des chapitres** : Bouton "➕ Nouveau Chapitre"
3. **Ajouter des scènes** : Cliquez "➕" sur un chapitre
4. **Éditer** : Sélectionnez une scène et écrivez en Markdown
5. **Carte mentale** : Visualisez et réorganisez la structure
6. **Sauvegarder** : Bouton "💾 Sauvegarder"

## 🔧 Dépendances

- **MaterialDesignThemes** 5.0.0 : Interface utilisateur
- **CommunityToolkit.Mvvm** 8.2.2 : Pattern MVVM
- **Newtonsoft.Json** 13.0.3 : Sérialisation JSON
- **Markdig** 0.33.0 : Traitement Markdown

## 📄 Licence

MIT License - Voir LICENSE.txt
