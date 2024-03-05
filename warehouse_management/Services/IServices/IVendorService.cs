using MongoDB.Bson;
using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface IVendorService
    {
        Vendor GetVendorById(string id);

        Vendor CreateVendor(Vendor vendor);
        bool UpdateVendor(string id, Vendor supplierIn);
        bool DeleteVendor(string id);
        Task<Vendor> GetVendorByItemAsync(string itemName);
        Task<bool> UpdateVendorAsync(ObjectId id, Vendor vendor);
       // Task<bool> UpdateVendorStatusBasedOnPurchaseOrderAsync(string itemName);
    }
}
