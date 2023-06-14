using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ProductsController : ControllerBase 
    {
        //private field for dependecy injection
        private readonly SaveContext _context;
        
        public ProductsController(SaveContext context)
        {
            _context = context;
            
        }
        //gets all the products of the database
        [HttpGet] 
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        //api/products/for each product based on the id input
        [HttpGet("{id}")] 
        public async Task<Product> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }
    }
}