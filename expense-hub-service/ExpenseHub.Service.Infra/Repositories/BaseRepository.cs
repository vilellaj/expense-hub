using ExpenseHub.Service.Domain.Repositories;
using ExpenseHub.Service.Infra.DataContexts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExpenseHub.Service.Infra.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        public async Task Delete(T entity)
        {
            using (var ctx = new AppDataContext())
            {
                ctx.Set<T>().Remove(entity);
                await ctx.SaveChangesAsync();
            }
        }

        public async Task<IList<T>> GetAll()
        {
            using (var ctx = new AppDataContext())
            {
                return await ctx.Set<T>().ToListAsync();
            }
        }

        public async Task<T> GetById(int id)
        {
            using (var ctx = new AppDataContext())
            {
                return await ctx.Set<T>().FindAsync(id);
            }
        }

        public async Task Insert(T entity)
        {
            using (var ctx = new AppDataContext())
            {
                await ctx.Set<T>().AddAsync(entity);
                await ctx.SaveChangesAsync();
            }
        }

        public async Task Update(T entity)
        {
            using (var ctx = new AppDataContext())
            {
                ctx.Set<T>().Update(entity);
                await ctx.SaveChangesAsync();
            }
        }
    }
}
