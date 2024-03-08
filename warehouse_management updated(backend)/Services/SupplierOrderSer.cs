using warehouse_management.Models;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services.IServices;

namespace warehouse_management.Services
{
    public class SupplierOrderSer:ISupplierOrderSer
    {
        private ISupplierOrderRepo supplierRepo;
        public SupplierOrderSer(ISupplierOrderRepo supplierRepo)
        {
            this.supplierRepo = supplierRepo;
        }

        public async Task<SupplierOrder> GetSupplierByIdAsync(int supplierId)
        {
            return await supplierRepo.GetSupplierByIdAsync(supplierId);
        }

        public async Task<IEnumerable<SupplierOrder>> GetAllSuppliersAsync()
        {
            return await supplierRepo.GetAllSuppliersAsync();
        }

        public async Task AddSupplierAsync(SupplierOrder supplier)
        {
            // Add any business logic here, e.g., validation
            await supplierRepo.AddSupplierAsync(supplier);
        }

        public async Task UpdateSupplierAsync(SupplierOrder supplier)
        {
            // Add any business logic here, e.g., validation
            await supplierRepo.UpdateSupplierAsync(supplier);
        }

        public async Task DeleteSupplierAsync(int supplierId)
        {
            // Add any business logic here, e.g., check if supplier has goods before deletion
            await supplierRepo.DeleteSupplierAsync(supplierId);
        }
    }
}
