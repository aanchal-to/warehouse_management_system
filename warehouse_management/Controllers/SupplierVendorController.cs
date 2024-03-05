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
    public class SupplierVendorController : ControllerBase
    {
        private readonly ISupplierVendorService _supplierService;

        public SupplierVendorController(ISupplierVendorService supplierService)
        {
            _supplierService = supplierService;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Supplier>> GetAllSupplier()
        {
            var inventories = _supplierService.GetAllSupplier();
            return Ok(inventories);
        }

        [HttpGet("{id}")]
        public ActionResult<Supplier> GetSupplier(string id)
        {
            var supplier = _supplierService.GetSupplierById(id);
            if (supplier == null)
            {
                return NotFound();
            }
            return supplier;
        }

        [Authorize(Roles = "Admin,Supplier")]
        [HttpPost]
        public ActionResult<Supplier> PostSupplier(Supplier supplier)
        {
            var createdSupplier = _supplierService.CreateSupplier(supplier);
            return CreatedAtAction(nameof(GetSupplier), new { id = createdSupplier.supplierId }, createdSupplier);
        }


        [Authorize(Roles = "Admin,Supplier")]
        [HttpPut("{id}")]
        public IActionResult PutSupplier(string id, Supplier supplier)
        {
            bool result = _supplierService.UpdateSupplier(id, supplier);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }



        [Authorize(Roles = "Admin,Supplier")]
        [HttpDelete("{id}")]
        public IActionResult DeleteSupplier(string id)
        {
            bool result = _supplierService.DeleteSupplier(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpGet("byItem/{itemName}/{quantity}")]
        public async Task<ActionResult<Supplier>> GetSupplierByItemAsync(string itemName, int quantity)
        {
            var supplier = await _supplierService.GetSupplierByItemAsync(itemName);
            if (supplier == null)
            {
                return NotFound();
            }

            // Assuming you have a method to update the supplier's status and quantity based on the purchase order
            var updatedSupplier = await _supplierService.UpdateSupplierStatusAndQuantityForPurchaseAsync(itemName, quantity);
            if (updatedSupplier == null)
            {
                return NotFound(); // Or another appropriate response
            }

            return updatedSupplier;
        }


        [HttpGet("supplier/{supplierId}")]
        public ActionResult<IEnumerable<Supplier>> GetOrdersBySupplierId(string supplierId)
        {
            var order = _supplierService.GetOrdersBySupplierId(supplierId);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }


        [HttpGet("matching/{itemName}/{quantity}")]
        public async Task<ActionResult<IEnumerable<Supplier>>> GetMatchingOrders(string itemName, int quantity)
        {
            var matchingSuppliers = await _supplierService.GetSuppliersByItemAndQuantityAsync(itemName, quantity);
            if (!matchingSuppliers.Any())
            {
                return NotFound();
            }
            return Ok(matchingSuppliers);
        }


    }
}