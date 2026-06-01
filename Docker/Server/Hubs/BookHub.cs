using Microsoft.AspNetCore.SignalR;
using MindMapBookWriter.Shared.Models;

namespace MindMapBookWriter.Server.Hubs
{
    public class BookHub : Hub
    {
        public async Task SendBookUpdate(BookStructure book)
        {
            await Clients.Others.SendAsync("ReceiveBookUpdate", book);
        }

        public async Task SendSceneUpdate(string chapterId, string sceneId, string content)
        {
            await Clients.Others.SendAsync("ReceiveSceneUpdate", chapterId, sceneId, content);
        }
    }
}
