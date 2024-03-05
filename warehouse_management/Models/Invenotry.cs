using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace warehouse_management.Models
{
    public class Inventory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        public string inventoryId { get; set; }
        public string item { get; set; }
        public string sku { get; set; }
        public int quantity { get; set; }
        public Location locationDetails { get; set; }
        public int batch { get; set; }
    }
}
