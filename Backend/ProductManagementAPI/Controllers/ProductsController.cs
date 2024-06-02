using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementAPI.Data;
using ProductManagementAPI.Models;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ProductManagementAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductManagementContext _context;

        public ProductsController(ProductManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var products = await _context.Products.Where(p => p.UserId == userId).ToListAsync();
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            product.UserId = userId;
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(string id, Product product)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existingProduct = await _context.Products.FirstOrDefaultAsync(p => p.Pid == id && p.UserId == userId);
            if (existingProduct == null)
            {
                return NotFound();
            }

            existingProduct.Name = product.Name;
            existingProduct.Price = product.Price;
            existingProduct.Size = product.Size;

            _context.Products.Update(existingProduct);
            await _context.SaveChangesAsync();
            return Ok(existingProduct);
        }
    }
}
