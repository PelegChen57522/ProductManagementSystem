using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Models;

namespace ProductManagementAPI.Data
{
    public class ProductManagementContext : DbContext
    {
        public ProductManagementContext(DbContextOptions<ProductManagementContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Product>().ToTable("Products");

            modelBuilder.Entity<Product>()
                .HasKey(p => p.Pid);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.User)
                .WithMany(u => u.Products)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<Product>()
                .OwnsOne(p => p.Price);

            modelBuilder.Entity<Product>()
                .OwnsOne(p => p.Size);
        }
    }
}
