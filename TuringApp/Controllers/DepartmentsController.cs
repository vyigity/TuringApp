using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using TuringApp.Models;

namespace TuringApp.Controllers
{
    public class DepartmentsController : ODataController
    {

        private turingContext _db;
        public DepartmentsController(turingContext context)
        {
            _db = context;
        }

        [EnableQuery]
        public IActionResult Get()
        {
            return Ok(_db.Department);
        }

        [EnableQuery]
        public IActionResult Get(int key)
        {
            return Ok(_db.Department.FirstOrDefault(c => c.DepartmentId == key));
        }
    }
}