using Microsoft.EntityFrameworkCore;
using SAPTestApi.Entities;

namespace SAPTestApi.Data
{
    public class SAPTestDbContext : DbContext
    {
        public SAPTestDbContext(DbContextOptions<SAPTestDbContext> options) : base(options)
        {
        }

       public DbSet<Partner> Partners { get; set; }
       public DbSet<Item> Items { get; set; }
    }
}
