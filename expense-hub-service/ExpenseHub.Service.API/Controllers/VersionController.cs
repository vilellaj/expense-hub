using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace ExpenseHub.Service.API.Controllers
{
    public class VersionController : Controller
    {
        [HttpGet("api/version")]
        public IActionResult ObterVersao()
        {
            return Ok(new
            {
                Versao = typeof(Startup).GetTypeInfo()
                    .Assembly
                    .GetCustomAttribute<AssemblyInformationalVersionAttribute>()
                    .InformationalVersion
            });
        }
    }
}
