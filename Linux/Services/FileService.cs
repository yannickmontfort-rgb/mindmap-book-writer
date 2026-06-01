using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MindMapBookWriter.Shared.Models;
using Newtonsoft.Json;

namespace MindMapBookWriter.Services
{
    public class FileService
    {
        public async Task SaveBookStructureAsync(string projectPath, BookStructure bookStructure)
        {
            // Créer le dossier du projet s'il n'existe pas
            Directory.CreateDirectory(projectPath);

            // Sauvegarder la structure en JSON
            var structurePath = Path.Combine(projectPath, "book-structure.json");
            var json = JsonConvert.SerializeObject(bookStructure, Formatting.Indented);
            await File.WriteAllTextAsync(structurePath, json);

            // Créer les dossiers et fichiers pour chaque chapitre
            foreach (var chapter in bookStructure.Chapters)
            {
                var chapterFolder = Path.Combine(projectPath, $"{chapter.Id}-{SanitizeFileName(chapter.Name)}");
                Directory.CreateDirectory(chapterFolder);

                foreach (var scene in chapter.Scenes)
                {
                    var sceneFile = Path.Combine(chapterFolder, $"{scene.Id}-{SanitizeFileName(scene.Name)}.md");
                    
                    // Créer le contenu du fichier avec un en-tête
                    var content = $"# {scene.Name}\n\n*Scène du chapitre: {chapter.Name}*\n\n---\n\n{scene.Content}";
                    
                    await File.WriteAllTextAsync(sceneFile, content);
                    scene.MarkdownPath = sceneFile;
                }
            }
        }

        public async Task<BookStructure?> LoadBookStructureAsync(string projectPath)
        {
            var structurePath = Path.Combine(projectPath, "book-structure.json");
            
            if (!File.Exists(structurePath))
            {
                // Essayer de reconstruire depuis les fichiers
                return await ReconstructFromFilesAsync(projectPath);
            }

            var json = await File.ReadAllTextAsync(structurePath);
            var bookStructure = JsonConvert.DeserializeObject<BookStructure>(json);

            if (bookStructure != null)
            {
                // Charger le contenu des fichiers markdown
                foreach (var chapter in bookStructure.Chapters)
                {
                    foreach (var scene in chapter.Scenes)
                    {
                        if (!string.IsNullOrEmpty(scene.MarkdownPath) && File.Exists(scene.MarkdownPath))
                        {
                            var content = await File.ReadAllTextAsync(scene.MarkdownPath);
                            // Extraire le contenu après le séparateur
                            var separator = "---\n\n";
                            var index = content.IndexOf(separator);
                            if (index >= 0)
                            {
                                scene.Content = content.Substring(index + separator.Length);
                            }
                            else
                            {
                                scene.Content = content;
                            }
                        }
                    }
                }
            }

            return bookStructure;
        }

        private async Task<BookStructure?> ReconstructFromFilesAsync(string projectPath)
        {
            var bookStructure = new BookStructure();
            
            var chapterDirs = Directory.GetDirectories(projectPath)
                .Where(d => Path.GetFileName(d).StartsWith("chapter-"))
                .OrderBy(d => d);

            foreach (var chapterDir in chapterDirs)
            {
                var dirName = Path.GetFileName(chapterDir);
                var parts = dirName.Split('-', 2);
                
                if (parts.Length < 2) continue;

                var chapter = new Chapter
                {
                    Id = parts[0],
                    Name = parts[1]
                };

                var sceneFiles = Directory.GetFiles(chapterDir, "*.md")
                    .OrderBy(f => f);

                foreach (var sceneFile in sceneFiles)
                {
                    var fileName = Path.GetFileNameWithoutExtension(sceneFile);
                    var sceneParts = fileName.Split('-', 2);
                    
                    if (sceneParts.Length < 2) continue;

                    var content = await File.ReadAllTextAsync(sceneFile);
                    var separator = "---\n\n";
                    var index = content.IndexOf(separator);
                    if (index >= 0)
                    {
                        content = content.Substring(index + separator.Length);
                    }

                    var scene = new Scene
                    {
                        Id = sceneParts[0],
                        Name = sceneParts[1],
                        Content = content,
                        MarkdownPath = sceneFile
                    };

                    chapter.Scenes.Add(scene);
                }

                bookStructure.Chapters.Add(chapter);
            }

            return bookStructure;
        }

        private string SanitizeFileName(string fileName)
        {
            var invalid = Path.GetInvalidFileNameChars();
            return string.Join("_", fileName.Split(invalid, StringSplitOptions.RemoveEmptyEntries));
        }
    }
}
