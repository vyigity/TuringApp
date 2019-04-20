using Microsoft.AspNet.OData.Builder;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TuringApp.Models
{
    public partial class ShoppingCart
    {
        [Key]
        public int ItemId { get; set; }
        public string CartId { get; set; }
        public int ProductId { get; set; }
        public string Attributes { get; set; }
        public int Quantity { get; set; }
        public byte BuyNow { get; set; }
        public DateTime AddedOn { get; set; }

        [Contained]
        public Product Product { get; set; }
    }
}
