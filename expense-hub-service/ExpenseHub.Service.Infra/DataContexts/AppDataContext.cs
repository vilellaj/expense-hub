using ExpenseHub.Service.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpenseHub.Service.Infra.DataContexts
{
    public class AppDataContext : DbContext
    {
        public AppDataContext(DbContextOptions<AppDataContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }
    }
}
