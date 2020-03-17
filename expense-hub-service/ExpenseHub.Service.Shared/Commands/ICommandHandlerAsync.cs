using System.Threading.Tasks;

namespace ExpenseHub.Service.Shared.Commands
{
    public interface ICommandHandlerAsync<in T> where T : ICommand
    {
        Task<ICommandResult> Handle(T command);
    }
}
