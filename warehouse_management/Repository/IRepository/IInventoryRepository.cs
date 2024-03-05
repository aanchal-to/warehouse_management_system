using System.Collections.Generic;
using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface IInventoryRepository
    {
        IEnumerable<Inventory> GetAllInventories();
        Inventory GetInventoryById(string id);
        Inventory CreateInventory(Inventory inventory);
        bool UpdateInventory(string id, Inventory inventory);
        bool DeleteInventory(string id);
        IEnumerable<Inventory> SearchInventoryByAisle(string aisle);
        IEnumerable<Inventory> SearchInventoryByRack(string rack);
        IEnumerable<Inventory> SearchInventoryByShelf(string shelf);
    }
}
