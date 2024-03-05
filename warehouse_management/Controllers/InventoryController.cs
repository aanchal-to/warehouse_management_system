using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using warehouse_management.Models;
using warehouse_management.Services;
using warehouse_management.Services.IServices;

namespace warehouse_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }



        [Authorize(Roles = "Admin,Inventory")]
        [HttpGet]
        public ActionResult<IEnumerable<Inventory>> GetAllInventories()
        {
            var inventories = _inventoryService.GetAllInventories();
            return Ok(inventories);
        }


        [Authorize(Roles = "Admin,Inventory")]
        [HttpGet("{id}")]
        public ActionResult<Inventory> GetInventory(string id)
        {
            var inventory = _inventoryService.GetInventoryById(id);
            if (inventory == null)
            {
                return NotFound();
            }
            return Ok(inventory);
        }



      //  [Authorize(Roles = "Admin,Inventory")]
        [HttpPost]
        public ActionResult<Inventory> PostInventory(Inventory inventory)
        {
            var createdInventory = _inventoryService.CreateInventory(inventory);
            return CreatedAtAction(nameof(GetInventory), new { id = createdInventory.inventoryId }, createdInventory);
        }


        [Authorize(Roles = "Admin,Inventory")]
        [HttpPut("{id}")]
        public IActionResult PutInventory(string id, Inventory inventory)
        {
            bool result = _inventoryService.UpdateInventory(id, inventory);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [Authorize(Roles = "Admin,Inventory")]
        [HttpDelete("{id}")]
        public IActionResult DeleteInventory(string id)
        {
            bool result = _inventoryService.DeleteInventory(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }


      //  [Authorize(Roles = "Admin,Inventory")]
        [HttpGet("aisle/{aisle}")]
        public ActionResult<IEnumerable<Inventory>> SearchInventoryByAisle(string aisle)
        {
            var inventories = _inventoryService.SearchInventoryByAisle(aisle);
            if (inventories == null || !inventories.Any())
            {
                return NotFound();
            }
            return Ok(inventories);
        }

       // [Authorize(Roles = "Admin,Inventory")]
        [HttpGet("rack/{rack}")]
        public ActionResult<IEnumerable<Inventory>> SearchInventoryByRack(string rack)
        {
            var inventories = _inventoryService.SearchInventoryByRack(rack);
            if (inventories == null || !inventories.Any())
            {
                return NotFound();
            }
            return Ok(inventories);
        }

        ///[Authorize(Roles = "Admin,Inventory")]
        [HttpGet("shelf/{shelf}")]
        public ActionResult<IEnumerable<Inventory>> SearchInventoryByShelf(string shelf)
        {
            var inventories = _inventoryService.SearchInventoryByShelf(shelf);
            if (inventories == null || !inventories.Any())
            {
                return NotFound();
            }
            return Ok(inventories);
        }
    }
}

