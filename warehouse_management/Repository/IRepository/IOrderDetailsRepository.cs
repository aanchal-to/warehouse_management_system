using System.Collections.Generic;
using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface IOrderDetailsRepository
    {
        IEnumerable<OrderDetails> GetAllOrderDetails();
        OrderDetails GetOrderDetailsById(string id);
        OrderDetails CreateOrderDetails(OrderDetails orderDetails);
        bool UpdateOrderDetails(string id, OrderDetails orderDetails);
        bool DeleteOrderDetails(string id);
    }
}
