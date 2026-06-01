using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Shapes;
using MindMapBookWriter.Shared.Models;

namespace MindMapBookWriter.Controls
{
    public class MindMapControl : Canvas
    {
        private Point? _dragStartPoint;
        private UIElement? _draggedElement;
        private Point _dragOffset;

        public static readonly DependencyProperty NodesProperty =
            DependencyProperty.Register(nameof(Nodes), typeof(ObservableCollection<MindMapNode>),
                typeof(MindMapControl), new PropertyMetadata(null, OnNodesChanged));

        public static readonly DependencyProperty ConnectionsProperty =
            DependencyProperty.Register(nameof(Connections), typeof(ObservableCollection<MindMapConnection>),
                typeof(MindMapControl), new PropertyMetadata(null, OnConnectionsChanged));

        public ObservableCollection<MindMapNode> Nodes
        {
            get => (ObservableCollection<MindMapNode>)GetValue(NodesProperty);
            set => SetValue(NodesProperty, value);
        }

        public ObservableCollection<MindMapConnection> Connections
        {
            get => (ObservableCollection<MindMapConnection>)GetValue(ConnectionsProperty);
            set => SetValue(ConnectionsProperty, value);
        }

        public MindMapControl()
        {
            Background = new SolidColorBrush(Colors.White);
            ClipToBounds = true;
        }

