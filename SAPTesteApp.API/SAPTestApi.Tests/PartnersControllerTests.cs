using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAPTestApi.Data;
using SAPTestApi.Entities;

namespace SAPTestApi.Tests
{
    public class PartnersControllerTests
    {
        private SAPTestDbContext GetDbContext()
        {
            // Banco único por teste
            var options = new DbContextOptionsBuilder<SAPTestDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new SAPTestDbContext(options);

            // Populando com dados iniciais
            context.Partners.Add(new Partner { CardCode = "C001", CardName = "Cliente 1", CardType = 'C' });
            context.Partners.Add(new Partner { CardCode = "F001", CardName = "Fornecedor 1", CardType = 'F' });
            context.SaveChanges();

            return context;
        }

        [Fact]
        public async Task GetPartners_ReturnsAllPartners()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new PartnersController(context);

            // Act
            var result = await controller.GetPartners();

            // Assert
            var partners = Assert.IsAssignableFrom<IEnumerable<Partner>>(result.Value);
            Assert.Equal(2, partners.Count());
        }

        [Fact]
        public async Task PostPartner_AddsPartner()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new PartnersController(context);
            var newPartner = new Partner { CardCode = "C002", CardName = "Cliente 2", CardType = 'C' };

            // Act
            var result = await controller.PostPartner(newPartner);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var partner = Assert.IsType<Partner>(createdAtActionResult.Value);
            Assert.Equal("C002", partner.CardCode);
            Assert.Equal(3, await context.Partners.CountAsync());
        }

        [Fact]
        public async Task DeletePartner_RemovesPartner()
        {
            // Arrange
            var context = GetDbContext();
            var controller = new PartnersController(context);

            // Act
            var result = await controller.DeletePartner("C001");

            // Assert
            Assert.IsType<NoContentResult>(result);
            var remainingPartners = await context.Partners.ToListAsync();
            Assert.Single(remainingPartners);
            Assert.Equal("F001", remainingPartners[0].CardCode);
        }
    }
}
