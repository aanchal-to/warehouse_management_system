using System.Collections.Generic;
using warehouse_management.Models;
using warehouse_management.Repository;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services.IServices;

namespace warehouse_management.Services
{
    public class PurchaseOrderService : IPurchaseOrderService
    {
        private readonly IPurchaseOrderRepository _purchaseOrderRepository;

        public PurchaseOrderService(IPurchaseOrderRepository purchaseOrderRepository)
        {
            _purchaseOrderRepository = purchaseOrderRepository;
        }

        public IEnumerable<PurchaseOrder> GetAllPurchaseOrders()
        {
            return _purchaseOrderRepository.GetAllPurchaseOrders();
        }

        public PurchaseOrder GetPurchaseOrderById(string id)
        {
            return _purchaseOrderRepository.GetPurchaseOrderById(id);
        }

        public PurchaseOrder CreatePurchaseOrder(PurchaseOrder purchaseOrder)
        {
            return _purchaseOrderRepository.CreatePurchaseOrder(purchaseOrder);
        }

        public bool UpdatePurchaseOrder(string id, PurchaseOrder purchaseOrderIn)
        {
            return _purchaseOrderRepository.UpdatePurchaseOrder(id, purchaseOrderIn);
        }

        public bool DeletePurchaseOrder(string id)
        {
            return _purchaseOrderRepository.DeletePurchaseOrder(id);
        }
    }
}
