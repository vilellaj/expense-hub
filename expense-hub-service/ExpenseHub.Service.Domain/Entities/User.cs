using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseHub.Service.Domain.Entities
{
    public class User : TEntity
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public List<Expense> Expenses { get; set; }
    }
}
