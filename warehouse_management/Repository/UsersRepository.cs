using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using BCrypt.Net;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly IMongoCollection<Users> _users;

        public UsersRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            _users = database.GetCollection<Users>("Users");
        }

        public List<string> GetUsers()
        {
            throw new NotImplementedException();
        }

        public Users GetUsersById(string id)
        {
            var filter = Builders<Users>.Filter.Eq(u => u.UserID, id);
            return _users.Find(filter).FirstOrDefault();
        }

        public Users GetUserByUsername(string username)
        {
            var filter = Builders<Users>.Filter.Eq(u => u.UserName, username);
            return _users.Find(filter).FirstOrDefault();
        }

        /*       public Users GetUserByRoles(string roles)
               {
                   var filter = Builders<Users>.Filter.Eq(u => u.Roles, roles);
                   return _users.Find(filter).FirstOrDefault();
               }*/


        public Users GetUserByRoles(string role)
        {
            var filter = Builders<Users>.Filter.Eq(u => u.Roles, role);
            return _users.Find(filter).FirstOrDefault();
        }

        /*public void CreateUser(Users users)
        {
            _users.InsertOne(users);
        }*/

        public void CreateUser(Users users)
        {
            // Hash the password before saving it to the database
            users.PasswordHash = BCrypt.Net.BCrypt.HashPassword(users.PasswordHash);
            users.UserID = Guid.NewGuid().ToString();
            _users.InsertOne(users);
        }
    }
}
