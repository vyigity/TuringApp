using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using TuringApp.Models;

namespace TuringApp.Controllers
{
    public class AttributeValueController : ODataController
    {
        private turingContext _db;
        public AttributeValueController(turingContext context)
        {
            _db = context;
        }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_db.AttributeValue);
        }

        [EnableQuery]
        public IActionResult Get(int key)
        {
            return Ok(_db.AttributeValue.FirstOrDefault(c => c.AttributeId == key));
        }
    }
}