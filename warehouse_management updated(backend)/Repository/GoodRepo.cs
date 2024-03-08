using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using warehouse_management.Models;
using warehouse_management.Repository.IRepository;

namespace warehouse_management.Repository
{
    public class GoodRepo : IGoodRepo
    {
        private readonly IMongoCollection<Good> goods;

        public GoodRepo()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            var database = client.GetDatabase("warehouse_management_system");
            goods = database.GetCollection<Good>("Good");
        }

        public async Task<Good> GetGoodByIdAsync(int goodId)
        {
            var filter = Builders<Good>.Filter.Eq(g => g.GoodId, goodId);
            return await goods.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Good>> GetAllGoodsAsync()
        {
            return await goods.Find(_ => true).ToListAsync();
        }

        public async Task AddGoodAsync(Good good)
        {
            await goods.InsertOneAsync(good);
        }

        public async Task UpdateGoodAsync(Good good)
        {
            var filter = Builders<Good>.Filter.Eq(g => g.GoodId, good.GoodId);
            await goods.ReplaceOneAsync(filter, good);
        }

        public async Task DeleteGoodAsync(int goodId)
        {
            var filter = Builders<Good>.Filter.Eq(g => g.GoodId, goodId);
            await goods.DeleteOneAsync(filter);
        }
    }
}
