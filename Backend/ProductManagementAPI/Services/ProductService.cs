using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Data;
using ProductManagementAPI.Models;

namespace ProductManagementAPI.Services
{
    public class ProductService
    {
        private readonly ProductManagementContext _context;

        public ProductService(ProductManagementContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse> CreateProduct(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return new ServiceResponse { Success = true, Message = "Product created successfully." };
        }

        public async Task<ServiceResponse> UpdateProduct(Guid id, Product product)
        {
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
                return new ServiceResponse { Success = false, Message = "Product not found." };

            existingProduct.Name = product.Name;
            existingProduct.Price = product.Price;
            existingProduct.Size = product.Size;

            _context.Products.Update(existingProduct);
            await _context.SaveChangesAsync();

            return new ServiceResponse { Success = true, Message = "Product updated successfully." };
        }

        public async Task<ServiceResponse> DeleteProduct(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return new ServiceResponse { Success = false, Message = "Product not found." };

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return new ServiceResponse { Success = true, Message = "Product deleted successfully." };
        }

        public async Task<List<Product>> GetProductsByUserId(Guid userId)
        {
            return await _context.Products.Where(p => p.UserId == userId).ToListAsync();
        }
    }
}
