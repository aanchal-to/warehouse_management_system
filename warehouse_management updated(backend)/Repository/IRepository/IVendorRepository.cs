using MongoDB.Bson;
using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface IVendorRepository
    {
        Vendor GetVendorById(string id);
        Vendor CreateVendor(Vendor vendor);
        bool UpdateVendor(string id, Vendor vendor);
        bool DeleteVendor(string id);
        Task<Vendor> GetVendorByItemAsync(string itemName); 
        Task<bool> UpdateVendorAsync(ObjectId id, Vendor vendor);
       // Task<bool> UpdateVendorStatusBasedOnPurchaseOrderAsync(string itemName);
    }
}
