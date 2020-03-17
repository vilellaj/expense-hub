using ExpenseHub.Service.Shared.Commands;

namespace ExpenseHub.Service.Domain.Commands.Results
{
    public class MessageResult : ICommandResult
    {
        public string Message { get; set; }
    }
}
