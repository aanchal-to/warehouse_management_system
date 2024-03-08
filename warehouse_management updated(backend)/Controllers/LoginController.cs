
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using warehouse_management.Repository;
using warehouse_management.Models;
using warehouse_management.Services.IServices;



namespace warehouse_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private IUsersService _userService;

        public LoginController(IConfiguration configuration, IUsersService usersService)
        {
            _config = configuration;
            _userService = usersService;
        }
        
        private string AuthenticateUser(Login login)
        {
            var user = _userService.GetUserByUsername(login.UserName);
            if (user == null)
            {
                return "User not found"; // User not found
            }
            else if (!BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash))
            {
                return "Invalid password"; // Password does not match
            }
            else if (user.Roles != login.Role)
            {
                return "Role does not match"; // Role does not match
            }
            else
            {
                return user.UserID; // User authenticated successfully
            }
        }



        private string GenerateJwtToken(Login login)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, login.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, login.UserName),
                new Claim(ClaimTypes.Role, login.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private string GenerateToken(Login login)
        {
            var user = _userService.GetUserByUsername(login.UserName);
            if (user != null)
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                         new Claim(ClaimTypes.Name, user.UserName),
                         new Claim(ClaimTypes.Email, user.Email),
                         new Claim("UserID", user.UserID.ToString()),
                         new Claim(ClaimTypes.Role,user.Roles)
                       
                       
    
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Issuer = _config["Jwt:Issuer"],
                    Audience = _config["Jwt:Audience"],
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            return null;
        }

       


        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(Login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userID = AuthenticateUser(login);
            if (userID == "User not found" || userID == "Invalid password" || userID == "Role does not match")
            {
                return BadRequest(userID); // Return the specific error message
            }
            else
            {
                var token = GenerateJwtToken(login);
                if (token != null)
                {
                    return Ok(new { token, userID, role = login.Role });
                }
                else
                {
                    return Unauthorized();
                }
            }
        }

    }
}
