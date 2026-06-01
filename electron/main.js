const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // En développement, charger depuis le serveur Vite
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../react/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// API pour gérer les fichiers du projet
ipcMain.handle('select-project-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory', 'createDirectory']
  });
  return result.filePaths[0];
});

ipcMain.handle('save-markdown-file', async (event, { filePath, content }) => {
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('read-markdown-file', async (event, filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return { success: true, content };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-chapter-structure', async (event, { projectPath, chapters }) => {
  try {
    for (const chapter of chapters) {
      const chapterPath = path.join(projectPath, `${chapter.id}-${chapter.name}`);
      await fs.mkdir(chapterPath, { recursive: true });
      
      // Créer un fichier markdown pour chaque scène
      for (const scene of chapter.scenes) {
        const scenePath = path.join(chapterPath, `${scene.id}-${scene.name}.md`);
        const exists = await fs.access(scenePath).then(() => true).catch(() => false);
        
        if (!exists) {
          const template = `# ${scene.name}\n\n*Scène du chapitre: ${chapter.name}*\n\n---\n\n`;
          await fs.writeFile(scenePath, template, 'utf-8');
        }
      }
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('list-project-files', async (event, projectPath) => {
  try {
    const items = await fs.readdir(projectPath, { withFileTypes: true });
    const structure = [];
    
    for (const item of items) {
      if (item.isDirectory()) {
        const chapterPath = path.join(projectPath, item.name);
        const scenes = await fs.readdir(chapterPath);
        structure.push({
          name: item.name,
          type: 'chapter',
          scenes: scenes.filter(s => s.endsWith('.md'))
        });
      }
    }
    
    return { success: true, structure };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
