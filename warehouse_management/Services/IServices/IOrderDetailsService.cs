using System.Collections.Generic;
using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface IOrderDetailsService
    {
        IEnumerable<OrderDetails> GetAllOrderDetails();
        OrderDetails GetOrderDetailsById(string id);
        OrderDetails CreateOrderDetails(OrderDetails orderDetails);
        bool UpdateOrderDetails(string id, OrderDetails orderDetailsIn);
        bool DeleteOrderDetails(string id);
    }
}
