using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DataTransferObjects
{
    public class ShoppingCartItemDTO
    {
        public int ItemId { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public int PurchasedQuantity { get; set; }
        public string ImageUrl { get; set; }
        public double Price { get; set; }
        
    }
}