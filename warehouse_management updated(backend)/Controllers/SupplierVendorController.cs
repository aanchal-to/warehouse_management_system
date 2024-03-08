using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using warehouse_management.Dtos;
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

       // [Authorize(Roles = "Admin,Supplier")]
        [HttpPost]
        public ActionResult<Supplier> PostSupplier(Supplier supplier)
        {
            var createdSupplier = _supplierService.CreateSupplier(supplier);
            return CreatedAtAction(nameof(GetSupplier), new { id = createdSupplier.supplierId }, createdSupplier);
        }


       // [Authorize(Roles = "Admin,Supplier")]
        [HttpPut("{supplierId}")]
        public IActionResult PutSupplier(string supplierId, Supplier supplier)
        {
            bool result = _supplierService.UpdateSupplier(supplierId, supplier);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }



      //  [Authorize(Roles = "Admin,Supplier")]
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


       

    }
}