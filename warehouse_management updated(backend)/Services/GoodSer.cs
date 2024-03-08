using warehouse_management.Models;
using warehouse_management.Services.IServices;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Services
{
    public class GoodSer:IGoodSer
    {
        private IGoodRepo goodRepository;

        public GoodSer(IGoodRepo goodRepository)
        {
            this.goodRepository = goodRepository;
        }

        public async Task<Good> GetGoodByIdAsync(int goodId)
        {
            return await goodRepository.GetGoodByIdAsync(goodId);
        }

        public async Task<IEnumerable<Good>> GetAllGoodsAsync()
        {
            return await goodRepository.GetAllGoodsAsync();
        }

        public async Task AddGoodAsync(Good good)
        {
            // Add any business logic here, e.g., validation
            await goodRepository.AddGoodAsync(good);
        }

        public async Task UpdateGoodAsync(Good good)
        {
            // Add any business logic here, e.g., validation
            await goodRepository.UpdateGoodAsync(good);
        }

        public async Task DeleteGoodAsync(int goodId)
        {
            // Add any business logic here, e.g., check if good is in inventory before deletion
            await goodRepository.DeleteGoodAsync(goodId);
        }
    }
}
