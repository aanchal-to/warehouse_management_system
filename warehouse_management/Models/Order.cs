using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace warehouse_management.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }
  
        public string orderId { get; set; }

        public string customerId { get; set; }   

        public string orderItems { get; set; }
        public int quantity { get; set; }
    }
}
