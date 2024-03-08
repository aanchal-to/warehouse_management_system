using warehouse_management.Models;

namespace warehouse_management.Repository.IRepository
{
    public interface IGoodRepo
    {

        Task<Good> GetGoodByIdAsync(int goodId);
        Task<IEnumerable<Good>> GetAllGoodsAsync();
        Task AddGoodAsync(Good good);
        Task UpdateGoodAsync(Good good);
        Task DeleteGoodAsync(int goodId);
    }
}
