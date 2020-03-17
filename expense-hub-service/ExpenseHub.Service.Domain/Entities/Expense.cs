using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseHub.Service.Domain.Entities
{
    public class Expense : TEntity
    {
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public decimal Value { get; set; }
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
