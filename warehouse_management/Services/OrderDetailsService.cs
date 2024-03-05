using System.Collections.Generic;
using warehouse_management.Models;
using warehouse_management.Repository;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services.IServices;

namespace warehouse_management.Services
{
    public class OrderDetailsService : IOrderDetailsService
    {
        private readonly IOrderDetailsRepository _orderDetailsRepository;

        public OrderDetailsService(IOrderDetailsRepository orderDetailsRepository)
        {
            _orderDetailsRepository = orderDetailsRepository;
        }

        public IEnumerable<OrderDetails> GetAllOrderDetails()
        {
            return _orderDetailsRepository.GetAllOrderDetails();
        }

        public OrderDetails GetOrderDetailsById(string id)
        {
            return _orderDetailsRepository.GetOrderDetailsById(id);
        }

        public OrderDetails CreateOrderDetails(OrderDetails orderDetails)
        {
            return _orderDetailsRepository.CreateOrderDetails(orderDetails);
        }

        public bool UpdateOrderDetails(string id, OrderDetails orderDetailsIn)
        {
            return _orderDetailsRepository.UpdateOrderDetails(id, orderDetailsIn);
        }

        public bool DeleteOrderDetails(string id)
        {
            return _orderDetailsRepository.DeleteOrderDetails(id);
        }
    }
}
