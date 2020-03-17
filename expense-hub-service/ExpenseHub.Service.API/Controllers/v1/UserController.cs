using ExpenseHub.Service.Domain.Commands;
using ExpenseHub.Service.Domain.Handlers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ExpenseHub.Service.API.Controllers.v1
{
    [Route("api/v1/users")]
    public class UserController : Controller
    {
        private readonly UserHandler _handler;

        public UserController(UserHandler handler)
        {
            _handler = handler;
        }

        [HttpPost("auth")]
        public async Task<IActionResult> Authenticate([FromBody] AuthenticateCommand command)
        {
            var result = await _handler.Handle(command);

            if(_handler.Invalid)
            {
                return BadRequest(_handler.Notifications);
            }

            if(result != null)
            {
                return Ok(result);
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
