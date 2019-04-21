using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using TuringApp.Models;

namespace TuringApp.Controllers
{
    public class AccountController : Controller
    {
        public class UserView
        {
            public string email { get; set; }
            public string password { get; set; }
        }

        private turingContext _db;
        public AccountController(turingContext context)
        {
            _db = context;
        }
        public IActionResult isLogin()
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                return Ok(new { name = HttpContext.User.Claims.Single(r => r.Type == "Name").Value });
            }
            else
            {
                return BadRequest();
            }
        }
        public async Task<IActionResult> Login([FromBody] UserView user)
        {

            var customer = LoginUser(user.email, user.password);

            if (customer != null)
            {
                var claims = new List<Claim>
            {
                new Claim("Name",customer.Name),
                new Claim("CustomerId",customer.CustomerId.ToString())
            };

                var userIdentity = new ClaimsIdentity(claims, "login");

                ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);
                await HttpContext.SignInAsync(principal);

                //Just redirect to our index after logging in. 
                return Ok(new { name = customer.Name });
            }
            else
            {
                return BadRequest();
            }
        }

        public async Task<IActionResult> LogOut()
        {
            await HttpContext.SignOutAsync();

            return Ok(new { message = "LoggedOut" });
        }

        private Customer LoginUser(string email, string password)
        {
            var user = _db.Customer.SingleOrDefault(r => r.Email == email && r.Password == password);

            return user;
        }
    }
}