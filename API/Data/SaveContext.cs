using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SaveContext : DbContext
    {
        public SaveContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; } //represent the table for db
    }
}