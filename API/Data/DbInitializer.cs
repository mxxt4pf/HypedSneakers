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
                    Price = 99,
                    ImageUrl = "/images/products/1nikeblazer.jpeg",
                    Brand = "Nike",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Nike Air Force 1",
                    Description ="Shoe Description to be added",
                    Price = 100,
                    ImageUrl = "/images/products/2nikeairforce1.jpeg",
                    Brand = "Nike",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Nike Air Force 1 Mid",
                    Description ="Shoe Description to be added",
                    Price = 100,
                    ImageUrl = "/images/products/3airforce1mid.jpeg",
                    Brand = "Nike",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "New Balance 574 ",
                    Description ="Shoe Description to be added",
                    Price = 39999,
                    ImageUrl = "/images/products/4newblance574.jpeg",
                    Brand = "New Balance",
                    Type = "Sport Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "New Balance 550",
                    Description ="New Balance Canvas Trainer",
                    Price = 25990,
                    ImageUrl = "/images/products/5.jpeg",
                    Brand = "New Balance",
                    Type = "Sport Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "New Balance 327",
                    Description ="New Balance Canvas Trainer",
                    Price = 92990,
                    ImageUrl = "//images/products/6.jpeg",
                    Brand = "New Balance",
                    Type = "Sport shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Vans old skool",
                    Description ="Shoe Description to be added",
                    Price = 9990,
                    ImageUrl = "/images/products/7.jpeg",
                    Brand = "Vans",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Vans old skool Mid",
                    Description ="Shoe Description to be added",
                    Price = 8990,
                    ImageUrl = "/images/products/8.jpeg",
                    Brand = "Vans",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Vans Leather",
                    Description ="Shoe Description to be added",
                    Price = 9599,
                    ImageUrl = "/images/products/9.jpeg",
                    Brand = "Vans",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas Yeezy Boost 350 V2",
                    Description ="Shoe Description to be added",
                    Price = 9899,
                    ImageUrl = "/images/products/10.jpeg",
                    Brand = "Adidas",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas Yeezy Boost 700",
                    Description ="Shoe Description to be added",
                    Price = 9599,
                    ImageUrl = "/images/products/11.jpeg",
                    Brand = "Adidas",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas Yeezy Slides Azure",
                    Description ="Shoe Description to be added",
                    Price = 9699,
                    ImageUrl = "/images/products/12.jpeg",
                    Brand = "Adidas",
                    Type = "Slides",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Adidas Yeezy Slides Onyx",
                    Description ="Shoe Description to be added",
                    Price = 9499,
                    ImageUrl = "/images/products/13.webp",
                    Brand = "Adidas",
                    Type = "Slides",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Puma Trainer",
                    Description ="Shoe Description to be added",
                    Price = 25990,
                    ImageUrl = "/images/products/14.jpeg",
                    Brand = "Puma",
                    Type = "Sport Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Puma Runner",
                    Description ="New Balance Canvas Trainer",
                    Price = 98999,
                    ImageUrl = "/images/products/15.jpeg",
                    Brand = "Puma",
                    Type = "Sport Shoes",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Puma Sneaker",
                    Description ="Shoe Description to be added",
                    Price = 99999,
                    ImageUrl = "//images/products/16.png",
                    Brand = "Puma",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Nike Jordan 1 Low",
                    Description = "Shoe Description to be added",
                    Price = 95990,
                    ImageUrl = "/images/products/17.jpeg",
                    Brand = "Nike",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Nike Jordan 1 High",
                    Description ="Shoe Description to be added",
                    Price = 98990,
                    ImageUrl = "/images/products/18.jpeg",
                    Brand = "Nike",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Converse Chuck Taylor 70",
                    Description ="Shoe Description to be added",
                    Price = 98990,
                    ImageUrl = "/images/products/19.jpeg",
                    Brand = "Converse",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Converse Chuck Taylor All Star",
                    Description ="Shoe Description to be added",
                    Price = 98990,
                    ImageUrl = "/images/products/20.jpeg",
                    Brand = "Converse",
                    Type = "Sneakers",
                    QuantityInStock = 999
                },
                new Product
                {
                    Name = "Converse Chuck Taylor Mid",
                    Description ="Shoe Description to be added",
                    Price = 98990,
                    ImageUrl = "/images/products/21.jpeg",
                    Brand = "Converse",
                    Type = "Sneakers",
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