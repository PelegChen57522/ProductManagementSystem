using Microsoft.AspNetCore.Mvc;
using ProductManagementAPI.Models;
using ProductManagementAPI.Services;
using System.Threading.Tasks;

namespace ProductManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterRequest request)
        {
            var user = new User
            {
                Email = request.Email,
                Password = request.Password,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Phone = request.Phone,
                Address = request.Address
            };
            
            var response = await _authService.Register(user);
            if (!response.Success)
                return BadRequest(response.Message);

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginRequest request)
        {
            var userLogin = new UserLogin
            {
                Email = request.Email,
                Password = request.Password
            };
            
            var response = await _authService.Login(userLogin);
            if (!response.Success)
                return BadRequest(response.Message);

            return Ok(response);
        }
    }
}
