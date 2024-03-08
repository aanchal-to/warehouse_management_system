using warehouse_management.Models;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services.IServices;

namespace warehouse_management.Services
{
    public class InvSupSer : IInvSupSer
    {
        private IInvSupRepo invSupRepo;

        public InvSupSer(IInvSupRepo invRepository)
        {
            this.invSupRepo = invSupRepo;
        }

        public async Task<InventoryForSupplier> GetInventoryByIdAsync(int inventoryId)
        {
            return await invSupRepo.GetInventoryByIdAsync(inventoryId);
        }

        public async Task<IEnumerable<InventoryForSupplier>> GetAllInventoriesAsync()
        {
            return await invSupRepo.GetAllInventoriesAsync();
        }

        public async Task AddInventoryAsync(InventoryForSupplier inventory)
        {
            // Add any business logic here, e.g., validation
            await invSupRepo.AddInventoryAsync(inventory);
        }

        public async Task UpdateInventoryAsync(InventoryForSupplier inventory)
        {
            // Add any business logic here, e.g., validation
            await invSupRepo.UpdateInventoryAsync(inventory);
        }

        public async Task DeleteInventoryAsync(int inventoryId)
        {
            // Add any business logic here, e.g., check if inventory record is valid before deletion
            await invSupRepo.DeleteInventoryAsync(inventoryId);
        }
    }
}
