using Microsoft.AspNetCore.SignalR.Client;
using MindMapBookWriter.Shared.Models;

namespace MindMapBookWriter.Client.Services
{
    public class SignalRService
    {
        private HubConnection? _hubConnection;

        public async Task StartAsync()
        {
            _hubConnection = new HubConnectionBuilder()
                .WithUrl("http://localhost:5000/bookhub")
                .Build();

            _hubConnection.On<BookStructure>("ReceiveBookUpdate", (book) =>
            {
                // Handle book update from other clients
                Console.WriteLine("Book updated from another client");
            });

            _hubConnection.On<string, string, string>("ReceiveSceneUpdate", (chapterId, sceneId, content) =>
            {
                // Handle scene update from other clients
                Console.WriteLine($"Scene {sceneId} updated from another client");
            });

            await _hubConnection.StartAsync();
        }

        public async Task SendBookUpdateAsync(BookStructure book)
        {
            if (_hubConnection is not null)
            {
                await _hubConnection.SendAsync("SendBookUpdate", book);
            }
        }

        public async Task SendSceneUpdateAsync(string chapterId, string sceneId, string content)
        {
            if (_hubConnection is not null)
            {
                await _hubConnection.SendAsync("SendSceneUpdate", chapterId, sceneId, content);
            }
        }
    }
}
