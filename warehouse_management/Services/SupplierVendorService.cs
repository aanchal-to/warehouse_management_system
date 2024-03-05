using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services.IServices;

namespace warehouse_management.Services
{
    public class SupplierVendorService : ISupplierVendorService
    {
        private readonly ISupplierVendorRepository _supplierRepository;

        public SupplierVendorService(ISupplierVendorRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public IEnumerable<Supplier> GetAllSupplier()
        {
            return _supplierRepository.GetAllSupplier();
        }

        public Supplier GetSupplierById(string id)
        {
            return _supplierRepository.GetSupplierById(id);
        }

        public IEnumerable<Supplier> GetOrdersBySupplierId(string id)
        {
            return _supplierRepository.GetOrdersBySupplierId(id);
        }


     

        public Supplier CreateSupplier(Supplier supplier)
        {
            return _supplierRepository.CreateSupplier(supplier);
        }

        public bool UpdateSupplier(string id, Supplier supplierIn)
        {
            return _supplierRepository.UpdateSupplier(id, supplierIn);
        }

        public bool DeleteSupplier(string id)
        {
            return _supplierRepository.DeleteSupplier(id);
        }


        public async Task<IEnumerable<Supplier>> GetSuppliersByItemAndQuantityAsync(string itemName, int quantity)
        {
            return await _supplierRepository.GetSuppliersByItemAndQuantityAsync(itemName, quantity);
        }


        public async Task<Supplier> GetSupplierByItemAsync(string itemName)
        {
            return await _supplierRepository.GetSupplierByItemAsync(itemName);
        }

        public async Task<bool> UpdateSupplierAsync(ObjectId id, Supplier supplier)
        {
            return await _supplierRepository.UpdateSupplierAsync(id, supplier);
        }

        public async Task<Supplier> UpdateSupplierStatusAndQuantityForPurchaseAsync(string itemName, int purchaseOrderQuantity)
        {
            return await _supplierRepository.UpdateSupplierStatusAndQuantityForPurchaseAsync(itemName, purchaseOrderQuantity);
        }
    }
}
