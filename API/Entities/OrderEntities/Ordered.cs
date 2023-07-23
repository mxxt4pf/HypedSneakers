using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities.OrderEntities
{
    public class Ordered
    {
        public int ItemId { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
    }
}