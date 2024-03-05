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
    public class OrderDetailsController : ControllerBase
    {
        private readonly IOrderDetailsService _orderDetailsService;

        public OrderDetailsController(IOrderDetailsService orderDetailsService)
        {
            _orderDetailsService = orderDetailsService;
        }


        [Authorize(Roles = "Admin,Supplier")]
        [HttpGet]
        public ActionResult<IEnumerable<OrderDetails>> GetAllOrderDetails()
        {
            var orderDetails = _orderDetailsService.GetAllOrderDetails();
            return Ok(orderDetails);
        }


        [Authorize(Roles = "Admin,Supplier,Customer")]
        [HttpGet("{id}")]
        public ActionResult<OrderDetails> GetOrderDetails(string id)
        {
            var orderDetails = _orderDetailsService.GetOrderDetailsById(id);
            if (orderDetails == null)
            {
                return NotFound();
            }
            return Ok(orderDetails);
        }

        [Authorize(Roles = "Admin,Supplier")]
        [HttpPost]
        public ActionResult<OrderDetails> PostOrderDetails(OrderDetails orderDetails)
        {
            var createdOrderDetails = _orderDetailsService.CreateOrderDetails(orderDetails);
            return CreatedAtAction(nameof(GetOrderDetails), new { id = createdOrderDetails.orderId }, createdOrderDetails);
        }

        [Authorize(Roles = "Admin,Supplier")]
        [HttpPut("{orderId}")]
        public IActionResult PutOrderDetails(string orderId, OrderDetails orderDetails)
        {
            bool result = _orderDetailsService.UpdateOrderDetails(orderId, orderDetails);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [Authorize(Roles = "Admin,Supplier")]
        [HttpDelete("{id}")]
        public IActionResult DeleteOrderDetails(string id)
        {
            bool result = _orderDetailsService.DeleteOrderDetails(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
