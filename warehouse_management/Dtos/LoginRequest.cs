using System.ComponentModel.DataAnnotations;

namespace warehouse_management.Dtos
{
    public class LoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;

        //[Required]
        //public string Role {  get; set; } = string.Empty;
    }
}
