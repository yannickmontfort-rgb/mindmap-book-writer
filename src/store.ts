import { create } from 'zustand';
import { BookStructure, ChapterNode, SceneNode, MindMapNode, MindMapEdge } from './types';

interface BookStore {
  // État du projet
  projectPath: string | null;
  bookStructure: BookStructure;
  
  // État de la carte mentale
  mindMapNodes: MindMapNode[];
  mindMapEdges: MindMapEdge[];
  
  // Scène actuellement éditée
  currentScene: { chapterId: string; sceneId: string } | null;
  currentSceneContent: string;
  
  // Actions
  setProjectPath: (path: string) => void;
  setBookTitle: (title: string) => void;
  
  addChapter: (name: string) => void;
  updateChapterName: (chapterId: string, name: string) => void;
  deleteChapter: (chapterId: string) => void;
  
  addScene: (chapterId: string, name: string) => void;
  updateSceneName: (chapterId: string, sceneId: string, name: string) => void;
  deleteScene: (chapterId: string, sceneId: string) => void;
  
  setCurrentScene: (chapterId: string, sceneId: string) => void;
  updateSceneContent: (content: string) => void;
  
  syncFromMindMap: (nodes: MindMapNode[], edges: MindMapEdge[]) => void;
  syncToMindMap: () => void;
  
  saveProject: () => Promise<void>;
}

