using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BilHallen.Entities
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Car> Cars { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> context) : base(context)
        {

        }
    }
}
