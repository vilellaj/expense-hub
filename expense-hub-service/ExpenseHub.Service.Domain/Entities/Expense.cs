using System;
using System.Collections.Generic;
using System.Text;

namespace ExpenseHub.Service.Domain.Entities
{
    public class Expense
    {
        public int ExpenseId { get; set; }
        public string Descricao { get; set; }
        public DateTime Date { get; set; }
        public decimal Valor { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
