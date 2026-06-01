using System.Windows;
using MindMapBookWriter.ViewModels;

namespace MindMapBookWriter
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            DataContext = new MainViewModel();
        }
    }
}
