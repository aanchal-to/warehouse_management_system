using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface ISupplierOrderSer
    {
        Task<SupplierOrder> GetSupplierByIdAsync(int supplierId);
        Task<IEnumerable<SupplierOrder>> GetAllSuppliersAsync();
        Task AddSupplierAsync(SupplierOrder supplier);
        Task UpdateSupplierAsync(SupplierOrder supplier);
        Task DeleteSupplierAsync(int supplierId);

    }
}
