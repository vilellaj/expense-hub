using ExpenseHub.Service.Domain.Commands;
using ExpenseHub.Service.Domain.Commands.Results;
using ExpenseHub.Service.Domain.Entities;
using ExpenseHub.Service.Domain.Repositories;
using ExpenseHub.Service.Shared.Commands;
using Flunt.Notifications;
using Mapster;
using System;
using System.Threading.Tasks;

namespace ExpenseHub.Service.Domain.Handlers
{
    public class ExpenseHandler : Notifiable,
        ICommandHandlerAsync<AddExpenseCommand>
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpenseHandler(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        public async Task<ICommandResult> Handle(AddExpenseCommand command)
        {
            ICommandResult result = null;

            try
            {
                var expense = new Expense();
                command.Adapt(expense);
                await _expenseRepository.Insert(expense);
                return new MessageResult("Item saved");
            }
            catch (Exception ex)
            {
                AddNotification("AddExpenseCommand", ex.Message);
            }

            return result;
        }
    }
}
