# Architecture technique - MindMap Book Writer

## Vue d'ensemble

Application desktop cross-platform construite avec Electron et React, permettant d'organiser l'écriture d'un livre via une carte mentale interactive.

## Stack technique

### Frontend
- **React 18** : Bibliothèque UI
- **TypeScript 5** : Typage statique
- **React Flow 11** : Éditeur de carte mentale
- **SimpleMDE** : Éditeur Markdown WYSIWYG
- **Zustand 4** : Gestion d'état légère

### Desktop
- **Electron 28** : Framework desktop
- **Node.js** : Runtime JavaScript

### Build & Dev
- **Vite 5** : Build tool moderne et rapide
- **Concurrently** : Exécution de commandes parallèles
- **Electron Builder** : Packaging de l'application

## Architecture de l'application

```
┌─────────────────────────────────────────────────────────┐
│                     ELECTRON MAIN                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │  main.js - Processus principal                    │  │
│  │  - Gestion de fenêtres                           │  │
│  │  - API IPC pour fichiers                         │  │
│  │  - Création structure de dossiers                │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↕️ IPC
┌─────────────────────────────────────────────────────────┐
│                    ELECTRON RENDERER                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │  React Application (src/)                        │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────┐   │  │
│  │  │  App.tsx (Composant racine)            │   │  │
│  │  │  - Gestion des vues                    │   │  │
│  │  │  - Routing interne                      │   │  │
│  │  └─────────────────────────────────────────┘   │  │
│  │                                                   │  │
│  │  ┌──────────────┐  ┌──────────────┐            │  │
│  │  │  Toolbar.tsx │  │  Sidebar.tsx │            │  │
│  │  │  - Actions   │  │  - Navigation│            │  │
│  │  │  - Projet    │  │  - Structure │            │  │
│  │  └──────────────┘  └──────────────┘            │  │
│  │                                                   │  │
│  │  ┌────────────────────┐  ┌──────────────────┐  │  │
│  │  │ MindMapEditor.tsx  │  │MarkdownEditor.tsx│  │  │
│  │  │ - React Flow       │  │ - SimpleMDE      │  │  │
│  │  │ - Visualisation    │  │ - Édition texte  │  │  │
│  │  └────────────────────┘  └──────────────────┘  │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────┐   │  │
│  │  │  store.ts (Zustand)                     │   │  │
│  │  │  - État global application              │   │  │
│  │  │  - Logique métier                       │   │  │
│  │  │  - Synchronisation                      │   │  │
│  │  └─────────────────────────────────────────┘   │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────┐   │  │
│  │  │  types.ts                               │   │  │
│  │  │  - Définitions TypeScript               │   │  │
│  │  │  - Interfaces                           │   │  │
│  │  └─────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↕️ File System
┌─────────────────────────────────────────────────────────┐
│                    SYSTÈME DE FICHIERS                   │
│  ProjetLivre/                                           │
│  ├── chapter-xxx-NomChapitre/                          │
│  │   ├── scene-xxx-NomScene1.md                        │
│  │   └── scene-xxx-NomScene2.md                        │
│  └── chapter-yyy-AutreChapitre/                        │
│      └── scene-yyy-NomScene.md                          │
└─────────────────────────────────────────────────────────┘
```

## Flux de données

### 1. Création d'un chapitre

```
User Click "Nouveau Chapitre"
    ↓
Toolbar.tsx → addChapter()
    ↓
store.ts → Update bookStructure
    ↓
store.ts → syncToMindMap()
    ↓
MindMapEditor.tsx → Update nodes/edges
    ↓
Sidebar.tsx → Update list
```

### 2. Édition d'une scène

```
User Click sur scène (Sidebar ou MindMap)
    ↓
setCurrentScene(chapterId, sceneId)
    ↓
store.ts → Update currentScene & currentSceneContent
    ↓
MarkdownEditor.tsx → Load content
    ↓
User écrit
    ↓
updateSceneContent(newContent)
    ↓
store.ts → Update bookStructure.chapters[x].scenes[y].content
```

### 3. Sauvegarde du projet

```
User Click "Sauvegarder"
    ↓
store.ts → saveProject()
    ↓
IPC → window.electronAPI.createChapterStructure()
    ↓
electron/main.js → Create folders
    ↓
For each scene:
    IPC → window.electronAPI.saveMarkdownFile()
    ↓
    electron/main.js → fs.writeFile()
    ↓
    Filesystem → Save .md files
```

## Modèle de données

### BookStructure

```typescript
{
  title: string,
  chapters: [
    {
      id: string,
      name: string,
      scenes: [
        {
          id: string,
          name: string,
          content: string,
          markdownPath?: string
        }
      ]
    }
  ]
}
```

### MindMap (React Flow)

