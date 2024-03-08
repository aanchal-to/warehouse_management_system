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


        [HttpGet]
        public ActionResult<IEnumerable<OrderDetails>> GetAllOrderDetails()
        {
            var orderDetails = _orderDetailsService.GetAllOrderDetails();
            return Ok(orderDetails);
        }

        [HttpGet("{orderId}")]
        public ActionResult<OrderDetails> GetOrderDetails(string orderId)
        {
            var orderDetails = _orderDetailsService.GetOrderDetailsById(orderId);
            if (orderDetails == null)
            {
                return NotFound();
            }
            return Ok(orderDetails);
        }

  
        [HttpPost]
        public ActionResult<OrderDetails> PostOrderDetails(OrderDetails orderDetails)
        {
            var createdOrderDetails = _orderDetailsService.CreateOrderDetails(orderDetails);
            return CreatedAtAction(nameof(GetOrderDetails), new { id = createdOrderDetails.orderId }, createdOrderDetails);
        }

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

        [HttpGet("customer/{customerId}")]
        public ActionResult<OrderDetails> GetDetailsByCustomerId(string customerId)
        {
            var orderDetails = _orderDetailsService.GetOrderDetailsByCustomerId(customerId);
            if (orderDetails == null)
            {
                return NotFound();
            }
            return Ok(orderDetails);
        }

        [HttpGet("customers/{customerId}")]
        public ActionResult<IEnumerable<OrderDetails>> GetOrdersByCustomerId(string customerId)
        {
            var order = _orderDetailsService.GetOrdersByCustomerId(customerId);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

    }
}
