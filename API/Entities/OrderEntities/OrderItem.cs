using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderEntities
{
    public class OrderItem
    {
        public int Id { get; set; }
        public Ordered ProductOrdered { get; set; }
        public double price { get; set; }
        public int purchasedQuantity { get; set; }
    }
}