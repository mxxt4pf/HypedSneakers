using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ShoppingCart
    {
        public int Id {get; set;} 

        public string UserId {get; set;}

        public List<ShoppingCartItem> CartItems {get; set;} = new List<ShoppingCartItem>(); //would make new list of products for everytime a new cart is created for shopping

        //item add function
      public void AddCartItem(Product product, int quantity)
        {
            if (CartItems.All(item => item.Id != product.Id))
            {
                CartItems.Add(new ShoppingCartItem { Product = product, PurchasedQuantity = quantity });
                return;
            }
            var presentItem = CartItems.FirstOrDefault(item => item.ItemId == product.Id);

            if (presentItem != null) 
            {
                presentItem.PurchasedQuantity = presentItem.PurchasedQuantity + quantity;
            }
    }
        //item remove function
         public void RemoveCartItem(int Id, int quantity = 1)
        {
            var removeItem = CartItems.FirstOrDefault(cartItem => cartItem.ItemId == Id);
            
            if (removeItem == null) 
            {
                return;
            }
            removeItem.PurchasedQuantity -= quantity;
            if (removeItem.PurchasedQuantity == 0) 
            {
                CartItems.Remove(removeItem);
        }
}
}
}
