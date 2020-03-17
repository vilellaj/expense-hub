using System;
using ExpenseHub.Service.Shared.Commands;

namespace ExpenseHub.Service.Domain.DTOs
{
    public class UserDTO
    {
        public string Username { get; set; }

        public UserDTO(string username)
        {
            Username = username ?? throw new ArgumentNullException(nameof(username));
        }
    }
}
