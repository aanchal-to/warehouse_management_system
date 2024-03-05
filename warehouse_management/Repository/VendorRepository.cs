using MongoDB.Bson;
using MongoDB.Driver;
using System.Numerics;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{
    public class VendorRepository : IVendorRepository
    {
        private readonly IMongoCollection<Vendor> _vendor;
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;

        public VendorRepository(IPurchaseOrderRepository purchaseOrderRepository)
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            _vendor = database.GetCollection<Vendor>("Vendor");
            _purchaseOrderRepository = purchaseOrderRepository;
        }

        public Vendor GetVendorById(string id)
        {
            return _vendor.Find<Vendor>(vendor => vendor.vendorId == id).FirstOrDefault();
        }

        public Vendor CreateVendor(Vendor vendor)
        {
            _vendor.InsertOne(vendor);
            return vendor;
        }

        public bool UpdateVendor(string id, Vendor vendorIn)
        {
            var updatedVendor = new Vendor
            {
                vendorId = vendorIn.vendorId,
                name = vendorIn.name,
                contactPerson = vendorIn.contactPerson,
                item = vendorIn.item,
                quantity = vendorIn.quantity,
                status = vendorIn.status,
            };
            var filter = Builders<Vendor>.Filter.Eq("vendorId", id);
            var update = Builders<Vendor>.Update
                .Set("vendorId", updatedVendor.vendorId)
                .Set("name", updatedVendor.name)
                .Set("contactPerson", updatedVendor.contactPerson)
                .Set("item", updatedVendor.item)
                .Set("quantity", updatedVendor.quantity)
                .Set("status", updatedVendor.status);


            var result = _vendor.UpdateOne(filter, update);
            return result.ModifiedCount > 0;

        }

        public bool DeleteVendor(string id)
        {
            var result = _vendor.DeleteOne(vendor => vendor.vendorId == id);
            return result.DeletedCount > 0;
        }

        public async Task<Vendor> GetVendorByItemAsync(string itemName)
        {
            var filter = Builders<Vendor>.Filter.Eq("item", itemName);
            return await _vendor.FindAsync(filter).Result.FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateVendorAsync(ObjectId id, Vendor vendor)
        {
            var update = Builders<Vendor>.Update
                .Set("IsAvailable", vendor.status);
            var result = await _vendor.UpdateOneAsync(s => s.id == id, update);
            return result.ModifiedCount > 0;
        }

        /*public async Task<bool> UpdateVendorStatusBasedOnPurchaseOrderAsync(string itemName)
        {
            // Fetch the PurchaseOrder by item name
            var purchaseOrder = await _purchaseOrderRepository.GetPurchaseOrderByItemAsync(itemName);
            if (purchaseOrder == null)
            {
                // No matching PurchaseOrder found, return false or handle as needed
                return false;
            }

            // Assuming the PurchaseOrder has an 'item' property that matches the Vendor's 'item'
            var filter = Builders<Vendor>.Filter.Eq("item", purchaseOrder.item);
            var update = Builders<Vendor>.Update.Set("status", true);
            var result = await _vendor.UpdateManyAsync(filter, update);
            return result.ModifiedCount > 0;
        }*/


    }
}
