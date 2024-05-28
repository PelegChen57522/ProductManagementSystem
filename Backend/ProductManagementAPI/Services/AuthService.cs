using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProductManagementAPI.Data;
using ProductManagementAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProductManagementAPI.Services
{
    public class AuthService
    {
        private readonly ProductManagementContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ProductManagementContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<ServiceResponse> Register(User user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
                return new ServiceResponse { Success = false, Message = "Email already exists." };

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.CreateDate = DateTime.UtcNow;
            user.LastConnection = DateTime.UtcNow;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new ServiceResponse { Success = true, Message = "User registered successfully." };
        }

        public async Task<ServiceResponse> Login(UserLogin login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == login.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.Password))
                return new ServiceResponse { Success = false, Message = "Invalid email or password." };

            user.LastConnection = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);
            return new ServiceResponse { Success = true, Data = token };
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim("UserID", user.Uid.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class ServiceResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public object Data { get; set; } = new object();
    }

    public class UserLogin
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
