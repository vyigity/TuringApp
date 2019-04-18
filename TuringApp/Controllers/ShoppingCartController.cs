using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TuringApp.Models;

namespace TuringApp.Controllers
{
    //[Route("api/[controller]")]
    public class ShoppingCartController : ODataController
    {
        readonly private turingContext _db;
        public ShoppingCartController(turingContext context, IHttpContextAccessor httpContextAccessor)
        {
            _db = context;
            HttpContextAccessor = httpContextAccessor;
        }

        public IHttpContextAccessor HttpContextAccessor { get; }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_db.ShoppingCart);
        }

        [EnableQuery]
        public IActionResult Get(int key)
        {
            return Ok(_db.ShoppingCart);
        }

        public IActionResult Post([FromBody]ShoppingCart shoppingCart)
        {
            string shoppingCarId = HttpContextAccessor.HttpContext.Request.Cookies["Truning.ShoppingCardId"];

            if (shoppingCarId == null)
            {
                shoppingCarId = Guid.NewGuid().ToString("N");
                HttpContextAccessor.HttpContext.Response.Cookies.Append("Truning.ShoppingCardId", shoppingCarId, new CookieOptions() { HttpOnly = false });
            }

            shoppingCart.AddedOn = DateTime.Now;
            shoppingCart.CartId = shoppingCarId;

            _db.ShoppingCart.Add(shoppingCart);
            _db.SaveChanges();

            return Ok(shoppingCart);
        }
    }
}
