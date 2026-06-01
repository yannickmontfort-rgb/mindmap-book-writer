using Microsoft.AspNetCore.Mvc;
using MindMapBookWriter.Server.Services;
using MindMapBookWriter.Shared.Models;

namespace MindMapBookWriter.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<ActionResult<BookStructure>> GetBook()
        {
            var book = await _bookService.GetBookStructureAsync();
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult> SaveBook([FromBody] BookStructure book)
        {
            await _bookService.SaveBookStructureAsync(book);
            return Ok();
        }

        [HttpGet("chapter/{chapterId}/scene/{sceneId}")]
        public async Task<ActionResult<string>> GetSceneContent(string chapterId, string sceneId)
        {
            var content = await _bookService.GetSceneContentAsync(chapterId, sceneId);
            return Ok(content);
        }

        [HttpPost("chapter/{chapterId}/scene/{sceneId}")]
        public async Task<ActionResult> SaveSceneContent(string chapterId, string sceneId, [FromBody] string content)
        {
            await _bookService.SaveSceneContentAsync(chapterId, sceneId, content);
            return Ok();
        }
    }
}
