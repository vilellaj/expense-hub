using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseHub.Service.Domain.Entities
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }

        public List<Expense> Expenses { get; set; }
    }
}
