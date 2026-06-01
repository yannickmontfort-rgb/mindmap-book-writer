using System.Net.Http.Json;
using MindMapBookWriter.Shared.Models;

namespace MindMapBookWriter.Client.Services
{
    public class BookApiService
    {
        private readonly HttpClient _http;

        public BookApiService(HttpClient http)
        {
            _http = http;
        }

        public async Task<BookStructure> GetBookAsync()
        {
            return await _http.GetFromJsonAsync<BookStructure>("api/book") ?? new BookStructure();
        }

        public async Task SaveBookAsync(BookStructure book)
        {
            await _http.PostAsJsonAsync("api/book", book);
        }

        public async Task<string> GetSceneContentAsync(string chapterId, string sceneId)
        {
            return await _http.GetStringAsync($"api/book/chapter/{chapterId}/scene/{sceneId}");
        }

        public async Task SaveSceneContentAsync(string chapterId, string sceneId, string content)
        {
            await _http.PostAsJsonAsync($"api/book/chapter/{chapterId}/scene/{sceneId}", content);
        }
    }
}
