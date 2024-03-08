using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface IInvSupRepo
    {
        Task<InventoryForSupplier> GetInventoryByIdAsync(int inventoryId);
        Task<IEnumerable<InventoryForSupplier>> GetAllInventoriesAsync();
        Task AddInventoryAsync(InventoryForSupplier inventory);
        Task UpdateInventoryAsync(InventoryForSupplier inventory);
        Task DeleteInventoryAsync(int inventoryId);
    }
}
