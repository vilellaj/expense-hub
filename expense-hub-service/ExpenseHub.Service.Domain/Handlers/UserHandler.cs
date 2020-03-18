using ExpenseHub.Service.Domain.Commands;
using ExpenseHub.Service.Domain.Commands.Results;
using ExpenseHub.Service.Domain.DTOs;
using ExpenseHub.Service.Domain.Entities;
using ExpenseHub.Service.Domain.Repositories;
using ExpenseHub.Service.Shared.Commands;
using Flunt.Notifications;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
            var tokenValidity = DateTime.Now.AddYears(1);

            // TODO: Use customClaim
            var claims = new[]  {
               new Claim(JwtRegisteredClaimNames.UniqueName, user.Username)
            };

            return BuildToken(claims, tokenValidity);
        }

        private string BuildToken(Claim[] claims, DateTime validity)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("expensehubkey@expensehubkey"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Hard coded for brevity
            var token = new JwtSecurityToken("expensehub",
              "expensehubusers",
              claims: claims,
              expires: validity,
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
