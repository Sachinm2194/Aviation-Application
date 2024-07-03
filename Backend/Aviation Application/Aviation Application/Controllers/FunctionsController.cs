using Aviation_Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace Aviation_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FunctionsController : ControllerBase
    {
        private readonly AviationContext context;

        public FunctionsController(AviationContext context)
        {
            this.context = context;
        }


        //[HttpGet("CalculateAirportsDistance")]
        //public ActionResult<decimal> CalculateAirportsDistance(decimal lat1, decimal lon1, decimal lat2, decimal lon2)
        //{
        //    try
        //    {
        //        var distance = context.CalculateAirportsDistance(lat1, lon1, lat2, lon2);
        //        return Ok(distance);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Error occurred: {ex.Message}. Inner exception: {ex.InnerException?.Message}");
        //    }
        //}
        //[HttpGet("CalculateJourneyPrice")]
        //public ActionResult<decimal> CalculateJourneyPrice(decimal distance, decimal pricePerKm)
        //{
        //    try
        //    {
        //        var price = context.CalculateJourneyPrice(distance, pricePerKm);
        //        return Ok(price);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Error occurred: {ex.Message}. Inner exception: {ex.InnerException?.Message}");
        //    }
        //}
    }
}
