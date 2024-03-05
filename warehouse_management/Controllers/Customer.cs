using Microsoft.AspNetCore.Mvc;
using warehouse_management.Models;
using warehouse_management.Services;
using warehouse_management.Services.IServices;

namespace warehouse_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Customer>> GetAllCustomers()
        {
            var customers = _customerService.GetAllCustomers();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public ActionResult<Customer> GetCustomer(string id)
        {
            var customer = _customerService.GetCustomerById(id);
            if (customer == null)
            {
                return NotFound();
            }
            return Ok(customer);
        }

        [HttpPost]
        public ActionResult<Customer> PostCustomer(Customer customer)
        {
            var createdCustomer = _customerService.CreateCustomer(customer);
            return CreatedAtAction(nameof(GetCustomer), new { id = createdCustomer.customerId }, createdCustomer);
        }

        [HttpPut("{id}")]
        public IActionResult PutCustomer(string id, Customer customer)
        {
            bool result = _customerService.UpdateCustomer(id, customer);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCustomer(string id)
        {
            bool result = _customerService.DeleteCustomer(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
