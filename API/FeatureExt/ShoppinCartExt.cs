using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataTransferObjects;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.FeatureExt
{
    public static class ShoppinCartExt
    {
         public static ShoppingCartDTO MapShoppingCartToDTO(this ShoppingCart shoppingcart)
        {
            return new ShoppingCartDTO
            {
                Id = shoppingcart.Id,
                UserId = shoppingcart.UserId,
                CartItems = shoppingcart.CartItems.Select(items => new ShoppingCartItemDTO
                {
                    ItemId = items.ItemId,
                    Name = items.Product.Name,
                    Price = items.Product.Price,
                    ImageUrl = items.Product.ImageUrl,
                    Type = items.Product.Type,
                    Brand = items.Product.Brand,
                    PurchasedQuantity = items.PurchasedQuantity
                }).ToList()
            };
        }

        public static IQueryable<ShoppingCart> RetrieveBasketWithItems(this IQueryable<ShoppingCart> query, string userId)
        {
            return query
                .Include(i => i.CartItems)
                .ThenInclude(p => p.Product)
                .Where(basket => basket.UserId == userId);
        }
    }
}