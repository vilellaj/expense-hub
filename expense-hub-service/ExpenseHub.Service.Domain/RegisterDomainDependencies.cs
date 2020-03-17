using ExpenseHub.Service.Domain.Handlers;
using Microsoft.Extensions.DependencyInjection;

namespace ExpenseHub.Service.Domain
{
    public static class RegisterDomainDependencies
    {
        public static IServiceCollection RegisterDomainServiceDependencies(this IServiceCollection services)
        {
            services.AddTransient<UserHandler, UserHandler>();
            return services;
        }
    }
}
