namespace warehouse_management.Models
{
    public class SupplierOrder
    {
      
            public int SupplierId { get; set; }
            public string Name { get; set; }
            public List<Good> Inventory { get; set; } = new List<Good>();
        
    }
}