```typescript
nodes: [
  {
    id: string,
    type: 'root' | 'chapter' | 'scene',
    data: { label: string, nodeData: any },
    position: { x: number, y: number }
  }
]

edges: [
  {
    id: string,
    source: string,  // parent node id
    target: string   // child node id
  }
]
```

## Communication IPC (Electron)

### Channels disponibles

| Channel | Direction | Description |
|---------|-----------|-------------|
| `select-project-folder` | Renderer → Main | Ouvre dialogue sélection dossier |
| `save-markdown-file` | Renderer → Main | Sauvegarde un fichier .md |
| `read-markdown-file` | Renderer → Main | Lit un fichier .md |
| `create-chapter-structure` | Renderer → Main | Crée dossiers/fichiers chapitres |
| `list-project-files` | Renderer → Main | Liste les fichiers du projet |

### Sécurité

- **Context Isolation** : Activé
- **Node Integration** : Désactivé
- **Preload Script** : Expose API sécurisée via `contextBridge`

## Gestion d'état (Zustand)

### Store principal

```typescript
useBookStore {
  // État
  projectPath: string | null
  bookStructure: BookStructure
  mindMapNodes: MindMapNode[]
  mindMapEdges: MindMapEdge[]
  currentScene: { chapterId, sceneId } | null
  currentSceneContent: string
  
  // Actions
  setProjectPath()
  setBookTitle()
  addChapter()
  updateChapterName()
  deleteChapter()
  addScene()
  updateSceneName()
  deleteScene()
  setCurrentScene()
  updateSceneContent()
  syncFromMindMap()
  syncToMindMap()
  saveProject()
}
```

### Synchronisation bidirectionnelle

- **Store → MindMap** : `syncToMindMap()`
  - Appelé après modification de la structure
  - Régénère nodes et edges depuis bookStructure
  
- **MindMap → Store** : `syncFromMindMap()`
  - Appelé après drag & drop dans la carte
  - Extrait la structure depuis nodes et edges

## Performance

### Optimisations

1. **Render optimisé** : 
   - Zustand ne re-render que les composants qui utilisent les données modifiées
   
2. **React Flow** :
   - Virtualisation automatique des nœuds
   - Lazy rendering
   
3. **Markdown Editor** :
   - Debounce sur les changements (évite trop de renders)
   
4. **File System** :
   - Écriture asynchrone (non-bloquant)
   - Sauvegarde batch (tous les fichiers en parallèle)

## Extensions possibles

### Fonctionnalités futures

1. **Import/Export**
   - JSON pour backup structure complète
   - Export PDF/EPUB du livre complet
   
2. **Collaboration**
   - Sync en temps réel (WebSocket)
   - Git integration pour versioning
   
3. **Templates**
   - Templates de structure de livre
   - Templates de scènes
   
4. **Statistiques**
   - Compteur de mots par scène/chapitre
   - Progression de l'écriture
   - Graphiques
   
5. **Recherche**
   - Recherche full-text dans toutes les scènes
   - Find & Replace global
   
6. **AI Assistant**
   - Suggestions de suite
   - Correction grammaticale
   - Analyse de cohérence

## Dépendances principales

| Package | Version | Usage |
|---------|---------|-------|
| electron | ^28.0.0 | Application desktop |
| react | ^18.2.0 | UI framework |
| reactflow | ^11.10.1 | Mind map editor |
| react-simplemde-editor | ^5.2.0 | Markdown editor |
| zustand | ^4.4.7 | State management |
| vite | ^5.0.8 | Build tool |
| typescript | ^5.3.3 | Type safety |

## Structure des fichiers

```
project/
├── electron/               # Processus Electron
│   ├── main.js            # Main process
│   └── preload.js         # Preload script
│
├── src/                   # Code React
│   ├── components/        # Composants UI
│   │   ├── MindMapEditor.tsx
│   │   ├── MarkdownEditor.tsx
│   │   ├── Toolbar.tsx
│   │   └── Sidebar.tsx
│   ├── store.ts          # Zustand store
│   ├── types.ts          # TypeScript types
│   ├── App.tsx           # Composant root
│   ├── App.css           # Styles
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # Vite types
│
├── index.html            # HTML template
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tsconfig.node.json    # TS config for Node
├── vite.config.ts        # Vite config
├── .gitignore           # Git ignore
├── README.md            # Documentation
├── GUIDE-DEMARRAGE.md   # Quick start
└── EXEMPLE.md           # Example usage
```

## Build & Déploiement

### Développement

```bash
npm run dev
```

Lance Vite dev server + Electron avec hot reload

### Production

```bash
npm run build        # Compile React
npm run build:electron  # Package Electron
```

Génère un exécutable dans `release/`

### Distribution

```bash
npm run package
```

Crée installateurs pour :
- Windows : `.exe` (NSIS)
- macOS : `.dmg`
- Linux : `.AppImage`, `.deb`

---

**Version** : 1.0.0  
**Dernière mise à jour** : Juin 2026
