using Microsoft.AspNetCore.Mvc;
using warehouse_management.Models;
using warehouse_management.Services.IServices;

namespace warehouse_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvSupController : ControllerBase
    {
        private IInvSupSer inventoryService;

        public InvSupController(IInvSupSer inventoryService)
        {
            this.inventoryService = inventoryService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryForSupplier>> GetInventoryById(int id)
        {
            var inventory = await inventoryService.GetInventoryByIdAsync(id);
            if (inventory == null)
            {
                return NotFound();
            }
            return inventory;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryForSupplier>>> GetAllInventories()
        {
            return Ok(await inventoryService.GetAllInventoriesAsync());
        }

        [HttpPost]
        public async Task<ActionResult<InventoryForSupplier>> AddInventory(InventoryForSupplier inventory)
        {
            await inventoryService.AddInventoryAsync(inventory);
            return CreatedAtAction(nameof(GetInventoryById), new { id = inventory.InventoryId }, inventory);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInventory(int id, InventoryForSupplier inventory)
        {
            if (id != inventory.InventoryId)
            {
                return BadRequest();
            }
            await inventoryService.UpdateInventoryAsync(inventory);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInventory(int id)
        {
            await inventoryService.DeleteInventoryAsync(id);
            return NoContent();
        }
    }

}
