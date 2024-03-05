using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface ICustomerService
    {
        IEnumerable<Customer> GetAllCustomers();
        Customer GetCustomerById(string id);
        Customer CreateCustomer(Customer customer);
        bool UpdateCustomer(string id, Customer customerIn);
        bool DeleteCustomer(string id);
    }
}
