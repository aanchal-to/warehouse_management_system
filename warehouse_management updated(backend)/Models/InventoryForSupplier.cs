namespace warehouse_management.Models
{
    public class InventoryForSupplier
    {
        public int InventoryId { get; set; }
        public int GoodId { get; set; }
        public int Quantity { get; set; }
        public string Location { get; set; }
        public DateTime LastUpdated { get; set; }
        public Good Good { get; set; }
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }
    }
}
