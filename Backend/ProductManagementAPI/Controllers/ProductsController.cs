using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Models;
using ProductManagementAPI.Services;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductsController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetProducts()
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            var products = await _productService.GetProductsByUserId(new Guid(userId));
            return Ok(products);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            product.UserId = new Guid(userId);
            var result = await _productService.CreateProduct(product);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] Product product)
        {
            var userId = User.Claims.First(c => c.Type == "UserID").Value;
            product.UserId = new Guid(userId);
            var result = await _productService.UpdateProduct(id, product);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var result = await _productService.DeleteProduct(id);
            if (!result.Success)
                return BadRequest(result.Message);

            return Ok(result);
        }
    }
}
