using ExpenseHub.Service.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpenseHub.Service.Infra.DataContexts
{
    public class AppDataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=expensehub.db");
    }
}
