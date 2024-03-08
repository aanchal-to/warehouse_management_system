using MongoDB.Driver;
using System.Collections.Generic;
using warehouse_management.Models;
using warehouse_management.Repository;
using warehouse_management.Repository.IRepository;
using warehouse_management.Services.IServices;

namespace warehouse_management.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        public IEnumerable<Customer> GetAllCustomers()
        {
            return _customerRepository.GetAllCustomers();
        }

        public Customer GetCustomerById(string id)
        {
            return _customerRepository.GetCustomerById(id);
        }

        public Customer CreateCustomer(Customer customer)
        {
            return _customerRepository.CreateCustomer(customer);
        }

        public bool UpdateCustomer(string id, Customer customerIn)
        {
            return _customerRepository.UpdateCustomer(id, customerIn);
        }

        public bool DeleteCustomer(string id)
        {
            return _customerRepository.DeleteCustomer(id);
        }
    }
}
