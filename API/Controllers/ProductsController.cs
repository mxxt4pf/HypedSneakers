using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.FeatureExt;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ProductsController : RootApiController 
    {
        //private field for dependency injection
        private readonly SaveContext _context;
        
        public ProductsController(SaveContext context)
        {
            _context = context;
            
        }
        //gets all the products of the database
        [HttpGet] 
        public async Task<ActionResult<Product>>GetProducts()
        {
                 var products = await _context.Products.ToListAsync();
            return Ok(products);
        }


        //api/products/for each product based on the id input
        [HttpGet("{id}")] 
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            
            return await _context.Products.FindAsync(id);

            var item = await _context.Products.FindAsync(id);

            if(item == null) 
            {
                return BadRequest();
            }
            return item;
        }
        
    }
}