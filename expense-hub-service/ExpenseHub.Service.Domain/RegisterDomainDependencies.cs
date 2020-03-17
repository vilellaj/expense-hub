using ExpenseHub.Service.Domain.Handlers;
using Microsoft.Extensions.DependencyInjection;

namespace ExpenseHub.Service.Domain
{
    public static class RegisterDomainDependencies
    {
        public static IServiceCollection RegisterDomainServiceDependencies(this IServiceCollection services)
        {
            services.AddTransient<UserHandler, UserHandler>();
            services.AddTransient<ExpenseHandler, ExpenseHandler>();
            return services;
        }
    }
}
