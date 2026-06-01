import React, { useState } from 'react';
import { useBookStore } from '../store';

export const Sidebar: React.FC = () => {
  const { 
    bookStructure, 
    setCurrentScene, 
    addScene,
    deleteChapter,
    deleteScene,
    syncToMindMap,
    currentScene
  } = useBookStore();
  
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [addingSceneToChapter, setAddingSceneToChapter] = useState<string | null>(null);
  const [newSceneName, setNewSceneName] = useState('');
  
  const toggleChapter = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };
  
  const handleAddScene = (chapterId: string) => {
    if (newSceneName.trim()) {
      addScene(chapterId, newSceneName.trim());
      syncToMindMap();
      setNewSceneName('');
      setAddingSceneToChapter(null);
    }
  };
  
  const handleDeleteChapter = (chapterId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chapitre ?')) {
      deleteChapter(chapterId);
      syncToMindMap();
    }
  };
  
  const handleDeleteScene = (chapterId: string, sceneId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette scène ?')) {
      deleteScene(chapterId, sceneId);
      syncToMindMap();
    }
  };
  
  return (
    <div style={{
      width: '280px',
      background: '#ecf0f1',
      borderRight: '1px solid #bdc3c7',
      overflow: 'auto',
      padding: '15px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>
        📋 Structure du Livre
      </h3>
      
      {bookStructure.chapters.length === 0 ? (
        <div style={{ color: '#7f8c8d', fontSize: '14px', fontStyle: 'italic' }}>
          Aucun chapitre. Créez-en un avec le bouton "Nouveau Chapitre" ci-dessus.
        </div>
      ) : (
        bookStructure.chapters.map((chapter, chIndex) => (
          <div key={chapter.id} style={{ marginBottom: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px',
              background: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <span onClick={() => toggleChapter(chapter.id)} style={{ flex: 1 }}>
                {expandedChapters.has(chapter.id) ? '📂' : '📁'} {chIndex + 1}. {chapter.name}
              </span>
              <button
                onClick={() => setAddingSceneToChapter(chapter.id)}
                style={smallButtonStyle}
                title="Ajouter une scène"
              >
                ➕
              </button>
              <button
                onClick={() => handleDeleteChapter(chapter.id)}
                style={{ ...smallButtonStyle, background: '#e74c3c' }}
                title="Supprimer le chapitre"
              >
                🗑️
              </button>
            </div>
            
            {expandedChapters.has(chapter.id) && (
              <div style={{ marginLeft: '20px', marginTop: '8px' }}>
                {addingSceneToChapter === chapter.id && (
                  <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={newSceneName}
                      onChange={(e) => setNewSceneName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddScene(chapter.id)}
                      placeholder="Nom de la scène"
                      style={{
                        flex: 1,
                        padding: '6px',
                        borderRadius: '4px',
                        border: '1px solid #bdc3c7',
                        fontSize: '13px'
                      }}
                      autoFocus
                    />
                    <button onClick={() => handleAddScene(chapter.id)} style={tinyButtonStyle}>✓</button>
                    <button onClick={() => {
                      setAddingSceneToChapter(null);
                      setNewSceneName('');
                    }} style={tinyButtonStyle}>✗</button>
                  </div>
                )}
                
                {chapter.scenes.map((scene, scIndex) => (
                  <div
                    key={scene.id}
                    onClick={() => setCurrentScene(chapter.id, scene.id)}
                    style={{
                      padding: '8px 10px',
                      background: currentScene?.sceneId === scene.id ? '#3498db' : '#fff',
                      color: currentScene?.sceneId === scene.id ? 'white' : '#2c3e50',
                      borderRadius: '4px',
                      marginBottom: '5px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '13px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                  >
                    <span>📝 {scIndex + 1}. {scene.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteScene(chapter.id, scene.id);
                      }}
                      style={{
                        ...tinyButtonStyle,
                        background: currentScene?.sceneId === scene.id ? '#e74c3c' : '#e74c3c'
                      }}
                      title="Supprimer la scène"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const smallButtonStyle: React.CSSProperties = {
  padding: '4px 8px',
  background: '#3498db',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
};

const tinyButtonStyle: React.CSSProperties = {
  padding: '2px 6px',
  background: '#95a5a6',
  color: 'white',
  border: 'none',
  borderRadius: '3px',
  cursor: 'pointer',
  fontSize: '11px'
};
