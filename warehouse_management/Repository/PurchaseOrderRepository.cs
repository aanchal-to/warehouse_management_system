using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{
    public class PurchaseOrderRepository : IPurchaseOrderRepository
    {
        private readonly IMongoCollection<PurchaseOrder> _purchaseOrders;

        public PurchaseOrderRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            _purchaseOrders = database.GetCollection<PurchaseOrder>("PurchaseOrders");
        }

        public IEnumerable<PurchaseOrder> GetAllPurchaseOrders()
        {
            return _purchaseOrders.Find(purchaseOrder => true).ToList();
        }

        public PurchaseOrder GetPurchaseOrderById(string id)
        {
            return _purchaseOrders.Find<PurchaseOrder>(purchaseOrder => purchaseOrder.purchaseOrderId == id).FirstOrDefault();
        }

        public PurchaseOrder CreatePurchaseOrder(PurchaseOrder purchaseOrder)
        {
            purchaseOrder.purchaseOrderId = Guid.NewGuid().ToString();
            purchaseOrder.customerId = Guid.NewGuid().ToString();
            _purchaseOrders.InsertOne(purchaseOrder);
            return purchaseOrder;
        }

        public bool UpdatePurchaseOrder(string id, PurchaseOrder purchaseOrderIn)
        {
            var filter = Builders<PurchaseOrder>.Filter.Eq("purchaseOrderId", id);
            var update = Builders<PurchaseOrder>.Update
                .Set("item", purchaseOrderIn.item)
                .Set("quantity", purchaseOrderIn.quantity)
                 .Set("orderDate", purchaseOrderIn.orderDate);



            var result = _purchaseOrders.UpdateOne(filter, update);

            return result.ModifiedCount > 0;
        }

        public bool DeletePurchaseOrder(string id)
        {
            var result = _purchaseOrders.DeleteOne(purchaseOrder => purchaseOrder.purchaseOrderId == id);
            return result.DeletedCount > 0;
        }
    }
}
