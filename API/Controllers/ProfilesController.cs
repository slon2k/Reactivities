using System.Threading.Tasks;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProfilesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Get(string username) 
        {
            return await _mediator.Send(new Details.Query{UserName = username});

        }
    }
}