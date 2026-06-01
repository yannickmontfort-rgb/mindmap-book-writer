// Types pour la carte mentale et la structure du livre

export interface SceneNode {
  id: string;
  name: string;
  content?: string;
  markdownPath?: string;
}

export interface ChapterNode {
  id: string;
  name: string;
  scenes: SceneNode[];
}

export interface BookStructure {
  title: string;
  chapters: ChapterNode[];
}

// Types pour React Flow
export interface MindMapNode {
  id: string;
  type: 'root' | 'chapter' | 'scene';
  data: {
    label: string;
    nodeData: ChapterNode | SceneNode | { title: string };
  };
  position: { x: number; y: number };
}

export interface MindMapEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

// Interface pour l'API Electron
export interface ElectronAPI {
  selectProjectFolder: () => Promise<string>;
  saveMarkdownFile: (filePath: string, content: string) => Promise<{ success: boolean; error?: string }>;
  readMarkdownFile: (filePath: string) => Promise<{ success: boolean; content?: string; error?: string }>;
  createChapterStructure: (projectPath: string, chapters: ChapterNode[]) => Promise<{ success: boolean; error?: string }>;
  listProjectFiles: (projectPath: string) => Promise<{ success: boolean; structure?: any; error?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
