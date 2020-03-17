namespace ExpenseHub.Service.Domain.Commands
{
    public class AuthenticateCommand
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
