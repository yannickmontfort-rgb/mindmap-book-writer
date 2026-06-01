# Guide de démarrage - MindMap Book Writer (.NET)

## 🎯 Application Windows native - Plus légère et plus rapide !

Cette version utilise **C# et WPF** au lieu d'Electron, offrant :
- ✅ Démarrage rapide
- ✅ Taille réduite (~50 Mo vs ~200 Mo)
- ✅ Meilleure intégration Windows
- ✅ Pas besoin de Node.js !

---

## ⚡ Installation rapide

### Option 1 : Utiliser l'installateur (RECOMMANDÉ)

1. **Téléchargez** `MindMapBookWriter-Setup-1.0.0.exe`
2. **Exécutez** l'installateur
3. **Lancez** l'application depuis le menu Démarrer
4. **C'est tout !** 🎉

### Option 2 : Compilation depuis les sources

**Prérequis :**
- [Visual Studio 2022](https://visualstudio.microsoft.com/) (Community gratuit)
- Workload "Développement Desktop .NET"

**OU**

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

---

## 🚀 Compilation et lancement

### Avec Visual Studio

1. **Ouvrez** `MindMapBookWriter.csproj` avec Visual Studio
2. **Appuyez sur F5** pour compiler et lancer
3. C'est prêt !

### Avec la ligne de commande

```powershell
# Naviguer vers le dossier du projet
cd "c:\Users\yjpm\Nextcloud\Projets informatiques et électroniques\Developpement\Logiciel écriture"

# Restaurer les dépendances NuGet
dotnet restore

# Compiler et lancer
dotnet run
```

### Compiler pour la distribution

```powershell
# Compiler en mode Release
dotnet build --configuration Release

# Publier une version autonome (inclut .NET Runtime)
dotnet publish -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true

# L'exécutable sera dans :
# bin\Release\net8.0-windows\win-x64\publish\
```

---

## 📦 Créer l'installateur Windows

### Avec Inno Setup

1. **Téléchargez et installez** [Inno Setup 6](https://jrsoftware.org/isdl.php)

2. **Publiez l'application** :
   ```powershell
   dotnet publish -c Release -r win-x64 --self-contained true
   ```

3. **Compilez le script d'installation** :
   - Ouvrez `Setup.iss` avec Inno Setup Compiler
   - Cliquez sur "Compile" (F9)

4. **L'installateur sera créé** dans `.\Installer\`

---

## 🎯 Premiers pas

### 1. Lancer l'application

Double-cliquez sur l'icône dans le menu Démarrer ou sur le bureau.

### 2. Sélectionner un dossier de projet

Cliquez sur **"📁 Sélectionner dossier"** dans la barre d'outils :
- Créez un nouveau dossier pour votre livre
- Ou sélectionnez un dossier existant

### 3. Créer des chapitres

1. Cliquez sur **"➕ Nouveau Chapitre"**
2. Le chapitre apparaît dans :
   - La barre latérale
   - La carte mentale

### 4. Ajouter des scènes

1. Dans la **barre latérale**, cliquez sur **➕** à côté d'un chapitre
2. Donnez un nom à la scène
3. La scène apparaît sous le chapitre

### 5. Écrire du contenu

1. **Cliquez sur une scène** dans la barre latérale
2. L'éditeur s'ouvre automatiquement
3. **Écrivez votre texte** en Markdown
4. **Sauvegardez** avec le bouton "💾 Sauvegarder"

---

## 🗺️ Utilisation de la carte mentale

### Navigation

- **Vue Carte Mentale** 🗺️ : Structure visuelle complète
- **Vue Éditeur** ✍️ : Écriture du contenu

### Manipulation des nœuds

- **Cliquer et déplacer** : Réorganiser visuellement
- **Cliquer sur une scène** : Ouvrir l'éditeur
- **Zoom** : Molette de la souris (si implémenté)

### Codes couleur

- 📖 **Bleu** : Titre du livre (racine)
- 📚 **Vert** : Chapitres
- 📝 **Orange** : Scènes

---

## 📝 Syntaxe Markdown

```markdown
# Titre principal
## Titre secondaire

**Texte en gras**
*Texte en italique*

- Liste à puces
- Élément 2

1. Liste numérotée
2. Élément 2

> Citation

[Lien](https://example.com)
```

---

## 📂 Organisation des fichiers

Votre dossier de projet contiendra :

```
MonLivre/
├── book-structure.json              # Structure du livre
├── chapter-123-Introduction/
│   ├── scene-456-Présentation.md
│   └── scene-789-Contexte.md
├── chapter-234-Développement/
│   └── scene-890-Action.md
└── ...
```

**Fichiers :**
- `.json` : Structure complète du livre
- `.md` : Contenu de chaque scène en Markdown

---

## 🔧 Configuration requise

### Minimum
- **OS** : Windows 10 (version 1809 ou supérieure)
- **RAM** : 2 GB
- **Disque** : 200 MB
- **.NET** : 8.0 Desktop Runtime

### Recommandé
- **OS** : Windows 11
- **RAM** : 4 GB
- **Disque** : 500 MB (pour vos projets)

---

## ❓ Problèmes fréquents

### "L'application ne peut pas démarrer"

**Cause** : .NET 8.0 Runtime manquant

**Solution** :
1. Téléchargez [.NET 8.0 Desktop Runtime](https://dotnet.microsoft.com/download/dotnet/8.0)
2. Installez le runtime
3. Relancez l'application

### "Erreur lors de la compilation"

**Visual Studio** :
```powershell
# Nettoyer et reconstruire
dotnet clean
dotnet restore
dotnet build
```

**Packages NuGet** :
- Outils → Options → Gestionnaire de Package NuGet
- Effacer les caches

### "Les fichiers ne se sauvegardent pas"

**Vérifications** :
1. Le dossier existe
2. Vous avez les droits d'écriture
3. Le disque n'est pas plein

**Solution** :
- Exécutez en tant qu'administrateur (clic droit → Exécuter en tant qu'administrateur)

### "La carte mentale est vide"

**Cause** : Aucun chapitre créé

**Solution** :
1. Cliquez sur "➕ Nouveau Chapitre"
2. La carte se met à jour automatiquement

---

## 💡 Astuces

### Raccourcis clavier

- **Ctrl + S** : Sauvegarder (si implémenté)
- **Alt + F4** : Fermer l'application

### Organisation

1. **Planifiez d'abord** : Créez toute la structure (chapitres et scènes)
2. **Visualisez** : Utilisez la carte mentale pour voir l'ensemble
3. **Écrivez ensuite** : Une scène à la fois dans l'éditeur

### Sauvegarde

- Sauvegardez régulièrement (bouton 💾)
- Votre dossier peut être :
  - Copié sur une clé USB
  - Synchronisé avec OneDrive/Dropbox
  - Versionné avec Git

---

## 🔄 Migration depuis Electron

Si vous aviez la version Electron :

1. **Structure identique** : Les fichiers `.md` sont compatibles
2. **Copiez votre dossier** projet existant
3. **Chargez-le** avec "📂 Charger"

---

## 📊 Avantages vs Electron

| Critère | .NET WPF | Electron |
|---------|----------|----------|
| Taille installateur | ~50 Mo | ~200 Mo |
| Démarrage | ~1 seconde | ~3 secondes |
| RAM utilisée | ~100 Mo | ~300 Mo |
| Plateforme | Windows | Multi-plateforme |
| Installation | .exe simple | npm install |

---

## 🎓 Ressources

- **C# et .NET** : https://learn.microsoft.com/fr-fr/dotnet/
- **WPF** : https://learn.microsoft.com/fr-fr/dotnet/desktop/wpf/
- **Markdown** : https://www.markdownguide.org/
- **Material Design** : https://materialdesigninxaml.net/

---

## 📞 Besoin d'aide ?

1. Consultez le [README-NET.md](README-NET.md) complet
2. Vérifiez la section "Résolution de problèmes"
3. Ouvrez une issue sur GitHub

---

**Bonne écriture ! 📖✍️**
