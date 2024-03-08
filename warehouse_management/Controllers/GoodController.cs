using Microsoft.AspNetCore.Mvc;
using warehouse_management.Models;
using warehouse_management.Services.IServices;

namespace warehouse_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoodController : ControllerBase
    {
        private IGoodSer goodService;

        public GoodController(IGoodSer goodService)
        {
            this.goodService = goodService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Good>> GetGoodById(int id)
        {
            var good = await goodService.GetGoodByIdAsync(id);
            if (good == null)
            {
                return NotFound();
            }
            return good;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Good>>> GetAllGoods()
        {
            return Ok(await goodService.GetAllGoodsAsync());
        }

        [HttpPost]
        public async Task<ActionResult<Good>> AddGood(Good good)
        {
            await goodService.AddGoodAsync(good);
            return CreatedAtAction(nameof(GetGoodById), new { id = good.GoodId }, good);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGood(int id, Good good)
        {
            if (id != good.GoodId)
            {
                return BadRequest();
            }
            await goodService.UpdateGoodAsync(good);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGood(int id)
        {
            await goodService.DeleteGoodAsync(id);
            return NoContent();
        }
    }

}
