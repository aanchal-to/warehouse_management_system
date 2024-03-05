﻿using MongoDB.Driver;
using warehouse_management.Configuration;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{

    public class OrderRepository : IOrderRepository
    {
        private readonly IMongoCollection<Order> _orders;
        public OrderRepository() {
            var client=new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            _orders = database.GetCollection<Order>("Orders");

        }

        public IEnumerable<Order> GetAllOrders()
        {
            return _orders.Find(inventory => true).ToList();
        }
        public Order GetOrderById(string id)
        {
            return _orders.Find<Order>(order => order.orderId == id).FirstOrDefault();
        }

        public IEnumerable<Order> GetOrderByCustomerId(string id)
        {
            Console.WriteLine($"Fetching orders for customer ID: {id}");
            var orders = _orders.Find(order => order.customerId == id).ToList();
            Console.WriteLine($"Found {orders.Count} orders for customer ID: {id}");
            return orders;
        }

        public Order CreateOrder(Order order)
        {
            order.orderId = Guid.NewGuid().ToString();
            _orders.InsertOne(order);
            return order;
        }

        public bool UpdateOrder(string id, Order orderIn)
        {
            var updatedOrder = new Order
            {
                orderId = orderIn.orderId,
                customerId = orderIn.customerId,
             
                orderItems = orderIn.orderItems,
                quantity = orderIn.quantity
            };

            var filter = Builders<Order>.Filter.Eq("orderId", id);
            var update = Builders<Order>.Update
   
                
                .Set("orderItems", updatedOrder.orderItems)
            .Set("quantity", updatedOrder.quantity);




    var result = _orders.UpdateOne(filter, update);

            return result.ModifiedCount > 0;

        }
        public bool DeleteOrder(string id)
        {
            var result = _orders.DeleteOne(order => order.orderId == id);
            return result.DeletedCount > 0;
        }


        public async Task<IEnumerable<Order>> GetOrderByItemAndQuantityAsync(string orderItems, int quantity)
        {
            var filter = Builders<Order>.Filter.And(
                Builders<Order>.Filter.Eq(c => c.orderItems, orderItems),
                Builders<Order>.Filter.Gte(c => c.quantity, quantity)
            );

            return await _orders.Find(filter).ToListAsync();
        }


    }
}
