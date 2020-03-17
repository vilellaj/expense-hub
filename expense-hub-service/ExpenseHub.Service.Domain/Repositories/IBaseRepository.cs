using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExpenseHub.Service.Domain.Repositories
{
    public interface IBaseRepository<T>
    {
        Task<T> GetById(int id);
        Task<IList<T>> GetAll();
        Task Insert(T entity);
        Task Update(T entity);
        Task Delete(T entity);
    }
}
