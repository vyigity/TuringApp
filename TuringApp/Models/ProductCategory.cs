using System;
using System.Collections.Generic;

namespace TuringApp.Models
{
    public partial class ProductCategory
    {
        public int ProductId { get; set; }
        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public Product Product { get; set; }

    }
}
