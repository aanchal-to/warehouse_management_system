using MongoDB.Bson;
using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface ISupplierVendorRepository
    {

        IEnumerable<Supplier> GetAllSupplier();
        Supplier GetSupplierById(string id);
        Supplier CreateSupplier(Supplier supplier);
        bool UpdateSupplier(string id, Supplier supplier);
        bool DeleteSupplier(string id);

        IEnumerable<Supplier> GetOrdersBySupplierId(string id);

        Task<IEnumerable<Supplier>> GetSuppliersByItemAndQuantityAsync(string itemName, int quantity);
        Task<Supplier> GetSupplierByItemAsync(string itemName);
        Task<bool> UpdateSupplierAsync(ObjectId id, Supplier supplier);

        Task<Supplier> UpdateSupplierStatusAndQuantityForPurchaseAsync(string itemName, int purchaseOrderQuantity);

    }
}
