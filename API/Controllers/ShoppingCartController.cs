using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DataTransferObjects;
using API.Entities;
using API.FeatureExt;
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
        [HttpGet(Name = "GetShoppingCart")]
        public async Task<ActionResult<ShoppingCartDTO>> GetShoppingCart() 
        {
            var shoppingcart = await RetrieveCart(GetuserId());

        /*Checking if shoppingcart is present*/
            if(shoppingcart == null)
            {
                return (NotFound());
            }
           
            return shoppingcart.MapShoppingCartToDTO();
          
        }

        //to create a resource on the server in our case its cart item
        [HttpPost] 
        public async Task<ActionResult<ShoppingCartDTO>>AddCartItems(int itemId, int quantity) 
        {
            /*fetch the shopping cart, if not present then create one*/
            var shoppingcart = await RetrieveCart(GetuserId());
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
            var results = await _context.SaveChangesAsync() > 0;

            /*if results are greater than zero that means save changes 
            made to the database */
            if(results)
            {
                return CreatedAtRoute("GetShoppingCart",shoppingcart.MapShoppingCartToDTO());
            }
            else 
            {
                return (BadRequest("Bad Request Occured! Issue storing cart items!"));
            }
        }


        //for deleting the item from the shopping cart
        [HttpDelete]
        public async Task<ActionResult> DeleteCartItem(int itemId, int quantity = 1)
        {
            var shoppingcart = await RetrieveCart(GetuserId());

             if (shoppingcart == null) 
             {
                return NotFound();
             };

            shoppingcart.RemoveCartItem(itemId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
             return Ok();
            }
            return BadRequest("Bad Request Occured! Issue storing cart items!");
        }
        
        //fetching cart items from existing cart

          private async Task<ShoppingCart> RetrieveCart(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                Response.Cookies.Delete("userId");
                return null;
            }

            return await _context.Carts
                .Include(i => i.CartItems)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(cart => cart.UserId == userId);
        }

        private string GetuserId()
        {
            return User.Identity?.Name ?? Request.Cookies["userId"];
        }
        private ShoppingCart CreateShoppingCart()
        {
            var userId = User.Identity?.Name;
            if(string.IsNullOrEmpty(userId))
            {
            //randomly generating a unique identifier and converting to string for passing response parameters 
             userId = Guid.NewGuid().ToString();
            var cookies = new CookieOptions{IsEssential = true, Expires = DateTime.UtcNow.AddDays(60)};
            /*Adding cookie to the Http response
             used the string userId to retrieve the cookies*/
            Response.Cookies.Append("userId", userId, cookies);
             }
             
            /*Creating a new shopping cart based on Shopping Cart entity */
            var shoppingcart = new ShoppingCart{UserId=userId}; 
            _context.Carts.Add(shoppingcart);
            return (shoppingcart);
       
        }
    }
}