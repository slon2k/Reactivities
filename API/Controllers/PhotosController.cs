using System.Threading.Tasks;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PhotosController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm]Add.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }

        [HttpPost("{id}/setmain")]
        public async Task<ActionResult<Unit>> SetMain(string id)
        {
            return await _mediator.Send(new SetMain.Command{Id = id});
        }
    }
}