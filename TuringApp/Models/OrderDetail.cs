﻿using System;
using System.Collections.Generic;

namespace TuringApp.Models
{
    public partial class OrderDetail
    {
        public int ItemId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string Attributes { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal UnitCost { get; set; }
    }
}
