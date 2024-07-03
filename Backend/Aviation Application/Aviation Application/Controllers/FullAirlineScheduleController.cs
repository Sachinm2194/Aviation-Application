using Aviation_Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aviation_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FullAirlineScheduleController : ControllerBase
    {
        private readonly AviationContext context;

        public FullAirlineScheduleController(AviationContext context)
        {
            this.context=context;
        }

        [HttpGet("GetAllAirlineSchedule")]
        public ActionResult GetAllAirlineSchedule()
        {
            try
            {
                var allAirlineSchedule=context.FullAirlinesSchedules.ToList();
                return Ok(allAirlineSchedule);
            }
            catch (Exception ex)
            {
                   return BadRequest(ex.Message);
            }
        }
    }
}
