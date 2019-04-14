using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TuringApp.Models;

namespace TuringApp.Controllers
{
    //[Route("api/[controller]")]
    public class ProductsController : ODataController
    {
        readonly private turingContext _db;
        public ProductsController(turingContext context)
        {
            _db = context;
        }

        [EnableQuery]
        public IActionResult Get()//int? selectedDepartment, int? selectedCategory)
        {
            return Ok(_db.Product);
        }

        [EnableQuery]
        [ODataRoute("GetProductByFilter")]
        public IActionResult GetProductByFilter([FromODataUri] int? selectedDepartment, [FromODataUri] int? selectedCategoryId)
        {
            IQueryable<Product> data = _db.Product;

            if (selectedDepartment != null)
                 data = data.Where(r=> r.ProductCategories.Any(f => f.Category.DepartmentId == selectedDepartment));

            if (selectedCategoryId != null)
                data = data.Where(r => r.ProductCategories.Any(f => f.CategoryId == selectedCategoryId));

            return Ok(data);
        }
    }
}
