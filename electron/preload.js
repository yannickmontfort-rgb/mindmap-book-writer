const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectProjectFolder: () => ipcRenderer.invoke('select-project-folder'),
  saveMarkdownFile: (filePath, content) => 
    ipcRenderer.invoke('save-markdown-file', { filePath, content }),
  readMarkdownFile: (filePath) => 
    ipcRenderer.invoke('read-markdown-file', filePath),
  createChapterStructure: (projectPath, chapters) =>
    ipcRenderer.invoke('create-chapter-structure', { projectPath, chapters }),
  listProjectFiles: (projectPath) =>
    ipcRenderer.invoke('list-project-files', projectPath)
});
