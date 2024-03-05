using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface ICustomerRepository
    {
        IEnumerable<Customer> GetAllCustomers();
        Customer GetCustomerById(string id);
        Customer CreateCustomer(Customer customer);

        bool UpdateCustomer(string id,Customer customer);
        bool DeleteCustomer(string id);
    }
}
