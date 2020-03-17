using ExpenseHub.Service.Domain.Commands;
using ExpenseHub.Service.Domain.Commands.Results;
using ExpenseHub.Service.Domain.DTOs;
using ExpenseHub.Service.Domain.Entities;
using ExpenseHub.Service.Domain.Repositories;
using ExpenseHub.Service.Shared.Commands;
using Flunt.Notifications;
using System;
using System.Threading.Tasks;

namespace ExpenseHub.Service.Domain.Handlers
{
    public class UserHandler : Notifiable,
        ICommandHandlerAsync<AuthenticateCommand>
    {
        private readonly IUserRepository _userRepository;
        public UserHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ICommandResult> Handle(AuthenticateCommand command)
        {
            ICommandResult result = null;

            try
            {
                var user = await _userRepository.Authenticate(command.Username, command.Password);

                if (user != null)
                {
                    result = new AuthenticateUserResult()
                    {
                        User = new UserDTO(user.Id, user.Username),
                        Token = GetToken(user)
                    };
                }
            }
            catch (Exception ex)
            {
                AddNotification("AuthenticateCommand", ex.Message);
            }

            return result;
        }

        private string GetToken(User user)
        {
            return "";
        }
    }
}
