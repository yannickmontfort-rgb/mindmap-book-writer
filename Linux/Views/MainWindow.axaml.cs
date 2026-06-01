using Avalonia.Controls;
using Avalonia.Input;
using MindMapBookWriter.Shared.Models;
using MindMapBookWriter.ViewModels;

namespace MindMapBookWriter.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Scene_PointerPressed(object? sender, PointerPressedEventArgs e)
        {
            if (sender is Border border && border.DataContext is Scene scene)
            {
                if (DataContext is MainViewModel viewModel)
                {
                    viewModel.SelectSceneCommand.Execute(scene);
                }
            }
        }
    }
}
