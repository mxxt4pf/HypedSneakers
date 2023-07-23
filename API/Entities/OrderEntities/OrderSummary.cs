using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace API.Entities.OrderEntities
{
    public class OrderSummary
    {
        public int Id { get; set; }
        public string UserId { get; set; }

        [Required]
        public ItemShippingAddress ShippingAddress { get; set; }
        public DateTime ItemOrderDatee { get; set; } = DateTime.UtcNow;
        public List<Ordered> OrdereItem { get; set; }
        public double ItemTotal { get; set; }
        public double DeliveryCharges { get; set; }
        public OrderStatus OrderStatus { get; set; }




    }
}