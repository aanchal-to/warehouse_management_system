using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;
using warehouse_management.Dtos;
using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface ISupplierVendorService
    {
        IEnumerable<Supplier> GetAllSupplier();
        Supplier GetSupplierById(string id);
        Supplier CreateSupplier(Supplier supplier);
        IEnumerable<Supplier> GetOrdersBySupplierId(string id);

        bool UpdateSupplier(string supplierId, Supplier supplierIn);
        bool DeleteSupplier(string id);

        Task<IEnumerable<Supplier>> GetMatchingSuppliers(string item, int quantity);
       // Task AddOrderDetails(string supplierId, Order order);


    }
}
