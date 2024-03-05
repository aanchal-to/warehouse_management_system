using System.Collections.Generic;
using warehouse_management.Models;
using warehouse_management.Repository;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services.IServices;

namespace warehouse_management.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly IInventoryRepository _inventoryRepository;

        public InventoryService(IInventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }

        public IEnumerable<Inventory> GetAllInventories()
        {
            return _inventoryRepository.GetAllInventories();
        }

        public Inventory GetInventoryById(string id)
        {
            return _inventoryRepository.GetInventoryById(id);
        }

        public Inventory CreateInventory(Inventory inventory)
        {
            return _inventoryRepository.CreateInventory(inventory);
        }

        public bool UpdateInventory(string id, Inventory inventoryIn)
        {
            return _inventoryRepository.UpdateInventory(id, inventoryIn);
        }

        public bool DeleteInventory(string id)
        {
            return _inventoryRepository.DeleteInventory(id);
        }

        public IEnumerable<Inventory> SearchInventoryByAisle(string aisle)
        {
            // Corrected: Call the method directly on _inventoryRepository
            return _inventoryRepository.SearchInventoryByAisle(aisle);
        }

        public IEnumerable<Inventory> SearchInventoryByRack(string rack)
        {
            // Corrected: Call the method directly on _inventoryRepository
            return _inventoryRepository.SearchInventoryByRack(rack);
        }

        public IEnumerable<Inventory> SearchInventoryByShelf(string shelf)
        {
            // Corrected: Call the method directly on _inventoryRepository
            return _inventoryRepository.SearchInventoryByShelf(shelf);
        }
    }
}
