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
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderService _purchaseOrderService;

        public PurchaseOrderController(IPurchaseOrderService purchaseOrderService)
        {
            _purchaseOrderService = purchaseOrderService;
        }


       // [Authorize(Roles = "Admin,Supplier")]
        [HttpGet]
        public ActionResult<IEnumerable<PurchaseOrder>> GetAllPurchaseOrders()
        {
            var purchaseOrders = _purchaseOrderService.GetAllPurchaseOrders();
            return Ok(purchaseOrders);
        }


      //  [Authorize(Roles = "Admin,Supplier,Customer")]
        [HttpGet("{id}")]
        public ActionResult<PurchaseOrder> GetPurchaseOrder(string id)
        {
            var purchaseOrder = _purchaseOrderService.GetPurchaseOrderById(id);
            if (purchaseOrder == null)
            {
                return NotFound();
            }
            return Ok(purchaseOrder);
        }


     //   [Authorize(Roles = "Admin,Customer")]
        [HttpPost]
        public ActionResult<PurchaseOrder> PostPurchaseOrder(PurchaseOrder purchaseOrder)
        {
            var createdPurchaseOrder = _purchaseOrderService.CreatePurchaseOrder(purchaseOrder);
            return CreatedAtAction(nameof(GetPurchaseOrder), new { id = createdPurchaseOrder.purchaseOrderId }, createdPurchaseOrder);
        }

      //  [Authorize(Roles = "Admin,Customer")]

       [HttpPut("{id}")]
        public IActionResult PutPurchaseOrder(string id, PurchaseOrder purchaseOrder)
        {
            bool result = _purchaseOrderService.UpdatePurchaseOrder(id, purchaseOrder);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }


    //    [Authorize(Roles = "Admin,Customer")]

       [HttpDelete("{id}")]
        public IActionResult DeletePurchaseOrder(string id)
        {
            bool result = _purchaseOrderService.DeletePurchaseOrder(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
