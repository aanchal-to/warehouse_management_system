using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{
    public class InvSupRepo : IInvSupRepo
    {
        private readonly IMongoCollection<InventoryForSupplier> ivs;

        public InvSupRepo()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            ivs = database.GetCollection<InventoryForSupplier>("InventoryForSupplier");
        }

        public async Task<InventoryForSupplier> GetInventoryByIdAsync(int inventoryId)
        {
            var filter = Builders<InventoryForSupplier>.Filter.Eq(i => i.InventoryId, inventoryId);
            return await ivs.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<InventoryForSupplier>> GetAllInventoriesAsync()
        {
            return await ivs.Find(_ => true).ToListAsync();
        }

        public async Task AddInventoryAsync(InventoryForSupplier inventory)
        {
            await ivs.InsertOneAsync(inventory);
        }

        public async Task UpdateInventoryAsync(InventoryForSupplier inventory)
        {
            var filter = Builders<InventoryForSupplier>.Filter.Eq(i => i.InventoryId, inventory.InventoryId);
            await ivs.ReplaceOneAsync(filter, inventory);
        }

        public async Task DeleteInventoryAsync(int inventoryId)
        {
            var filter = Builders<InventoryForSupplier>.Filter.Eq(i => i.InventoryId, inventoryId);
            await ivs.DeleteOneAsync(filter);
        }
    }
}
