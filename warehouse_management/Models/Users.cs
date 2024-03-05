using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace warehouse_management.Models
{
    public class Users
    {

        [BsonId]
    
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public string Roles { get; set; }
    }
}
