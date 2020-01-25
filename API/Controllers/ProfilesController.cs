using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Authorization;
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
            return await _mediator.Send(new Details.Query { UserName = username });
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<Unit>> Update(Update.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet("{username}/activities")]
        public async Task<ActionResult<List<UserActivityDto>>> GetUserActivities(string username, string predicate)
        {
            return await _mediator.Send(new ListActivities.Query{UserName = username, Predicate = predicate});
            
        }

    }
}