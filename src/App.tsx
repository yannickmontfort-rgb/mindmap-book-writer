import React, { useState } from 'react';
import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { MindMapEditor } from './components/MindMapEditor';
import { MarkdownEditor } from './components/MarkdownEditor';
import { useBookStore } from './store';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState<'mindmap' | 'editor'>('mindmap');
  const { setCurrentScene } = useBookStore();
  
  const handleNodeClick = (nodeId: string, nodeType: string) => {
    if (nodeType === 'scene') {
      // Trouver le chapitre parent et la scène
      const bookStructure = useBookStore.getState().bookStructure;
      for (const chapter of bookStructure.chapters) {
        const scene = chapter.scenes.find(s => s.id === nodeId);
        if (scene) {
          setCurrentScene(chapter.id, scene.id);
          setActiveView('editor');
          break;
        }
      }
    }
  };
  
  return (
    <div className="app-container">
      <Toolbar />
      
      <div className="main-content">
        <Sidebar />
        
        <div className="work-area">
          <div className="view-switcher">
            <button
              className={activeView === 'mindmap' ? 'active' : ''}
              onClick={() => setActiveView('mindmap')}
            >
              🗺️ Carte Mentale
            </button>
            <button
              className={activeView === 'editor' ? 'active' : ''}
              onClick={() => setActiveView('editor')}
            >
              ✍️ Éditeur
            </button>
          </div>
          
          <div className="view-content">
            {activeView === 'mindmap' ? (
              <MindMapEditor onNodeClick={handleNodeClick} />
            ) : (
              <MarkdownEditor />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
