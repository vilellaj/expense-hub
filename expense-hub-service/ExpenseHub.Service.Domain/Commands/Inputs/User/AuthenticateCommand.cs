using ExpenseHub.Service.Shared.Commands;

namespace ExpenseHub.Service.Domain.Commands
{
    public class AuthenticateCommand : ICommand
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
