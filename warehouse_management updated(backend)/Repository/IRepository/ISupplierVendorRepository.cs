using MongoDB.Bson;
using warehouse_management.Dtos;
using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface ISupplierVendorRepository
    {

        IEnumerable<Supplier> GetAllSupplier();
        Supplier GetSupplierById(string id);
        Supplier CreateSupplier(Supplier supplier);
        bool UpdateSupplier(string supplierId, Supplier supplier);
        bool DeleteSupplier(string id);

        IEnumerable<Supplier> GetOrdersBySupplierId(string id);

        Task<IEnumerable<Supplier>> GetSuppliersByItemAndQuantity(string item, int quantity);
        




    }
}
