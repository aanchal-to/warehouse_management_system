using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace warehouse_management.Models
{
    public class OrderDetails
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
      
        public string orderId { get; set; }
        public string customerId { get; set; }
        public string supplierId { get; set; }
        public string inventoryId { get; set; }
        public string item {  get; set; }
        public int quantity { get; set; }

        public string status { get; set; }
    }
}
