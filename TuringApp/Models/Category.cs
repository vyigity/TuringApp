using System;
using System.Collections.Generic;

namespace TuringApp.Models
{
    public partial class Category
    {
        public int CategoryId { get; set; }
        public int DepartmentId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public Department Department { get; set; }
        public IEnumerable<ProductCategory> ProductCategories { get; set; }

    }
}
