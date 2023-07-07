using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(SaveContext context) {
            if(context.Products.Any()) 
                return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Nike Blazer Mid",
                    Description ="Workout shoe and tennis purpose.",
                    Price = 935,
                    ImageUrl = "",
                    Brand = "Nike",
                    Type = "Sneaker",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Nike Air Force 1",
                    Description ="Shoe Description to be added",
                    Price = 95990,
                    ImageUrl = "/images/products/sb-ang2.png",
                    Brand = "Nike",
                    Type = "Sneaker",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "New Balance",
                    Description ="Shoe Description to be added",
                    Price = 98990,
                    ImageUrl = "/images/products/sb-core9.png",
                    Brand = "New Balance",
                    Type = "Sneaker",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "New Balance",
                    Description ="Shoe Description to be added",
                    Price = 39999,
                    ImageUrl = "/images/products/sb-core2.png",
                    Brand = "New Balance",
                    Type = "Sneaker",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "New Balance",
                    Description ="New Balance Canvas Trainer",
                    Price = 25990,
                    ImageUrl = "/images/products/sb-NewBalance9.png",
                    Brand = "NewBalance",
                    Type = "Sneaker",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "New Balance",
                    Description ="New Balance Canvas Trainer",
                    Price = 92990,
                    ImageUrl = "/images/products/sb-ts9.png",
                    Brand = "New Balance",
                    Type = "Sneaker",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas",
                    Description ="Shoe Description to be added",
                    Price = 9990,
                    ImageUrl = "/images/products/hat-core9.png",
                    Brand = "New Balance",
                    Type = "Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas",
                    Description ="Shoe Description to be added",
                    Price = 8990,
                    ImageUrl = "/images/products/hat-NewBalance9.png",
                    Brand = "New Balance",
                    Type = "Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas",
                    Description ="Shoe Description to be added",
                    Price = 9599,
                    ImageUrl = "/images/products/hat-NewBalance2.png",
                    Brand = "New Balance",
                    Type = "Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas Yeezy Boost 350 V2",
                    Description ="Shoe Description to be added",
                    Price = 9899,
                    ImageUrl = "/images/products/glove-code9.png",
                    Brand = "Adidas",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas Yeezy Boost 700",
                    Description ="Shoe Description to be added",
                    Price = 9599,
                    ImageUrl = "/images/products/glove-code2.png",
                    Brand = "Adidas",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas Yeezy Slides",
                    Description ="Shoe Description to be added",
                    Price = 9699,
                    ImageUrl = "/images/products/glove-NewBalance9.png",
                    Brand = "Adidas",
                    Type = "Slides",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas Yeezy Slides Onyx",
                    Description ="Shoe Description to be added",
                    Price = 9499,
                    ImageUrl = "/images/products/glove-NewBalance2.png",
                    Brand = "NewBalance",
                    Type = "Slides",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Puma ",
                    Description ="Shoe Description to be added",
                    Price = 25990,
                    ImageUrl = "/images/products/boot-redis9.png",
                    Brand = "Puma",
                    Type = "Trainer Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Puma ",
                    Description ="New Balance Canvas Trainer",
                    Price = 98999,
                    ImageUrl = "/images/products/boot-core2.png",
                    Brand = "New Balance",
                    Type = "Trainer Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Puma ",
                    Description ="Shoe Description to be added",
                    Price = 99999,
                    ImageUrl = "/images/products/boot-core9.png",
                    Brand = "New Balance",
                    Type = "Trainer Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Nike Jordan 1",
                    Description = "Shoe Description to be added",
                    Price = 95990,
                    ImageUrl = "/images/products/boot-ang2.png",
                    Brand = "Nike",
                    Type = "Basketball Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Nike Jordan 2",
                    Description ="Shoe Description to be added",
                    Price = 98990,
                    ImageUrl = "/images/products/boot-ang9.png",
                    Brand = "Nike",
                    Type = "Basketball Shoes",
                    QuantityInStock = 999
                },
            };
           //context.Products.AddRange(products);
            foreach (var product in products)
            {
                context.Products.Add(product);
            }
            //storing changes to the database
            context.SaveChanges();
        }
    }
}