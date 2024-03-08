using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using warehouse_management.Models;
using warehouse_management.Services;
using warehouse_management.Services.IServices;

namespace warehouse_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController:ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpGet("{id}")]
        public ActionResult<Vendor> GetVendor(string id)
        {
            var vendor = _vendorService.GetVendorById(id);
            if (vendor == null)
            {
                return NotFound();
            }
            return vendor;
        }

        [HttpPost]
        public ActionResult<Vendor> PostVendor(Vendor vendor)
        {
            var createdVendor = _vendorService.CreateVendor(vendor);
            return CreatedAtAction(nameof(GetVendor), new { id = createdVendor.vendorId }, createdVendor);
        }

        [HttpPut("{id}")]
        public IActionResult PutVendor(string id, Vendor vendor) // Corrected method name
        {
            bool result = _vendorService.UpdateVendor(id, vendor);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteVendor(string id)
        {
            bool result = _vendorService.DeleteVendor(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
/*
        [HttpPost("UpdateStatusForPurchase")]
        public IActionResult UpdateVendorStatusBasedOnPurchaseOrder(string itemName)
        {
            bool result = _vendorService.UpdateVendorStatusBasedOnPurchaseOrderAsync(itemName).Result;
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }*/

    }
}
