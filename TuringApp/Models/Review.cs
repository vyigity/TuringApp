﻿using System;
using System.Collections.Generic;

namespace TuringApp.Models
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public string Review1 { get; set; }
        public short Rating { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
