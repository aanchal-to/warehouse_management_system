using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;
using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface ISupplierVendorService
    {
        IEnumerable<Supplier> GetAllSupplier();
        Supplier GetSupplierById(string id);
        Supplier CreateSupplier(Supplier supplier);
        IEnumerable<Supplier> GetOrdersBySupplierId(string id);

        Task<IEnumerable<Supplier>> GetSuppliersByItemAndQuantityAsync(string itemName, int quantity);
        bool UpdateSupplier(string id, Supplier supplierIn);
        bool DeleteSupplier(string id);
        Task<Supplier> GetSupplierByItemAsync(string itemName);
        Task<bool> UpdateSupplierAsync(ObjectId id, Supplier supplier);
        Task<Supplier> UpdateSupplierStatusAndQuantityForPurchaseAsync(string itemName, int purchaseOrderQuantity);
    }
}
