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
            public string userName { get; set; }
            public string password { get; set; }
        }
        public async Task<IActionResult> Login([FromBody] UserView user)
        {
            if (LoginUser(user.userName, user.password))
            {
                var claims = new List<Claim>
            {
                new Claim("Name",user.userName)
            };

                var userIdentity = new ClaimsIdentity(claims, "login");

                ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);
                await HttpContext.SignInAsync(principal);

                //Just redirect to our index after logging in. 
                return Ok(new { name = "Veli Yigit YOLCU" });
            }
            else
            {
                return BadRequest();
            }
        }

        public async Task<IActionResult> LogOut()
        {
            await HttpContext.SignOutAsync();

            return RedirectToAction("Index");
        }

        private bool LoginUser(string username, string password)
        {
            if (username == "cagatay" && password == "123")
            {
                return true;
            }
            else
            {
                return true;
            }

        }
    }
}