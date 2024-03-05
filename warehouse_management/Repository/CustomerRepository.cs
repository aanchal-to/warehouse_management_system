using MongoDB.Driver;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly IMongoCollection<Customer> _customers;

        public CustomerRepository()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            _customers = database.GetCollection<Customer>("Customer");
        }

        public IEnumerable<Customer> GetAllCustomers()
        {
            return _customers.Find(customer => true).ToList();
        }

        public Customer GetCustomerById(string id)
        {
            return _customers.Find<Customer>(customer => customer.customerId == id).FirstOrDefault();
        }

        public Customer CreateCustomer(Customer customer)
        {
            _customers.InsertOne(customer);
            return customer;
        }

        public bool UpdateCustomer(string id, Customer customerIn)
        {
            var updatedCustomer = new Customer
            {
                customerId = customerIn.customerId,
                name = customerIn.name,
                email = customerIn.email,
              
            };

            var filter = Builders<Customer>.Filter.Eq("customerId", id);
            var update = Builders<Customer>.Update
                .Set("customerId", updatedCustomer.customerId)
                .Set("name", updatedCustomer.name)
                .Set("email", updatedCustomer.email);
   

            var result = _customers.UpdateOne(filter, update);
            return result.ModifiedCount > 0;
        }

        public bool DeleteCustomer(string id)
        {
            var result = _customers.DeleteOne(customer => customer.customerId == id);
            return result.DeletedCount > 0;
        }

        

    }
}
