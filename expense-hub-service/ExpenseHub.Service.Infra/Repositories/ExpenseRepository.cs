using ExpenseHub.Service.Domain.Entities;
using ExpenseHub.Service.Domain.Repositories;
using ExpenseHub.Service.Infra.DataContexts;

namespace ExpenseHub.Service.Infra.Repositories
{
    public class ExpenseRepository : BaseRepository<Expense>, IExpenseRepository
    {
        public ExpenseRepository(AppDataContext context) : base(context)
        {
        }
    }
}
