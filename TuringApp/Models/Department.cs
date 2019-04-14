using System;
using System.Collections.Generic;

namespace TuringApp.Models
{
    public partial class Department
    {
        public int DepartmentId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public IEnumerable<Category> Categories { get; set; }
    }
}
