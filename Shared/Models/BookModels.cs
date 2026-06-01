using System.Collections.Generic;

namespace MindMapBookWriter.Shared.Models
{
    public class BookStructure
    {
        public string Title { get; set; } = "Mon Livre";
        public List<Chapter> Chapters { get; set; } = new();
    }

    public class Chapter
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public List<Scene> Scenes { get; set; } = new();
    }

    public class Scene
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string MarkdownPath { get; set; } = string.Empty;
    }

    public enum NodeType
    {
        Root,
        Chapter,
        Scene
    }

    public class MindMapNode
    {
        public string Id { get; set; } = string.Empty;
        public NodeType Type { get; set; }
        public string Label { get; set; } = string.Empty;
        public double X { get; set; }
        public double Y { get; set; }
        public object? Data { get; set; }
    }

    public class MindMapConnection
    {
        public string SourceId { get; set; } = string.Empty;
        public string TargetId { get; set; } = string.Empty;
    }
}
