using System;
using System.ComponentModel.DataAnnotations;

namespace ProductManagementAPI.Models
{
    public class Product
    {
        [Key]
        public Guid Pid { get; set; }
        public string Name { get; set; } = string.Empty;
        public Price Price { get; set; } = new Price();
        public Size Size { get; set; } = new Size();
        public Guid UserId { get; set; }
        public User User { get; set; } = new User();
    }
}
