import React, { useState } from 'react';
import { useBookStore } from '../store';

export const Toolbar: React.FC = () => {
  const { 
    projectPath, 
    setProjectPath, 
    bookStructure,
    setBookTitle,
    addChapter, 
    syncToMindMap,
    saveProject 
  } = useBookStore();
  
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [newChapterName, setNewChapterName] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(bookStructure.title);
  
  const handleSelectProject = async () => {
    if (window.electronAPI) {
      const path = await window.electronAPI.selectProjectFolder();
      if (path) {
        setProjectPath(path);
      }
    }
  };
  
  const handleAddChapter = () => {
    if (newChapterName.trim()) {
      addChapter(newChapterName.trim());
      syncToMindMap();
      setNewChapterName('');
      setIsAddingChapter(false);
    }
  };
  
  const handleUpdateTitle = () => {
    if (newTitle.trim()) {
      setBookTitle(newTitle.trim());
      syncToMindMap();
      setIsEditingTitle(false);
    }
  };
  
  return (
    <div style={{
      padding: '15px 20px',
      background: '#2c3e50',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      borderBottom: '2px solid #34495e'
    }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        📚 MindMap Book Writer
      </div>
      
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isEditingTitle ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUpdateTitle()}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                border: 'none',
                fontSize: '14px'
              }}
              placeholder="Titre du livre"
              autoFocus
            />
            <button onClick={handleUpdateTitle} style={buttonStyle}>✓</button>
            <button onClick={() => {
              setIsEditingTitle(false);
              setNewTitle(bookStructure.title);
            }} style={buttonStyle}>✗</button>
          </>
        ) : (
          <>
            <span style={{ fontSize: '16px' }}>Livre: {bookStructure.title}</span>
            <button onClick={() => setIsEditingTitle(true)} style={buttonStyle}>✏️</button>
          </>
        )}
      </div>
      
      {!projectPath ? (
        <button onClick={handleSelectProject} style={primaryButtonStyle}>
          📁 Sélectionner un dossier de projet
        </button>
      ) : (
        <span style={{ fontSize: '12px', color: '#bdc3c7' }}>
          📂 {projectPath}
        </span>
      )}
      
      {isAddingChapter ? (
        <div style={{ display: 'flex', gap: '5px' }}>
          <input
            type="text"
            value={newChapterName}
            onChange={(e) => setNewChapterName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddChapter()}
            placeholder="Nom du chapitre"
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              fontSize: '14px'
            }}
            autoFocus
          />
          <button onClick={handleAddChapter} style={buttonStyle}>✓</button>
          <button onClick={() => {
            setIsAddingChapter(false);
            setNewChapterName('');
          }} style={buttonStyle}>✗</button>
        </div>
      ) : (
        <button onClick={() => setIsAddingChapter(true)} style={primaryButtonStyle}>
          ➕ Nouveau Chapitre
        </button>
      )}
      
      <button onClick={async () => {
        await saveProject();
        alert('Projet sauvegardé !');
      }} style={primaryButtonStyle}>
        💾 Sauvegarder
      </button>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  background: '#34495e',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
};

const primaryButtonStyle: React.CSSProperties = {
  ...buttonStyle,
  background: '#3498db',
  fontWeight: '600'
};
