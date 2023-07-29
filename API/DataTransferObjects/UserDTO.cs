using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DataTransferObjects
{
    public class UserDTO
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public ShoppingCartDTO ShoppingCart { get; set; }
    }
}