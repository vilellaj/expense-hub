using System;
using ExpenseHub.Service.Shared.Commands;

namespace ExpenseHub.Service.Domain.Commands
{
    public class AddExpenseCommand : ICommand
    {
        public string Description { get; set; }
        public decimal Value { get; set; }
        public DateTime Date { get; set; }
        public long UserId { get; set; }
    }
}
