# MindMap Book Writer - Version Linux

Application Linux multiplateforme en Avalonia UI pour l'écriture de livre basée sur une carte mentale.

## 📋 Prérequis

- Linux (Debian, Ubuntu, Fedora, etc.)
- .NET 8.0 SDK/Runtime

## 🚀 Installation

### Installation de .NET 8.0 (Ubuntu/Debian)
```bash
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y dotnet-sdk-8.0
```

### Compilation et exécution
```bash
cd Linux
dotnet restore
dotnet build -c Release
dotnet run
```

### Création d'un package Debian
```bash
# Publiez l'application
dotnet publish -c Release -r linux-x64 --self-contained

# Créez la structure .deb
mkdir -p mindmap-book-writer_1.0.0/DEBIAN
mkdir -p mindmap-book-writer_1.0.0/usr/bin
mkdir -p mindmap-book-writer_1.0.0/usr/share/applications

# Copiez les fichiers
cp bin/Release/net8.0/linux-x64/publish/* mindmap-book-writer_1.0.0/usr/bin/

# Créez le fichier control
cat > mindmap-book-writer_1.0.0/DEBIAN/control << EOF
Package: mindmap-book-writer
Version: 1.0.0
Architecture: amd64
Maintainer: Votre Nom <email@example.com>
Description: Logiciel d'écriture de livre basé sur une carte mentale
Depends: libicu70
EOF

# Créez le .desktop file
cat > mindmap-book-writer_1.0.0/usr/share/applications/mindmap-book-writer.desktop << EOF
[Desktop Entry]
Name=MindMap Book Writer
Comment=Écriture de livre avec carte mentale
Exec=/usr/bin/MindMapBookWriter.Linux
Icon=text-editor
Terminal=false
Type=Application
Categories=Office;TextEditor;
EOF

# Construisez le package
dpkg-deb --build mindmap-book-writer_1.0.0
```

## 🎨 Fonctionnalités

✅ **Interface fluent** moderne avec Avalonia UI
✅ **Multiplateforme** (Linux, macOS, Windows)
✅ **Éditeur Markdown** intégré
✅ **Organisation automatique** en chapitres et scènes
✅ **Compatible** avec le format Windows/Docker
✅ **Légère et performante**

## 📁 Structure du projet

```
Linux/
├── Program.cs               # Point d'entrée
├── App.axaml/cs            # Application Avalonia
├── Views/                   # Vues AXAML
│   └── MainWindow.axaml/cs
├── ViewModels/              # MVVM ViewModels
│   └── MainViewModel.cs
└── Services/                # Services métier
    └── FileService.cs
```

## 💾 Format des données

Compatible avec les versions Windows et Docker :
- **Structure** : `book-structure.json`
- **Contenu** : Fichiers Markdown (`.md`)

## 🎯 Utilisation

Identique à la version Windows :
1. Sélectionner un dossier projet
2. Créer des chapitres et scènes
3. Éditer en Markdown
4. Sauvegarder automatiquement

## 🔧 Dépendances

- **Avalonia** 11.0.7 : Framework UI multiplateforme
- **Avalonia.Desktop** 11.0.7 : Support desktop
- **Avalonia.Themes.Fluent** 11.0.7 : Thème Fluent Design
- **Avalonia.ReactiveUI** 11.0.7 : Binding réactif
- **Newtonsoft.Json** 13.0.3 : Sérialisation JSON
- **Markdig** 0.33.0 : Traitement Markdown

## 🐧 Distribution

### AppImage (Recommandé)
```bash
dotnet publish -c Release -r linux-x64 --self-contained
# Utilisez appimagetool pour créer l'AppImage
```

### Flatpak
```bash
# Créez un manifest flatpak
# Construisez avec flatpak-builder
```

## 📄 Licence

MIT License - Voir LICENSE.txt
