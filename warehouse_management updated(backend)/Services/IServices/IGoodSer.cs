using warehouse_management.Models;

namespace warehouse_management.Services.IServices
{
    public interface IGoodSer
    {
        Task<Good> GetGoodByIdAsync(int goodId);
        Task<IEnumerable<Good>> GetAllGoodsAsync();
        Task AddGoodAsync(Good good);
        Task UpdateGoodAsync(Good good);
        Task DeleteGoodAsync(int goodId);
    }
}
