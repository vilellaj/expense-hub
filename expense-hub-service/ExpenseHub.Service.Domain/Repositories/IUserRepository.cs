using ExpenseHub.Service.Domain.Entities;
using System.Threading.Tasks;

namespace ExpenseHub.Service.Domain.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User> Authenticate(string username, string password);
    }
}
