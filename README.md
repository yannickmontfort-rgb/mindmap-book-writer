# 📚 MindMap Book Writer - Multi-Plateforme

Logiciel d'écriture de livre basé sur une carte mentale, disponible pour **Windows**, **Linux** et **Docker/Web**.

## 🌟 Concept

Éditez une carte mentale pour structurer votre livre, et l'application génère automatiquement les chapitres et scènes correspondants. Chaque nœud de la carte devient un chapitre ou une scène que vous pouvez éditer en Markdown.

## 📦 Trois versions disponibles

| Version | Technologie | Plateforme | Avantages |
|---------|-------------|------------|-----------|
| **Windows** | WPF + .NET 8 | Windows 10/11 | Interface native, performante, carte mentale complète |
| **Linux** | Avalonia UI | Linux/macOS | Multiplateforme, légère, interface moderne |
| **Docker** | Blazor + ASP.NET | Web (tout OS) | Accessible partout, multi-utilisateurs, temps réel |

### 🪟 Version Windows
📁 **Dossier** : [`Windows/`](Windows/)

Application desktop native avec :
- Interface Material Design
- Carte mentale interactive (drag & drop)
- Éditeur Markdown intégré
- Installateur Windows (.exe)

[📖 Documentation complète Windows](Windows/README.md)

### 🐧 Version Linux
📁 **Dossier** : [`Linux/`](Linux/)

Application desktop multiplateforme avec :
- Interface Fluent Design (Avalonia)
- Compatible Debian/Ubuntu/Fedora
- Package .deb disponible
- Support AppImage/Flatpak

[📖 Documentation complète Linux](Linux/README.md)

### 🐳 Version Docker/Web
📁 **Dossier** : [`Docker/`](Docker/)

Application web containerisée avec :
- Interface Blazor WebAssembly
- API REST backend
- Synchronisation temps réel (SignalR)
- Déploiement Docker Compose

[📖 Documentation complète Docker](Docker/README.md)

## 🚀 Démarrage rapide

### Windows
```powershell
cd Windows
dotnet run
```

### Linux
```bash
cd Linux
dotnet run
```

### Docker
```bash
cd Docker
docker-compose up -d
# Accédez à http://localhost:5001
```

## 📁 Structure du projet

```
Logiciel écriture/
├── Windows/              # Version WPF Windows
│   ├── Models/
│   ├── ViewModels/
│   ├── Services/
│   ├── Controls/
│   └── README.md
├── Linux/                # Version Avalonia Linux
│   ├── Views/
│   ├── ViewModels/
│   ├── Services/
│   └── README.md
├── Docker/               # Version Web Blazor
│   ├── Server/          # Backend ASP.NET Core
│   ├── Client/          # Frontend Blazor WASM
│   ├── docker-compose.yml
│   └── README.md
├── Shared/               # Code partagé entre versions
│   └── Models/          # Modèles de données communs
│       └── BookModels.cs
└── README.md            # Ce fichier
```

## 💾 Format de fichiers (Compatible entre toutes les versions)

### Structure du livre
```json
{
  "title": "Mon Livre",
  "chapters": [
    {
      "id": "guid",
      "name": "Chapitre 1",
      "scenes": [
        {
          "id": "guid",
          "name": "Scène 1",
          "content": "...",
          "markdownPath": "Chapitre 1/Scene 1.md"
        }
      ]
    }
  ]
}
```

### Organisation des fichiers
```
MonProjet/
├── book-structure.json       # Structure du livre
├── Chapitre 1/
│   ├── Scene 1.md
│   └── Scene 2.md
├── Chapitre 2/
│   └── Scene 1.md
└── Chapitre 3/
    └── Scene 1.md
```

**✅ Les projets créés avec une version sont compatibles avec toutes les autres !**

## 🎯 Fonctionnalités communes

Toutes les versions incluent :

- ✅ **Carte mentale** : Visualisez la structure de votre livre
- ✅ **Édition Markdown** : Écrivez vos scènes en Markdown
- ✅ **Organisation automatique** : Les chapitres et scènes se créent automatiquement
- ✅ **Sauvegarde structurée** : JSON + fichiers Markdown séparés
- ✅ **Gestion de projet** : Créez, chargez, sauvegardez vos livres
- ✅ **Interface intuitive** : Sidebar avec arborescence, éditeur central

## 🔧 Prérequis

### Toutes les versions
- .NET 8.0 SDK/Runtime

### Version Docker uniquement
- Docker Desktop
- Docker Compose

## 📖 Guide d'utilisation

1. **Choisissez votre version** selon votre système d'exploitation
2. **Créez un nouveau projet** en sélectionnant un dossier vide
3. **Ajoutez des chapitres** avec le bouton "➕ Nouveau Chapitre"
4. **Ajoutez des scènes** en cliquant sur "➕" à côté d'un chapitre
5. **Éditez vos scènes** en Markdown dans l'éditeur
6. **Sauvegardez** avec le bouton "💾 Sauvegarder"
7. **(Windows)** Visualisez et réorganisez avec la carte mentale

## 🎨 Technologies utilisées

### Frontend
- **Windows** : WPF + Material Design Themes
- **Linux** : Avalonia UI + Fluent Theme
- **Docker** : Blazor WebAssembly + CSS moderne

### Backend
- **Windows/Linux** : Services .NET locaux
- **Docker** : ASP.NET Core Web API + SignalR

### Commun
- **MVVM** : Pattern architectural pour toutes les versions desktop
- **Newtonsoft.Json** : Sérialisation JSON
- **Markdig** : Traitement Markdown
- **.NET 8.0** : Runtime moderne et performant

## 📊 Comparaison des versions

| Fonctionnalité | Windows | Linux | Docker |
|----------------|---------|-------|--------|
| Carte mentale interactive | ✅ Complète | ⚠️ Simplifiée | ⚠️ Simplifiée |
| Éditeur Markdown | ✅ | ✅ | ✅ |
| Interface native | ✅ | ✅ | ❌ (Web) |
| Multi-utilisateurs | ❌ | ❌ | ✅ |
| Synchronisation temps réel | ❌ | ❌ | ✅ |
| Installateur | ✅ .exe | ✅ .deb | ❌ |
| Portable | ✅ | ✅ | ✅ |
| Accès distant | ❌ | ❌ | ✅ |

## 🤝 Contribution

Les contributions sont les bienvenues ! Chaque version est indépendante mais partage les modèles de données communs dans `Shared/`.

## 📄 Licence

MIT License - Vous êtes libre d'utiliser, modifier et distribuer ce logiciel.

## 🆘 Support

Pour chaque version, consultez le README dédié :
- [Windows README](Windows/README.md)
- [Linux README](Linux/README.md)
- [Docker README](Docker/README.md)

## 🎉 Remerciements

Merci d'utiliser MindMap Book Writer ! Que votre créativité littéraire s'épanouisse ! 📖✨
