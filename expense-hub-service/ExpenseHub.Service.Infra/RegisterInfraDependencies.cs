using ExpenseHub.Service.Domain.Repositories;
using ExpenseHub.Service.Infra.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ExpenseHub.Service.Infra
{
    public static class RegisterInfraDependencies
    {
        public static IServiceCollection RegisterInfraServiceDependencies(this IServiceCollection services)
        {
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IExpenseRepository, ExpenseRepository>();
            return services;
        }
    }
}
