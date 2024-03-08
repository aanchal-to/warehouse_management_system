using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{
    public class SupplierOrderRepo : ISupplierOrderRepo
    {
        private readonly IMongoCollection<SupplierOrder> suppliers;

        public SupplierOrderRepo()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            suppliers = database.GetCollection<SupplierOrder>("SupplierOrder");
        }

        public async Task<SupplierOrder> GetSupplierByIdAsync(int supplierId)
        {
            var filter = Builders<SupplierOrder>.Filter.Eq(s => s.SupplierId, supplierId);
            return await suppliers.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<SupplierOrder>> GetAllSuppliersAsync()
        {
            return await suppliers.Find(_ => true).ToListAsync();
        }

        public async Task AddSupplierAsync(SupplierOrder supplier)
        {
            await suppliers.InsertOneAsync(supplier);
        }

        public async Task UpdateSupplierAsync(SupplierOrder supplier)
        {
            var filter = Builders<SupplierOrder>.Filter.Eq(s => s.SupplierId, supplier.SupplierId);
            await suppliers.ReplaceOneAsync(filter, supplier);
        }

        public async Task DeleteSupplierAsync(int supplierId)
        {
            var filter = Builders<SupplierOrder>.Filter.Eq(s => s.SupplierId, supplierId);
            await suppliers.DeleteOneAsync(filter);
        }
    }
}
