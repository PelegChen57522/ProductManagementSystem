using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProductManagementAPI.Models
{
    public class User
    {
        [Key]
        public Guid Uid { get; set; }
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime CreateDate { get; set; }
        public DateTime LastConnection { get; set; }
        public string? Address { get; set; }  // Address can be nullable

        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
