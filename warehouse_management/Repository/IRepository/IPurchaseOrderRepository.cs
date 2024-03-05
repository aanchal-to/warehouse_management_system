using System.Collections.Generic;
using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface IPurchaseOrderRepository
    {
        IEnumerable<PurchaseOrder> GetAllPurchaseOrders();
        PurchaseOrder GetPurchaseOrderById(string id);
        PurchaseOrder CreatePurchaseOrder(PurchaseOrder purchaseOrder);
        bool UpdatePurchaseOrder(string id, PurchaseOrder purchaseOrder);
        bool DeletePurchaseOrder(string id);
    }
}
