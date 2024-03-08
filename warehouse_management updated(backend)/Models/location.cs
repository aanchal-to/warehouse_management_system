using MongoDB.Bson.Serialization.Attributes;

namespace warehouse_management.Models
{
    public class Location
    {
        public string aisle { get; set; }
        public string shelf { get; set; }
        public string rack { get; set; }
    }
}
