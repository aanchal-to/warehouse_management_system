using MongoDB.Driver;
using MongoDbGenericRepository.Attributes;
using AspNetCore.Identity.MongoDbCore.Models;

namespace warehouse_management.Models
{

    [CollectionName("users")]
    public class ApplicationUser : MongoIdentityUser<Guid>
    {
        public string FullName { get; set; }=string.Empty;
    }
}
