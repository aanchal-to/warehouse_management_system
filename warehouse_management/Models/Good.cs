namespace warehouse_management.Models
{
    public class Good
    {
        public int GoodId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public List<InventoryForSupplier> InventoryForSupplier { get; set; } = new List<InventoryForSupplier>();
    }
}
