using MongoDB.Bson;
using System.Numerics;
using warehouse_management.Models;
using warehouse_management.Repository;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services.IServices;

namespace warehouse_management.Services
{
    public class VendorService :IVendorService
    {

        private readonly IVendorRepository _vendorRepository;

        public VendorService(IVendorRepository vendorRepository)
        {
            _vendorRepository = vendorRepository;
        }

        public Vendor GetVendorById(string id)
        {
            return _vendorRepository.GetVendorById(id);
        }
        public Vendor CreateVendor(Vendor vendor)
        {
            return _vendorRepository.CreateVendor(vendor);
        }

        public bool UpdateVendor(string id, Vendor vendorIn)
        {
            return _vendorRepository.UpdateVendor(id, vendorIn);
        }

        public bool DeleteVendor(string id)
        {
            return (_vendorRepository.DeleteVendor(id));
        }

        public async Task<Vendor> GetVendorByItemAsync(string itemName)
        {
            return await _vendorRepository.GetVendorByItemAsync(itemName);
        }

        public async Task<bool> UpdateVendorAsync(ObjectId id, Vendor vendor)
        {
            return await _vendorRepository.UpdateVendorAsync(id, vendor);
        }

       /* public async Task<bool> UpdateVendorStatusBasedOnPurchaseOrderAsync(string itemName)
        {
            return await _vendorRepository.UpdateVendorStatusBasedOnPurchaseOrderAsync(itemName);
        }*/

    }
}
