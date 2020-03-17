using ExpenseHub.Service.Domain.Entities;
using ExpenseHub.Service.Infra.DataContexts;
using System.Linq;

namespace ExpenseHub.Service.Infra
{
    public class DbInitializer
    {
        public static void Initialize(AppDataContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return; 
            }

            context.Users.Add(new User() { 
                Username = "test",
                Password = "123"
            });

            context.SaveChanges();
        }
    }
}
