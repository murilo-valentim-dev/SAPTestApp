using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAPTestApi.Controllers;
using SAPTestApi.Data;
using SAPTestApi.Entities;

namespace SAPTestApi.Tests
{
    public class ItemsControllerTests
    {
        private SAPTestDbContext GetDbContext()
        {
            // Banco em memória único por teste
            var options = new DbContextOptionsBuilder<SAPTestDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new SAPTestDbContext(options);

            // Populando dados iniciais
            context.Items.Add(new Item { ItemCode = "I001", ItemName = "Item 1", Quantity = 10 });
            context.Items.Add(new Item { ItemCode = "I002", ItemName = "Item 2", Quantity = 5 });
            context.SaveChanges();

            return context;
        }

        [Fact]
        public async Task GetItems_ReturnsAllItems()
        {
            var context = GetDbContext();
            var controller = new ItemsController(context);

            var result = await controller.GetItems();
            var items = Assert.IsAssignableFrom<IEnumerable<Item>>(result.Value);

            Assert.Equal(2, items.Count());
        }

        [Fact]
        public async Task PostItem_AddsItem()
        {
            var context = GetDbContext();
            var controller = new ItemsController(context);
            var newItem = new Item { ItemCode = "I003", ItemName = "Item 3", Quantity = 20 };

            var result = await controller.PostItem(newItem);

            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result.Result);
            var item = Assert.IsType<Item>(createdAtActionResult.Value);
            Assert.Equal("I003", item.ItemCode);
            Assert.Equal(3, await context.Items.CountAsync());
        }

        [Fact]
        public async Task UpdateItem_UpdatesExistingItem()
        {
            var context = GetDbContext();
            var controller = new ItemsController(context);

            var updatedItem = new Item { ItemCode = "I001", ItemName = "Item 1 Updated", Quantity = 15 };

            var result = await controller.UpdateItem("I001", updatedItem);

            Assert.IsType<NoContentResult>(result);

            var item = await context.Items.FindAsync("I001");
            Assert.Equal("Item 1 Updated", item.ItemName);
            Assert.Equal(15, item.Quantity);
        }

        [Fact]
        public async Task DeleteItem_RemovesItem()
        {
            var context = GetDbContext();
            var controller = new ItemsController(context);

            var result = await controller.DeleteItem("I001");

            Assert.IsType<NoContentResult>(result);

            var remainingItems = await context.Items.ToListAsync();
            Assert.Single(remainingItems);
            Assert.Equal("I002", remainingItems[0].ItemCode);
        }
    }
}
