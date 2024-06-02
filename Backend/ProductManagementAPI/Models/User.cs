using System;
using Microsoft.AspNetCore.Identity;

namespace ProductManagementAPI.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; } = DateTime.UtcNow;
        public DateTime LastConnection { get; set; } = DateTime.UtcNow;
        public string? Address { get; set; }
    }
}
