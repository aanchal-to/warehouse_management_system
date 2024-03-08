namespace warehouse_management.Dtos
{
    public class RegisterResponse
    {
        public string Message { get; set; } = string.Empty;
        public bool Success { get; set; }
        public string Role { get; set; }
    }
}
