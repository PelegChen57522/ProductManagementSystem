using System;

namespace ProductManagementAPI.Models
{
    public class Product
    {
        public string Pid { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = string.Empty;
        public Price Price { get; set; } = new Price();
        public Size Size { get; set; } = new Size();
        public string? UserId { get; set; }  // Mark as nullable
        public User? User { get; set; }      // Mark as nullable
    }
}
