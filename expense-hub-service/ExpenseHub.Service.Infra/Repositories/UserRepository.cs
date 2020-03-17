using ExpenseHub.Service.Domain.Entities;
using ExpenseHub.Service.Domain.Repositories;
using ExpenseHub.Service.Infra.DataContexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace ExpenseHub.Service.Infra.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly AppDataContext _context;

        public UserRepository(AppDataContext context)
            :base(context)
        {
            _context = context;
        }

        public async Task<User> Authenticate(string username, string password)
        {
            //TODO: Hash password for better security
            return await _context.Users
                .SingleOrDefaultAsync(x => x.Username.Equals(username) && x.Password.Equals(password));
        }
    }
}
