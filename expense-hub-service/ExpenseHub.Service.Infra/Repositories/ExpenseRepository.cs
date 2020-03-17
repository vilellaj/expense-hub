using ExpenseHub.Service.Domain.Entities;
using ExpenseHub.Service.Domain.Repositories;

namespace ExpenseHub.Service.Infra.Repositories
{
    public class ExpenseRepository : BaseRepository<Expense>, IExpenseRepository
    {
    }
}
