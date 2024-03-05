using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface IOrderRepository
    {
        IEnumerable<Order> GetAllOrders();
        Order GetOrderById(string id);
        IEnumerable<Order> GetOrderByCustomerId(string id);
        Order CreateOrder(Order order);
        bool UpdateOrder(string id, Order order);
        bool DeleteOrder(string id);

        Task<IEnumerable<Order>> GetOrderByItemAndQuantityAsync(string orderItems, int quantity);
    }
}
