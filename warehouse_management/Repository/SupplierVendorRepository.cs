using MongoDB.Bson;
using MongoDB.Driver;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{
    public class SupplierVendorRepository : ISupplierVendorRepository
    {
        private readonly IMongoCollection<Supplier> _supplier;
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;

        public SupplierVendorRepository(IPurchaseOrderRepository purchaseOrderRepository)
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            _supplier = database.GetCollection<Supplier>("Supplier");
            _purchaseOrderRepository = purchaseOrderRepository;
        }

        public IEnumerable<Supplier> GetAllSupplier()
        {
            return _supplier.Find(supplier => true).ToList();
        }


        public Supplier GetSupplierById(string id)
        {
            return _supplier.Find<Supplier>(supplier => supplier.supplierId == id).FirstOrDefault();
        }

        public IEnumerable<Supplier> GetOrdersBySupplierId(string id)
        {
           
            var orders = _supplier.Find(supplier => supplier.supplierId == id).ToList();
          
            return orders;
        }

        public Supplier CreateSupplier(Supplier supplier)
        {
           
            _supplier.InsertOne(supplier);
            return supplier;
        }
        public bool UpdateSupplier(string id, Supplier supplierIn)
        {
            var updatedSupplier = new Supplier
            {
                supplierId = supplierIn.supplierId,
                name = supplierIn.name,
                contactPerson = supplierIn.contactPerson,
                item = supplierIn.item,
                quantity = supplierIn.quantity,
             
            };
            var filter = Builders<Supplier>.Filter.Eq("supplierId", id);
            var update = Builders<Supplier>.Update
                .Set("supplierId", updatedSupplier.supplierId)
                .Set("name", updatedSupplier.name)
                .Set("contactPerson", updatedSupplier.contactPerson)
                .Set("item", updatedSupplier.item)
                .Set("quantity",updatedSupplier.quantity)
                .Set("status", updatedSupplier.status);
                

            var result = _supplier.UpdateOne(filter, update);
            return result.ModifiedCount > 0;

        }

        public bool DeleteSupplier(string id)
        {
            var result = _supplier.DeleteOne(supplier => supplier.supplierId == id);
            return result.DeletedCount > 0;
        }

        public async Task<IEnumerable<Supplier>> GetSuppliersByItemAndQuantityAsync(string itemName, int quantity)
        {
            var filter = Builders<Supplier>.Filter.And(
                Builders<Supplier>.Filter.Eq(s => s.item, itemName),
                Builders<Supplier>.Filter.Gte(s => s.quantity, quantity)
            );

            return await _supplier.Find(filter).ToListAsync();
        }



        public async Task<Supplier> GetSupplierByItemAsync(string itemName)
        {
            var filter = Builders<Supplier>.Filter.Eq("item", itemName);
            return await _supplier.FindAsync(filter).Result.FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateSupplierAsync(ObjectId id, Supplier supplier)
        {
            var update = Builders<Supplier>.Update
                .Set("status", supplier.status);
            var result = await _supplier.UpdateOneAsync(s => s.id == id, update);
            return result.ModifiedCount > 0;
        }


        public async Task<Supplier> UpdateSupplierStatusAndQuantityForPurchaseAsync(string itemName, int purchaseOrderQuantity)
        {
            var supplier = await _supplier.Find(s => s.item == itemName).FirstOrDefaultAsync();
            if (supplier == null)
            {
                return null; 
            }
            if (supplier.quantity >= purchaseOrderQuantity)
            {
                var update = Builders<Supplier>.Update
                    .Set(s => s.status, true) 
                    .Inc(s => s.quantity, -purchaseOrderQuantity);
                var updateResult = await _supplier.UpdateOneAsync(s => s.id == supplier.id, update);
                if (updateResult.ModifiedCount > 0)
                {
                    var updatedSupplier = await _supplier.Find(s => s.id == supplier.id).FirstOrDefaultAsync();
                    return updatedSupplier;
                }
            }
            else
            {
                var update = Builders<Supplier>.Update
                    .Set(s => s.status, false); 

                var updateResult = await _supplier.UpdateOneAsync(s => s.id == supplier.id, update);
                if (updateResult.ModifiedCount > 0)
                {
                    var updatedSupplier = await _supplier.Find(s => s.id == supplier.id).FirstOrDefaultAsync();
                    return updatedSupplier;
                }
            }

            return null;
        }



    }
}
