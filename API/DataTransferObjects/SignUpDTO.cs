using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DataTransferObjects
{
    public class SignUpDTO : LoginDTO
    {
         public string Email { get; set; }
    }
}