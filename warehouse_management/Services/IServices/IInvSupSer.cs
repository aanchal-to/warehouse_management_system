using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface IInvSupSer
    {
        Task<InventoryForSupplier> GetInventoryByIdAsync(int inventoryId);
        Task<IEnumerable<InventoryForSupplier>> GetAllInventoriesAsync();
        Task AddInventoryAsync(InventoryForSupplier inventory);
        Task UpdateInventoryAsync(InventoryForSupplier inventory);
        Task DeleteInventoryAsync(int inventoryId);
    }
}
