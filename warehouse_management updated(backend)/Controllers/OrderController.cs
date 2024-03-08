using Microsoft.AspNetCore.Mvc;
using warehouse_management.Models;
using warehouse_management.Services;
using warehouse_management.Services.IServices;


namespace warehouse_management.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class OrderController :ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Order>> GetAllOrders()
        {
            var orders = _orderService.GetAllOrders();
            return Ok(orders);
        }

        [HttpGet("{id}")]
        public ActionResult<Order> GetOrder(string id)
        {
            var order = _orderService.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }


        [HttpGet("customer/{customerId}")]
        public ActionResult<IEnumerable<Order>> GetOrderByCustomerId(string customerId)
        {
            var order = _orderService.GetOrderByCustomerId(customerId);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        public ActionResult<Order> PostOrder(Order order)
        {
            var createdOrder = _orderService.CreateOrder(order);
            return CreatedAtAction(nameof(GetOrder), new { id = createdOrder.orderId }, createdOrder);
        }

        [HttpPut("{id}")]
        public IActionResult PutOrder(string id, Order order)
        {
            bool result = _orderService.UpdateOrder(id, order);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(string id)
        {
            bool result = _orderService.DeleteOrder(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }


       

    }
}
