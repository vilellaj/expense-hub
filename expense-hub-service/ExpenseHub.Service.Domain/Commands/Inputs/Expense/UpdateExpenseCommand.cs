using System;
using ExpenseHub.Service.Shared.Commands;

namespace ExpenseHub.Service.Domain.Commands
{
    public class UpdateExpenseCommand : ICommand
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public decimal Value { get; set; }
    }
}
