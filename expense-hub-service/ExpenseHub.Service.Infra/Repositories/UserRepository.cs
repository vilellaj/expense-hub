using System;
using System.Threading.Tasks;
using ExpenseHub.Service.Domain.Entities;
using ExpenseHub.Service.Domain.Repositories;
using ExpenseHub.Service.Infra.DataContexts;
using Microsoft.EntityFrameworkCore;

namespace ExpenseHub.Service.Infra.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository()
        {

        }

        public async Task<User> Authenticate(string username, string password)
        {
            using (var context = new AppDataContext())
            {
                //TODO: Hash password for better security
                return await context.Users
                    .SingleOrDefaultAsync(x => x.UserName.Equals(username) && x.Password.Equals(password));
            }
        }
    }
}
