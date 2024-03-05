using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{
    public class OrderDetailsRepository : IOrderDetailsRepository
    {
        private readonly IMongoCollection<OrderDetails> _orderDetails;

        public OrderDetailsRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            _orderDetails = database.GetCollection<OrderDetails>("OrderDetails");
        }

        public IEnumerable<OrderDetails> GetAllOrderDetails()
        {
            return _orderDetails.Find(orderDetail => true).ToList();
        }

        public OrderDetails GetOrderDetailsById(string id)
        {
            return _orderDetails.Find<OrderDetails>(orderDetail => orderDetail.orderId == id).FirstOrDefault();
        }

        public OrderDetails CreateOrderDetails(OrderDetails orderDetails)
        {
            _orderDetails.InsertOne(orderDetails);
            return orderDetails;
        }

        public bool UpdateOrderDetails(string id, OrderDetails orderDetailsIn)
        {
            var filter = Builders<OrderDetails>.Filter.Eq("orderId", id);
            var update = Builders<OrderDetails>.Update
                .Set("orderId", orderDetailsIn.orderId)
                .Set("customerId", orderDetailsIn.customerId)
                .Set("supplierId", orderDetailsIn.supplierId)
                .Set("item", orderDetailsIn.item)
                .Set("quantity", orderDetailsIn.quantity) // Using the correct field name as per the model
                .Set("status", orderDetailsIn.status);

            var result = _orderDetails.UpdateOne(filter, update);

            return result.ModifiedCount > 0;
        }

        public bool DeleteOrderDetails(string id)
        {
            var result = _orderDetails.DeleteOne(orderDetail => orderDetail.orderId == id);
            return result.DeletedCount > 0;
        }
    }
}
