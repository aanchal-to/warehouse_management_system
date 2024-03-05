using System.Collections.Generic;
using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface IPurchaseOrderService
    {
        IEnumerable<PurchaseOrder> GetAllPurchaseOrders();
        PurchaseOrder GetPurchaseOrderById(string id);
        PurchaseOrder CreatePurchaseOrder(PurchaseOrder purchaseOrder);
        bool UpdatePurchaseOrder(string id, PurchaseOrder purchaseOrderIn);
        bool DeletePurchaseOrder(string id);
    }
}
