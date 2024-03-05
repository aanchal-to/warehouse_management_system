using MongoDB.Bson.Serialization.Attributes;

namespace warehouse_management.Models
{
    public class OrderItem
    {

       
        public string productId { get; set; }
     
   
        public int quantity { get; set; }

        [BsonElement("pricePerItem")]
        public double pricePerItem { get; set; }
    }
}
