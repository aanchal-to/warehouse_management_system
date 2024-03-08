using warehouse_management.Models;
using warehouse_management.Repository;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services.IServices;

namespace warehouse_management.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public IEnumerable<Order> GetAllOrders()
        {
            return _orderRepository.GetAllOrders();
        }

        public Order GetOrderById(string id)
        {
            return _orderRepository.GetOrderById(id);
        }


        public IEnumerable<Order> GetOrderByCustomerId(string id) { 
            return _orderRepository.GetOrderByCustomerId(id);
        
        }

            public Order CreateOrder(Order order)
            {
                return _orderRepository.CreateOrder(order);
            }

            public bool UpdateOrder(string id, Order orderIn)
            {
                return _orderRepository.UpdateOrder(id, orderIn);
            }

            public bool DeleteOrder(string id)
            {
                return _orderRepository.DeleteOrder(id);
            }

        public async Task<IEnumerable<Order>> GetMatchingOrders(string item, int quantity)
        {
            return await _orderRepository.GetOrdersByItemAndQuantity(item, quantity);
        }
    }
}
