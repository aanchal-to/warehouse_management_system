using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface IOrderService
    {
        IEnumerable<Order> GetAllOrders();
        Order GetOrderById(string id);
        IEnumerable<Order> GetOrderByCustomerId(string id);
        Order CreateOrder(Order order);
        bool UpdateOrder(string id, Order orderIn);
        bool DeleteOrder(string id);
        Task<IEnumerable<Order>> GetMatchingOrders(string item, int quantity);



    }
}
