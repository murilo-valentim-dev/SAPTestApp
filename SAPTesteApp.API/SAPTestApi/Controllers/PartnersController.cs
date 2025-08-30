using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAPTestApi.Data;
using SAPTestApi.Entities;

[Route("api/[controller]")]
[ApiController]
public class PartnersController : ControllerBase
{
    private readonly SAPTestDbContext _context;

    public PartnersController(SAPTestDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Partner>>> GetPartners()
    {
        return await _context.Partners.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Partner>> PostPartner(Partner partner)
    {
        _context.Partners.Add(partner);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPartners), new { id = partner.CardCode }, partner);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePartner(string id, Partner updatedPartner)
    {
        if (id != updatedPartner.CardCode)
            return BadRequest("ItemCode não corresponde.");

        var partner = await _context.Partners.FindAsync(id);
        if (partner == null)
            return NotFound();

        partner.CardName = updatedPartner.CardName;
        partner.CardType = updatedPartner.CardType;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePartner(string id)
    {
        var partner = await _context.Partners.FindAsync(id);
        if (partner == null)
            return NotFound();

        _context.Partners.Remove(partner);
        await _context.SaveChangesAsync();
        return NoContent();
    }

}
