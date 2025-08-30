using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAPTestApi.Data;
using SAPTestApi.Entities;

namespace SAPTestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly SAPTestDbContext _context;

        public ItemsController(SAPTestDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await _context.Items.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItems), new { id = item.ItemCode }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(string id, Item updatedItem)
        {
            if (id != updatedItem.ItemCode)
                return BadRequest("ItemCode não corresponde.");

            var item = await _context.Items.FindAsync(id);
            if (item == null)
                return NotFound();

            item.ItemName = updatedItem.ItemName;
            item.Quantity = updatedItem.Quantity;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(string id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
