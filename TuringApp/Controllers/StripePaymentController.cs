using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Stripe;
using TuringApp.Models;

namespace TuringApp.Controllers
{
    public class StripePaymentController : Controller
    {
        readonly private turingContext _db;
        public StripePaymentController(turingContext context)
        {
            _db = context;
        }

        [HttpPost]
        public JsonResult DoPayment([FromBody] StripePaymentRequest request)
        {
            var customers = new CustomerService();
            var charges = new ChargeService();

            var customer = customers.Create(new CustomerCreateOptions
            {
                SourceToken = request.tokenId
            });

            var charge = charges.Create(new ChargeCreateOptions
            {
                Amount = 500,
                Description = "Sample Charge",
                Currency = "usd",
                CustomerId = customer.Id
            });

            return Json(new { result = "ok" });
        }

        public class StripePaymentRequest
        {
            public string tokenId { get; set; }
            public string productName { get; set; }
            public int amount { get; set; }
        }
    }
}