        private static void OnNodesChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is MindMapControl control)
            {
                if (e.OldValue is ObservableCollection<MindMapNode> oldCollection)
                {
                    oldCollection.CollectionChanged -= control.OnNodesCollectionChanged;
                }

                if (e.NewValue is ObservableCollection<MindMapNode> newCollection)
                {
                    newCollection.CollectionChanged += control.OnNodesCollectionChanged;
                    control.RedrawNodes();
                }
            }
        }

        private static void OnConnectionsChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is MindMapControl control)
            {
                if (e.OldValue is ObservableCollection<MindMapConnection> oldCollection)
                {
                    oldCollection.CollectionChanged -= control.OnConnectionsCollectionChanged;
                }

                if (e.NewValue is ObservableCollection<MindMapConnection> newCollection)
                {
                    newCollection.CollectionChanged += control.OnConnectionsCollectionChanged;
                    control.RedrawConnections();
                }
            }
        }

        private void OnNodesCollectionChanged(object? sender, NotifyCollectionChangedEventArgs e)
        {
            RedrawNodes();
        }

        private void OnConnectionsCollectionChanged(object? sender, NotifyCollectionChangedEventArgs e)
        {
            RedrawConnections();
        }

        private void RedrawNodes()
        {
            Children.Clear();
            
            if (Nodes == null) return;

            // Dessiner d'abord les connexions (sous les nœuds)
            RedrawConnections();

            // Dessiner les nœuds
            foreach (var node in Nodes)
            {
                var nodeElement = CreateNodeElement(node);
                Children.Add(nodeElement);
                SetLeft(nodeElement, node.X);
                SetTop(nodeElement, node.Y);
            }
        }

        private void RedrawConnections()
        {
            if (Connections == null || Nodes == null) return;

            // Supprimer les anciennes connexions (lignes)
            var linesToRemove = new System.Collections.Generic.List<UIElement>();
            foreach (UIElement child in Children)
            {
                if (child is Line)
                    linesToRemove.Add(child);
            }
            foreach (var line in linesToRemove)
            {
                Children.Remove(line);
            }

            // Créer un dictionnaire pour accès rapide aux nœuds
            var nodeDict = new System.Collections.Generic.Dictionary<string, MindMapNode>();
            foreach (var node in Nodes)
            {
                nodeDict[node.Id] = node;
            }

            // Dessiner les connexions
            foreach (var connection in Connections)
            {
                if (nodeDict.TryGetValue(connection.SourceId, out var sourceNode) &&
                    nodeDict.TryGetValue(connection.TargetId, out var targetNode))
                {
                    var line = new Line
                    {
                        X1 = sourceNode.X + 75, // Centre du nœud source
                        Y1 = sourceNode.Y + 20,
                        X2 = targetNode.X + 75, // Centre du nœud cible
                        Y2 = targetNode.Y + 20,
                        Stroke = new SolidColorBrush(Color.FromRgb(189, 195, 199)),
                        StrokeThickness = 2
                    };

                    Children.Insert(0, line); // Insérer au début pour que ce soit sous les nœuds
                }
            }
        }

        private Border CreateNodeElement(MindMapNode node)
        {
            var border = new Border
            {
                CornerRadius = new CornerRadius(node.Type == NodeType.Root ? 10 : node.Type == NodeType.Chapter ? 8 : 6),
                Padding = new Thickness(node.Type == NodeType.Root ? 20 : node.Type == NodeType.Chapter ? 15 : 12),
                Cursor = Cursors.Hand,
                Tag = node
            };

            // Couleurs selon le type
            border.Background = node.Type switch
            {
                NodeType.Root => new SolidColorBrush(Color.FromRgb(74, 144, 226)),
                NodeType.Chapter => new SolidColorBrush(Color.FromRgb(80, 200, 120)),
                NodeType.Scene => new SolidColorBrush(Color.FromRgb(243, 156, 18)),
                _ => new SolidColorBrush(Colors.Gray)
            };

            // Effet d'ombre
            border.Effect = new System.Windows.Media.Effects.DropShadowEffect
            {
                BlurRadius = 5,
                ShadowDepth = 2,
                Opacity = 0.3
            };

            var textBlock = new TextBlock
            {
                Text = GetNodeIcon(node.Type) + " " + node.Label,
                Foreground = new SolidColorBrush(Colors.White),
                FontWeight = node.Type == NodeType.Root ? FontWeights.Bold : FontWeights.SemiBold,
                FontSize = node.Type == NodeType.Root ? 18 : node.Type == NodeType.Chapter ? 15 : 13
            };

            border.Child = textBlock;

            // Gestion des événements de souris pour le drag
            border.MouseLeftButtonDown += Node_MouseLeftButtonDown;
            border.MouseLeftButtonUp += Node_MouseLeftButtonUp;
            border.MouseMove += Node_MouseMove;

            return border;
        }

        private string GetNodeIcon(NodeType type)
        {
            return type switch
            {
                NodeType.Root => "📖",
                NodeType.Chapter => "📚",
                NodeType.Scene => "📝",
                _ => "•"
            };
        }

        private void Node_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (sender is Border border)
            {
                _draggedElement = border;
                _dragStartPoint = e.GetPosition(this);
                _dragOffset = e.GetPosition(border);
                border.CaptureMouse();
                e.Handled = true;
            }
        }

        private void Node_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            if (_draggedElement is Border border)
            {
                border.ReleaseMouseCapture();
                _draggedElement = null;
                _dragStartPoint = null;
                e.Handled = true;
            }
        }

        private void Node_MouseMove(object sender, MouseEventArgs e)
        {
            if (_draggedElement is Border border && _dragStartPoint.HasValue && e.LeftButton == MouseButtonState.Pressed)
            {
                var currentPosition = e.GetPosition(this);
                var newX = currentPosition.X - _dragOffset.X;
                var newY = currentPosition.Y - _dragOffset.Y;

                // Limiter aux bordures du canvas
                newX = System.Math.Max(0, System.Math.Min(ActualWidth - border.ActualWidth, newX));
                newY = System.Math.Max(0, System.Math.Min(ActualHeight - border.ActualHeight, newY));

                SetLeft(border, newX);
                SetTop(border, newY);

                // Mettre à jour la position dans le modèle
                if (border.Tag is MindMapNode node)
                {
                    node.X = newX;
                    node.Y = newY;
                }

                // Redessiner les connexions
                RedrawConnections();

                e.Handled = true;
            }
        }
    }
}
