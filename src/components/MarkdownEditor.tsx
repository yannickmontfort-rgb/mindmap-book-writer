import React, { useEffect, useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useBookStore } from '../store';

export const MarkdownEditor: React.FC = () => {
  const { 
    currentScene, 
    currentSceneContent, 
    updateSceneContent, 
    bookStructure,
    saveProject 
  } = useBookStore();
  
  const [localContent, setLocalContent] = useState(currentSceneContent);
  
  useEffect(() => {
    setLocalContent(currentSceneContent);
  }, [currentSceneContent]);
  
  const handleChange = (value: string) => {
    setLocalContent(value);
    updateSceneContent(value);
  };
  
  const handleSave = async () => {
    await saveProject();
    alert('Projet sauvegardé !');
  };
  
  if (!currentScene) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#666',
        fontSize: '18px'
      }}>
        Sélectionnez une scène dans la carte mentale pour commencer à écrire
      </div>
    );
  }
  
  const chapter = bookStructure.chapters.find(ch => ch.id === currentScene.chapterId);
  const scene = chapter?.scenes.find(sc => sc.id === currentScene.sceneId);
  
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '15px 20px',
        background: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h3 style={{ margin: 0, color: '#333' }}>
            {chapter?.name} - {scene?.name}
          </h3>
        </div>
        <button
          onClick={handleSave}
          style={{
            padding: '8px 20px',
            background: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          💾 Sauvegarder
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        <SimpleMDE
          value={localContent}
          onChange={handleChange}
          options={{
            spellChecker: false,
            placeholder: 'Écrivez votre scène ici...',
            status: ['lines', 'words', 'cursor'],
            toolbar: [
              'bold', 'italic', 'heading', '|',
              'quote', 'unordered-list', 'ordered-list', '|',
              'link', 'image', '|',
              'preview', 'side-by-side', 'fullscreen', '|',
              'guide'
            ]
          }}
        />
      </div>
    </div>
  );
};
