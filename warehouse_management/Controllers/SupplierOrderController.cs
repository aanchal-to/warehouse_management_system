using Microsoft.AspNetCore.Mvc;
using warehouse_management.Models;
using warehouse_management.Services.IServices;

namespace warehouse_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplierOrderController : ControllerBase
    {
        private ISupplierOrderSer supplierService;

        public SupplierOrderController(ISupplierOrderSer supplierService)
        {
            this.supplierService = supplierService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupplierOrder>> GetSupplierById(int id)
        {
            var supplier = await supplierService.GetSupplierByIdAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }
            return supplier;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierOrder>>> GetAllSuppliers()
        {
            return Ok(await supplierService.GetAllSuppliersAsync());
        }

        [HttpPost]
        public async Task<ActionResult<SupplierOrder>> AddSupplier(SupplierOrder supplier)
        {
            await supplierService.AddSupplierAsync(supplier);
            return CreatedAtAction(nameof(GetSupplierById), new { id = supplier.SupplierId }, supplier);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSupplier(int id, SupplierOrder supplier)
        {
            if (id != supplier.SupplierId)
            {
                return BadRequest();
            }
            await supplierService.UpdateSupplierAsync(supplier);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            await supplierService.DeleteSupplierAsync(id);
            return NoContent();
        }
    }

}
