using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.Entities;


namespace API.DataTransferObjects
{
    public class ShoppingCartDTO
    {
        public int Id {get; set;}
        public string UserId { get; set; }
        public List<ShoppingCartItemDTO> CartItems { get; set; }
    }

 }