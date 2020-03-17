using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseHub.Service.Domain.Entities
{
    public class Expense
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ExpenseId { get; set; }

        public string Descricao { get; set; }
        public DateTime Date { get; set; }
        public decimal Valor { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
