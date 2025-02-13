﻿using Microsoft.AspNet.OData.Builder;
using System;
using System.Collections.Generic;

namespace TuringApp.Models
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal DiscountedPrice { get; set; }
        public string Image { get; set; }
        public string Image2 { get; set; }
        public string Thumbnail { get; set; }
        public short Display { get; set; }

        [Contained]
        public IEnumerable<ShoppingCart> ShoppingCarts { get; set; }

        public IEnumerable<ProductCategory> ProductCategories { get; set; }
    }
}
