using ExpenseHub.Service.Domain.DTOs;
using ExpenseHub.Service.Shared.Commands;

namespace ExpenseHub.Service.Domain.Commands.Results
{
    public class AuthenticateUserResult : ICommandResult
    {
        public UserDTO User { get; set; }
        public string Token { get; set; }
    }
}