export const useBookStore = create<BookStore>((set, get) => ({
  projectPath: null,
  bookStructure: {
    title: 'Mon Livre',
    chapters: []
  },
  mindMapNodes: [],
  mindMapEdges: [],
  currentScene: null,
  currentSceneContent: '',
  
  setProjectPath: (path) => set({ projectPath: path }),
  
  setBookTitle: (title) => set((state) => ({
    bookStructure: { ...state.bookStructure, title }
  })),
  
  addChapter: (name) => set((state) => {
    const newChapter: ChapterNode = {
      id: `chapter-${Date.now()}`,
      name,
      scenes: []
    };
    return {
      bookStructure: {
        ...state.bookStructure,
        chapters: [...state.bookStructure.chapters, newChapter]
      }
    };
  }),
  
  updateChapterName: (chapterId, name) => set((state) => ({
    bookStructure: {
      ...state.bookStructure,
      chapters: state.bookStructure.chapters.map(ch =>
        ch.id === chapterId ? { ...ch, name } : ch
      )
    }
  })),
  
  deleteChapter: (chapterId) => set((state) => ({
    bookStructure: {
      ...state.bookStructure,
      chapters: state.bookStructure.chapters.filter(ch => ch.id !== chapterId)
    }
  })),
  
  addScene: (chapterId, name) => set((state) => {
    const newScene: SceneNode = {
      id: `scene-${Date.now()}`,
      name,
      content: ''
    };
    return {
      bookStructure: {
        ...state.bookStructure,
        chapters: state.bookStructure.chapters.map(ch =>
          ch.id === chapterId
            ? { ...ch, scenes: [...ch.scenes, newScene] }
            : ch
        )
      }
    };
  }),
  
  updateSceneName: (chapterId, sceneId, name) => set((state) => ({
    bookStructure: {
      ...state.bookStructure,
      chapters: state.bookStructure.chapters.map(ch =>
        ch.id === chapterId
          ? {
              ...ch,
              scenes: ch.scenes.map(sc =>
                sc.id === sceneId ? { ...sc, name } : sc
              )
            }
          : ch
      )
    }
  })),
  
  deleteScene: (chapterId, sceneId) => set((state) => ({
    bookStructure: {
      ...state.bookStructure,
      chapters: state.bookStructure.chapters.map(ch =>
        ch.id === chapterId
          ? { ...ch, scenes: ch.scenes.filter(sc => sc.id !== sceneId) }
          : ch
      )
    }
  })),
  
  setCurrentScene: (chapterId, sceneId) => {
    const state = get();
    const chapter = state.bookStructure.chapters.find(ch => ch.id === chapterId);
    const scene = chapter?.scenes.find(sc => sc.id === sceneId);
    
    set({
      currentScene: { chapterId, sceneId },
      currentSceneContent: scene?.content || ''
    });
  },
  
  updateSceneContent: (content) => set((state) => {
    if (!state.currentScene) return state;
    
    return {
      currentSceneContent: content,
      bookStructure: {
        ...state.bookStructure,
        chapters: state.bookStructure.chapters.map(ch =>
          ch.id === state.currentScene!.chapterId
            ? {
                ...ch,
                scenes: ch.scenes.map(sc =>
                  sc.id === state.currentScene!.sceneId
                    ? { ...sc, content }
                    : sc
                )
              }
            : ch
        )
      }
    };
  }),
  
  syncFromMindMap: (nodes, edges) => {
    // Logique pour synchroniser la structure depuis la carte mentale
    // Cette fonction sera appelée quand la carte mentale change
    set({ mindMapNodes: nodes, mindMapEdges: edges });
    
    // Extraire la structure du livre depuis les nœuds
    const rootNode = nodes.find(n => n.type === 'root');
    const chapterNodes = nodes.filter(n => n.type === 'chapter');
    
    const chapters: ChapterNode[] = chapterNodes.map(chNode => {
      const chapterEdges = edges.filter(e => e.source === chNode.id);
      const sceneNodes = chapterEdges
        .map(e => nodes.find(n => n.id === e.target))
        .filter(n => n?.type === 'scene');
      
      return {
        id: chNode.id,
        name: chNode.data.label,
        scenes: sceneNodes.map(sNode => ({
          id: sNode!.id,
          name: sNode!.data.label,
          content: ''
        }))
      };
    });
    
    set((state) => ({
      bookStructure: {
        title: rootNode?.data.label || state.bookStructure.title,
        chapters
      }
    }));
  },
  
  syncToMindMap: () => {
    const state = get();
    const nodes: MindMapNode[] = [];
    const edges: MindMapEdge[] = [];
    
    // Créer le nœud racine
    const rootNode: MindMapNode = {
      id: 'root',
      type: 'root',
      data: {
        label: state.bookStructure.title,
        nodeData: { title: state.bookStructure.title }
      },
      position: { x: 400, y: 50 }
    };
    nodes.push(rootNode);
    
    // Créer les nœuds de chapitres et scènes
    state.bookStructure.chapters.forEach((chapter, chIndex) => {
      const chapterNode: MindMapNode = {
        id: chapter.id,
        type: 'chapter',
        data: { label: chapter.name, nodeData: chapter },
        position: { x: 200 + chIndex * 300, y: 200 }
      };
      nodes.push(chapterNode);
      edges.push({
        id: `edge-root-${chapter.id}`,
        source: 'root',
        target: chapter.id
      });
      
      chapter.scenes.forEach((scene, scIndex) => {
        const sceneNode: MindMapNode = {
          id: scene.id,
          type: 'scene',
          data: { label: scene.name, nodeData: scene },
          position: { x: 200 + chIndex * 300, y: 350 + scIndex * 100 }
        };
        nodes.push(sceneNode);
        edges.push({
          id: `edge-${chapter.id}-${scene.id}`,
          source: chapter.id,
          target: scene.id
        });
      });
    });
    
    set({ mindMapNodes: nodes, mindMapEdges: edges });
  },
  
  saveProject: async () => {
    const state = get();
    if (!state.projectPath || !window.electronAPI) return;
    
    await window.electronAPI.createChapterStructure(
      state.projectPath,
      state.bookStructure.chapters
    );
    
    // Sauvegarder chaque scène
    for (const chapter of state.bookStructure.chapters) {
      for (const scene of chapter.scenes) {
        if (scene.content) {
          const filePath = `${state.projectPath}/${chapter.id}-${chapter.name}/${scene.id}-${scene.name}.md`;
          await window.electronAPI.saveMarkdownFile(filePath, scene.content);
        }
      }
    }
  }
}));
