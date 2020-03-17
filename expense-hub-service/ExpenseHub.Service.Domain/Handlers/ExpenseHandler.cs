using ExpenseHub.Service.Domain.Commands;
using ExpenseHub.Service.Shared.Commands;
using Flunt.Notifications;
using System.Threading.Tasks;

namespace ExpenseHub.Service.Domain.Handlers
{
    public class ExpenseHandler : Notifiable,
        ICommandHandlerAsync<AddExpenseCommand>
    {
        public Task<ICommandResult> Handle(AddExpenseCommand command)
        {
            throw new System.NotImplementedException();
        }
    }
}
