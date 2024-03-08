using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using warehouse_management.Dtos;
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

        public bool UpdateSupplier(string supplierId, Supplier supplierIn)
        {
            return _supplierRepository.UpdateSupplier(supplierId, supplierIn);
        }

        public bool DeleteSupplier(string id)
        {
            return _supplierRepository.DeleteSupplier(id);
        }


        public async Task<IEnumerable<Supplier>> GetMatchingSuppliers(string item, int quantity)
        {
            return await _supplierRepository.GetSuppliersByItemAndQuantity(item, quantity);
        }


      /*  public async Task AddOrderDetails(string supplierId, Order order)
        {
            await _supplierRepository.AddOrderDetails(supplierId, order);
        }*/



    }
}
