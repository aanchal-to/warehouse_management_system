using Microsoft.AspNetCore.Mvc;
using warehouse_management.Services.IServices;

namespace warehouse_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SameOrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ISupplierVendorService _supplierService;

        public SameOrderController(IOrderService orderService, ISupplierVendorService supplierService)
        {
            _orderService = orderService;
            _supplierService = supplierService;
        }

        [HttpGet("orders/{item}/{quantity}")]
        public async Task<IActionResult> GetMatchingOrders(string item, int quantity)
        {
            var orders = await _orderService.GetMatchingOrders(item, quantity);
            return Ok(orders);
        }

        [HttpGet("suppliers/{item}/{quantity}")]
        public async Task<IActionResult> GetMatchingSuppliers(string item, int quantity)
        {
            var suppliers = await _supplierService.GetMatchingSuppliers(item, quantity);
            return Ok(suppliers);
        }

    }
}
