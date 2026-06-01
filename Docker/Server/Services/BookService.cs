using Newtonsoft.Json;
using MindMapBookWriter.Shared.Models;
using System.Text;
using System.Linq;

namespace MindMapBookWriter.Server.Services
{
    public class BookService
    {
        private readonly string _dataPath;
        private BookStructure _currentBook;

        public BookService()
        {
            _dataPath = Path.Combine(Directory.GetCurrentDirectory(), "data");
            Directory.CreateDirectory(_dataPath);
            _currentBook = new BookStructure();
        }

        public async Task<BookStructure> GetBookStructureAsync()
        {
            var structurePath = Path.Combine(_dataPath, "book-structure.json");
            if (File.Exists(structurePath))
            {
                var json = await File.ReadAllTextAsync(structurePath);
                _currentBook = JsonConvert.DeserializeObject<BookStructure>(json) ?? new BookStructure();
            }
            return _currentBook;
        }

        public async Task SaveBookStructureAsync(BookStructure book)
        {
            _currentBook = book;
            var structurePath = Path.Combine(_dataPath, "book-structure.json");
            var json = JsonConvert.SerializeObject(book, Formatting.Indented);
            await File.WriteAllTextAsync(structurePath, json);

            foreach (var chapter in book.Chapters)
            {
                var chapterPath = Path.Combine(_dataPath, SanitizeFileName(chapter.Name));
                Directory.CreateDirectory(chapterPath);

                foreach (var scene in chapter.Scenes)
                {
                    var scenePath = Path.Combine(chapterPath, $"{SanitizeFileName(scene.Name)}.md");
                    if (!File.Exists(scenePath))
                    {
                        await File.WriteAllTextAsync(scenePath, $"# {scene.Name}\n\n{scene.Content}", Encoding.UTF8);
                    }
                }
            }
        }

        public async Task<string> GetSceneContentAsync(string chapterId, string sceneId)
        {
            var chapter = _currentBook.Chapters.FirstOrDefault(c => c.Id == chapterId);
            var scene = chapter?.Scenes.FirstOrDefault(s => s.Id == sceneId);

            if (scene != null && !string.IsNullOrEmpty(scene.MarkdownPath) && File.Exists(scene.MarkdownPath))
            {
                return await File.ReadAllTextAsync(scene.MarkdownPath);
            }

            return string.Empty;
        }

        public async Task SaveSceneContentAsync(string chapterId, string sceneId, string content)
        {
            var chapter = _currentBook.Chapters.FirstOrDefault(c => c.Id == chapterId);
            var scene = chapter?.Scenes.FirstOrDefault(s => s.Id == sceneId);

            if (scene != null && !string.IsNullOrEmpty(scene.MarkdownPath))
            {
                await File.WriteAllTextAsync(scene.MarkdownPath, content, Encoding.UTF8);
            }
        }

        private string SanitizeFileName(string name)
        {
            var invalidChars = Path.GetInvalidFileNameChars();
            return string.Join("_", name.Split(invalidChars, StringSplitOptions.RemoveEmptyEntries)).TrimEnd('.');
        }
    }
}
