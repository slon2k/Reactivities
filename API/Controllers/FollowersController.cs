using System.Threading.Tasks;
using Application.Followers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/profiles")]
    [ApiController]
    public class FollowersController : ControllerBase
    {
        private readonly IMediator _mediator;
        public FollowersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("{username}/follow")]
        public async Task<ActionResult<Unit>> Follow(string username)
        {
            return await _mediator.Send(new Add.Command{UserName = username});            
        }

        [HttpDelete("{username}/follow")]
        public async Task<ActionResult<Unit>> Unfollow(string username)
        {
            return await _mediator.Send(new Delete.Command{UserName = username});            
        }       
    }
}