using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using warehouse_management.Services;
using System.Reflection;
using warehouse_management.Services.IServices;
using warehouse_management.Models;
using Microsoft.AspNetCore.Authorization;

namespace warehouse_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        IUsersService _usersService;
        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

     
        [HttpGet]
        public IActionResult Get()
        {
            return Ok();
        }

        [HttpGet("{id:int}")]
        public IActionResult GetById(string id)
        {
            return Ok(_usersService.GetUsersById(id));
        }


       
        [HttpGet("{username}")]
        public IActionResult Get(string username)
        {
            var user = _usersService.GetUserByUsername(username);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }


      
        [HttpGet("roles/{roles}")] // Changed route to avoid conflict
        public IActionResult GetUsersByRoles(string roles)
        {
            var users = _usersService.GetUserByRoles(roles);
            if (users == null)
            {
                return NotFound();
            }
            return Ok(users);
        }


        [HttpPost]
        public IActionResult Post([FromBody] Users users)
        {
            _usersService.CreateUser(users);
            return CreatedAtAction("Get", new { id = users.UserID }, users);
        }
    }
}
