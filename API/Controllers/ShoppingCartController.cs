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
    public class ShoppingCartController : RootApiController
    {
        private SaveContext _context;
    
        public ShoppingCartController(SaveContext context)
        {
            _context = context;
        }

        //fetching the shopping cart details
        [HttpGet]
        public async Task<ActionResult<ShoppingCart>> GetShoppingCart() 
        {
            var shoppingcart = await _context.Carts
            //Explicitely telling the EF to include relative items in the cart
            .Include(items => items.CartItems)
            //Including the product info
            .ThenInclude(product => product.Product)
            .FirstOrDefaultAsync(x => x.UserId ==  Request.Cookies["userId"]);

        /*Checking if shoppingcart is present*/
            if(shoppingcart == null)
            {
                return (NotFound());
            }
            else 
            {
                return (shoppingcart); 
            }
          
        }

        //to create a resource on the server in our case its cart item
        [HttpPost] 
        public async Task<ActionResult>AddCartItems(int itemId, int quantity) 
        {
            /*fetch the shopping cart, if not present then create one*/
            var shoppingcart = await _context.Carts
            //Explicitely telling the EF to include relative items in the cart
            .Include(items => items.CartItems)
            //Including the product info
            .ThenInclude(product => product.Product)
            .FirstOrDefaultAsync(x => x.UserId ==  Request.Cookies["userId"]);
            
            if(shoppingcart == null)
            {
                shoppingcart = CreateShoppingCart();
            }

            /*getting item Ids*/
            var item = await _context.Products.FindAsync(itemId);

            /*if item not present then return the error status*/
            if(item == null)
            {
                return (NotFound());
            }

            /*Adding the cart item to the shopping cart*/
            shoppingcart.AddCartItem(item ,quantity);

            /*returns an integer on the number of save changes made 
            to the database*/
            var results = await _context.SaveChangesAsync();

            /*if results are greater than zero that means save changes 
            made to the database */
            if(results > 0)
            {
                return(StatusCode(201));
            }
            else 
            {
                return (BadRequest("Bad Request Occured! Issue storing cart items!"));
            }
        }


         

        private ShoppingCart CreateShoppingCart()
        {
            //randomly generating a unique identifier and converting to string for passing response parameters 
            var userId = Guid.NewGuid().ToString();
            var cookies = new CookieOptions{IsEssential = true, Expires = DateTime.UtcNow.AddDays(60)};
            /*Adding cookie to the Http response
             used the string userId to retrieve the cookies*/
            Response.Cookies.Append("userId", userId, cookies);
            /*Creating a new shopping cart based on Shopping Cart entity */
            var shoppingcart = new ShoppingCart{UserId=userId}; 
            _context.Carts.Add(shoppingcart);
            return (shoppingcart);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCartItem(int itemId, int quantity)
        {
            var shoppingcart = await _context.Carts
            //Explicitely telling the EF to include relative items in the cart
            .Include(items => items.CartItems)
            //Including the product info
            .ThenInclude(product => product.Product)
            .FirstOrDefaultAsync(x => x.UserId ==  Request.Cookies["userId"]);


            return(null);
        }

    }
}