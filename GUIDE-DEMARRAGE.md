# Guide de démarrage rapide - MindMap Book Writer

## ⚠️ Prérequis nécessaires

Avant de pouvoir utiliser l'application, vous devez installer **Node.js** qui inclut **npm**.

### Installation de Node.js

1. **Téléchargez Node.js** :
   - Visitez : https://nodejs.org/fr/
   - Téléchargez la version **LTS** (Long Term Support) recommandée
   - Version minimale requise : **18.0.0** ou supérieure

2. **Installez Node.js** :
   - Lancez l'installateur téléchargé
   - Suivez les instructions (gardez les options par défaut)
   - ✅ Assurez-vous que la case "Add to PATH" est cochée

3. **Vérifiez l'installation** :
   Ouvrez PowerShell et tapez :
   ```powershell
   node --version
   npm --version
   ```
   Vous devriez voir les numéros de version s'afficher.

## 🚀 Démarrage de l'application

Une fois Node.js installé, suivez ces étapes :

### 1. Installer les dépendances

Ouvrez PowerShell dans le dossier du projet et exécutez :

```powershell
npm install
```

⏱️ Cela prendra quelques minutes (téléchargement de ~300 Mo de dépendances).

### 2. Lancer l'application

```powershell
npm run dev
```

L'application devrait s'ouvrir automatiquement dans une fenêtre Electron !

## 🎯 Premiers pas

### Configuration initiale

1. **Sélectionnez un dossier** : Cliquez sur "📁 Sélectionner un dossier de projet"
   - Choisissez où vous voulez sauvegarder votre livre
   - Créez un nouveau dossier si nécessaire

2. **Nommez votre livre** : Cliquez sur ✏️ à côté du titre pour le modifier

### Créer votre premier chapitre

1. Cliquez sur **"➕ Nouveau Chapitre"**
2. Entrez le nom du chapitre (ex: "Introduction")
3. Appuyez sur ✓ ou Entrée

### Ajouter des scènes

1. Dans la barre latérale, cliquez sur **➕** à côté du chapitre
2. Entrez le nom de la scène (ex: "Présentation du héros")
3. Validez

### Écrire du contenu

1. **Cliquez sur une scène** dans la barre latérale
2. L'éditeur Markdown s'ouvre
3. **Écrivez votre texte**
4. Cliquez sur **"💾 Sauvegarder"** pour enregistrer

## 🗺️ Utilisation de la carte mentale

- **Vue d'ensemble** : Visualisez toute la structure de votre livre
- **Navigation** : Cliquez sur un nœud "scène" (orange 📝) pour l'éditer
- **Organisation** : Déplacez les nœuds pour organiser visuellement
- **Zoom** : Utilisez les contrôles en bas à gauche (+, -, fit)

## 📝 Astuces d'écriture Markdown

```markdown
# Titre principal
## Titre secondaire
### Titre tertiaire

**Texte en gras**
*Texte en italique*

- Liste à puces
- Élément 2

1. Liste numérotée
2. Élément 2

[Lien](https://example.com)

> Citation
```

## 📂 Structure des fichiers générés

Votre dossier de projet contiendra :

```
MonLivre/
├── chapter-123-Introduction/
│   ├── scene-456-Présentation.md
│   └── scene-789-Contexte.md
├── chapter-234-Développement/
│   └── scene-890-Action.md
└── ...
```

Chaque fichier `.md` contient le texte de la scène correspondante.

## 🔧 Commandes disponibles

```powershell
# Lancer en mode développement
npm run dev

# Compiler pour la production
npm run build

# Créer un exécutable
npm run package
```

## ❓ Problèmes courants

### L'application ne démarre pas

1. Vérifiez que Node.js est installé : `node --version`
2. Réinstallez les dépendances : `npm install`
3. Supprimez `node_modules` et réinstallez :
   ```powershell
   Remove-Item -Recurse -Force node_modules
   npm install
   ```

### Erreurs lors de npm install

- Assurez-vous d'avoir une connexion internet
- Essayez avec les droits administrateur
- Mettez à jour npm : `npm install -g npm@latest`

### La fenêtre Electron ne s'ouvre pas

- Vérifiez qu'aucun antivirus ne bloque Electron
- Regardez les erreurs dans le terminal
- Essayez de relancer : `npm run dev`

## 💡 Conseils d'utilisation

1. **Sauvegardez régulièrement** : Cliquez sur 💾 après avoir écrit
2. **Organisez d'abord** : Créez toute votre structure dans la carte mentale avant d'écrire
3. **Utilisez les deux vues** : Carte mentale pour la structure, Éditeur pour l'écriture
4. **Nommage clair** : Donnez des noms descriptifs à vos chapitres et scènes
5. **Backup** : Votre dossier de projet peut être sauvegardé/synchronisé (Dropbox, Git, etc.)

## 🎨 Personnalisation

Pour modifier l'apparence des nœuds de la carte mentale :
- Éditez `src/components/MindMapEditor.tsx`
- Changez les couleurs dans les composants `RootNode`, `ChapterNode`, `SceneNode`

## 📚 Ressources

- **Markdown** : https://www.markdownguide.org/
- **Node.js** : https://nodejs.org/fr/docs/
- **React** : https://fr.react.dev/

---

Bon courage pour votre écriture ! 🚀📖
