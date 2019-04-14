using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using TuringApp.Models;

namespace TuringApp.Controllers
{
    public class CategoriesController : ODataController
    {
        private turingContext _db;
        public CategoriesController(turingContext context)
        {
            _db = context;
        }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_db.Category);
        }

        [EnableQuery]
        public IActionResult Get(int key)
        {
            return Ok(_db.Category.FirstOrDefault(c => c.DepartmentId == key));
        }

        [EnableQuery]
        public IActionResult Post()
        {
            return Ok(_db.Category);
        }

        [EnableQuery]
        public IActionResult Post(int key)
        {
            return Ok(_db.Category.FirstOrDefault(c => c.DepartmentId == key));
        }
    }
}