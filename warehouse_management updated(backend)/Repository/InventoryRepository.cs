using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly IMongoCollection<Inventory> _inventories;

        public InventoryRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            _inventories = database.GetCollection<Inventory>("Inventory");
        }

        public IEnumerable<Inventory> GetAllInventories()
        {
            return _inventories.Find(inventory => true).ToList();
        }

        public Inventory GetInventoryById(string id)
        {
            return _inventories.Find<Inventory>(inventory => inventory.inventoryId == id).FirstOrDefault();
        }

        public Inventory CreateInventory(Inventory inventory)
        {

            inventory.inventoryId=Guid.NewGuid().ToString();
            _inventories.InsertOne(inventory);
            return inventory;
        }

        public bool UpdateInventory(string id, Inventory inventoryIn)
        {
            var filter = Builders<Inventory>.Filter.Eq("inventoryId", id);
            var update = Builders<Inventory>.Update
                .Set("item", inventoryIn.item)
                .Set("sku",inventoryIn.sku)
                .Set("quantity", inventoryIn.quantity)
                .Set("locationDetails", inventoryIn.locationDetails)
                .Set("batch",inventoryIn.batch);

            var result = _inventories.UpdateOne(filter, update);

            return result.ModifiedCount > 0;
        }

        public bool DeleteInventory(string id)
        {
            var result = _inventories.DeleteOne(inventory => inventory.inventoryId == id);
            return result.DeletedCount > 0;
        }

        public IEnumerable<Inventory> SearchInventoryByAisle(string aisle)
        {
            return _inventories.Find(inventory => inventory.locationDetails.aisle == aisle).ToList();
        }

        public IEnumerable<Inventory> SearchInventoryByRack(string rack)
        {
            return _inventories.Find(inventory => inventory.locationDetails.rack == rack).ToList();
        }

        public IEnumerable<Inventory> SearchInventoryByShelf(string shelf)
        {
            return _inventories.Find(inventory => inventory.locationDetails.shelf == shelf).ToList();
        }
    }
}
