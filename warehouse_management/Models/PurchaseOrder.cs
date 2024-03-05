using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace warehouse_management.Models
{
    public class PurchaseOrder
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId id { get; set; }
        public string customerId { get; set; }
        public string purchaseOrderId { get; set; }
        public string item { get; set; }
        public int quantity { get; set; }
        public DateTime orderDate { get; set; }
    }
}
