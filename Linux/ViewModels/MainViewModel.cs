using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Input;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using MindMapBookWriter.Shared.Models;
using MindMapBookWriter.Services;
using Microsoft.Win32;

namespace MindMapBookWriter.ViewModels
{
    public partial class MainViewModel : ObservableObject
    {
        private readonly FileService _fileService;

        [ObservableProperty]
        private BookStructure _bookStructure;

        [ObservableProperty]
        private string? _projectPath;

        [ObservableProperty]
        private Chapter? _selectedChapter;

        [ObservableProperty]
        private Scene? _selectedScene;

        [ObservableProperty]
        private string _currentSceneContent = string.Empty;

        [ObservableProperty]
        private bool _isMindMapView = true;

        [ObservableProperty]
        private ObservableCollection<MindMapNode> _mindMapNodes;

        [ObservableProperty]
        private ObservableCollection<MindMapConnection> _mindMapConnections;

        public MainViewModel()
        {
            _fileService = new FileService();
            _bookStructure = new BookStructure();
            _mindMapNodes = new ObservableCollection<MindMapNode>();
            _mindMapConnections = new ObservableCollection<MindMapConnection>();

            // Initialiser avec un exemple
            SyncToMindMap();
        }

        [RelayCommand]
        private void SelectProjectFolder()
        {
            var dialog = new OpenFolderDialog
            {
                Title = "Sélectionner le dossier du projet"
            };

            if (dialog.ShowDialog() == true)
            {
                ProjectPath = dialog.FolderName;
            }
        }

        [RelayCommand]
        private void AddChapter()
        {
            var chapter = new Chapter
            {
                Id = $"chapter-{DateTime.Now.Ticks}",
                Name = $"Chapitre {BookStructure.Chapters.Count + 1}"
            };

            BookStructure.Chapters.Add(chapter);
            SyncToMindMap();
        }

        [RelayCommand]
        private void DeleteChapter(Chapter chapter)
        {
            BookStructure.Chapters.Remove(chapter);
            if (SelectedChapter == chapter)
            {
                SelectedChapter = null;
                SelectedScene = null;
            }
            SyncToMindMap();
        }

        [RelayCommand]
        private void AddScene(Chapter chapter)
        {
            var scene = new Scene
            {
                Id = $"scene-{DateTime.Now.Ticks}",
                Name = $"Scène {chapter.Scenes.Count + 1}"
            };

            chapter.Scenes.Add(scene);
            SyncToMindMap();
        }

        [RelayCommand]
        private void DeleteScene(Scene scene)
        {
            foreach (var chapter in BookStructure.Chapters)
            {
                if (chapter.Scenes.Contains(scene))
                {
                    chapter.Scenes.Remove(scene);
                    if (SelectedScene == scene)
                    {
                        SelectedScene = null;
                    }
                    break;
                }
            }
            SyncToMindMap();
        }

        [RelayCommand]
        private void SelectScene(Scene scene)
        {
            SelectedScene = scene;
            CurrentSceneContent = scene.Content;

            // Trouver le chapitre parent
            foreach (var chapter in BookStructure.Chapters)
            {
                if (chapter.Scenes.Contains(scene))
                {
                    SelectedChapter = chapter;
                    break;
                }
            }

            // Basculer vers l'éditeur
            IsMindMapView = false;
        }

        [RelayCommand]
        private async Task SaveProject()
        {
            if (string.IsNullOrEmpty(ProjectPath))
            {
                SelectProjectFolder();
                if (string.IsNullOrEmpty(ProjectPath))
                    return;
            }

            try
            {
                // Mettre à jour le contenu de la scène actuelle
                if (SelectedScene != null)
                {
                    SelectedScene.Content = CurrentSceneContent;
                }

                // Sauvegarder tous les fichiers
                await _fileService.SaveBookStructureAsync(ProjectPath, BookStructure);

                System.Windows.MessageBox.Show(
                    "Projet sauvegardé avec succès !",
                    "Sauvegarde",
                    System.Windows.MessageBoxButton.OK,
                    System.Windows.MessageBoxImage.Information);
            }
            catch (Exception ex)
            {
                System.Windows.MessageBox.Show(
                    $"Erreur lors de la sauvegarde : {ex.Message}",
                    "Erreur",
                    System.Windows.MessageBoxButton.OK,
                    System.Windows.MessageBoxImage.Error);
            }
        }

        [RelayCommand]
        private async Task LoadProject()
        {
            SelectProjectFolder();
            if (string.IsNullOrEmpty(ProjectPath))
                return;

            try
            {
                var loadedStructure = await _fileService.LoadBookStructureAsync(ProjectPath);
                if (loadedStructure != null)
                {
                    BookStructure = loadedStructure;
                    SyncToMindMap();
                }
            }
            catch (Exception ex)
            {
                System.Windows.MessageBox.Show(
                    $"Erreur lors du chargement : {ex.Message}",
                    "Erreur",
                    System.Windows.MessageBoxButton.OK,
                    System.Windows.MessageBoxImage.Error);
            }
        }

        [RelayCommand]
        private void SwitchToMindMap()
        {
            IsMindMapView = true;
        }

        [RelayCommand]
        private void SwitchToEditor()
        {
            IsMindMapView = false;
        }

        partial void OnCurrentSceneContentChanged(string value)
        {
            if (SelectedScene != null)
            {
                SelectedScene.Content = value;
            }
        }

        private void SyncToMindMap()
        {
            MindMapNodes.Clear();
            MindMapConnections.Clear();

            // Nœud racine
            var rootNode = new MindMapNode
            {
                Id = "root",
                Type = NodeType.Root,
                Label = BookStructure.Title,
                X = 400,
                Y = 50
            };
            MindMapNodes.Add(rootNode);

            // Nœuds de chapitres et scènes
            for (int chIndex = 0; chIndex < BookStructure.Chapters.Count; chIndex++)
            {
                var chapter = BookStructure.Chapters[chIndex];
                var chapterNode = new MindMapNode
                {
                    Id = chapter.Id,
                    Type = NodeType.Chapter,
                    Label = chapter.Name,
                    X = 100 + chIndex * 300,
                    Y = 200,
                    Data = chapter
                };
                MindMapNodes.Add(chapterNode);

                // Connexion root -> chapter
                MindMapConnections.Add(new MindMapConnection
                {
                    SourceId = "root",
                    TargetId = chapter.Id
                });

                // Nœuds de scènes
                for (int scIndex = 0; scIndex < chapter.Scenes.Count; scIndex++)
                {
                    var scene = chapter.Scenes[scIndex];
                    var sceneNode = new MindMapNode
                    {
                        Id = scene.Id,
                        Type = NodeType.Scene,
                        Label = scene.Name,
                        X = 100 + chIndex * 300,
                        Y = 350 + scIndex * 100,
                        Data = scene
                    };
                    MindMapNodes.Add(sceneNode);

                    // Connexion chapter -> scene
                    MindMapConnections.Add(new MindMapConnection
                    {
                        SourceId = chapter.Id,
                        TargetId = scene.Id
                    });
                }
            }
        }
    }
}
