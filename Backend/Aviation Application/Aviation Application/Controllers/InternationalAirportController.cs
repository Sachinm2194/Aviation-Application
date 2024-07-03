using Aviation_Application.DTO;
using Aviation_Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aviation_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternationalAirportController : ControllerBase
    {
        private readonly AviationContext context;

        public InternationalAirportController(AviationContext context)
        {
            this.context = context;
        }

        [HttpGet("GetAllInternationalAirports")]
        public ActionResult GetAllInternationalAirports()
        {
            try
            {
                var allInternationalAirports = context.InternationalAirports.ToList();
                return Ok(allInternationalAirports);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("AddInternationalAirports")]
        public ActionResult AddInternationalAirports(InternationalAirportDTO internationalAirportDTO)
        {
            try
            {
                var newAirport = new InternationalAirport
                {
                    CountryCode = internationalAirportDTO.CountryCode,
                    Country = internationalAirportDTO.Country,
                    AirportName = internationalAirportDTO.AirportName,
                    AirportCode = internationalAirportDTO.AirportCode,
                    TimeZone = internationalAirportDTO.TimeZone,
                    Elevation = internationalAirportDTO.Elevation,
                    Iataregion = internationalAirportDTO.Iataregion,
                    Latitude = internationalAirportDTO.Latitude,
                    Longitude = internationalAirportDTO.Longitude,
                };

                context.InternationalAirports.Add(newAirport);
                context.SaveChanges();
                return Ok(newAirport);
            }
            catch (Exception ex)
            {
                string errorMessage = ex.Message;
                if (ex.InnerException != null)
                {
                    errorMessage += " Inner Exception: " + ex.InnerException.Message;
                }
                return BadRequest(errorMessage);

            }
        }
                [HttpPut("UpdateInternationalAirport/{airportCode}")]

        public ActionResult UpdateInternationalAirport(string airportCode, InternationalAirportDTO updatedAirportDTO)
        {
            try
            {
                var airportToUpdate = context.InternationalAirports.SingleOrDefault(a => a.AirportCode == airportCode);

                if (airportToUpdate == null)
                {
                    return NotFound();
                }

                airportToUpdate.CountryCode = updatedAirportDTO.CountryCode;
                airportToUpdate.Country = updatedAirportDTO.Country;
                airportToUpdate.AirportName = updatedAirportDTO.AirportName;
                airportToUpdate.TimeZone = updatedAirportDTO.TimeZone;
                airportToUpdate.Elevation = updatedAirportDTO.Elevation;
                airportToUpdate.Iataregion = updatedAirportDTO.Iataregion;
                airportToUpdate.Latitude= updatedAirportDTO.Latitude;
                airportToUpdate.Longitude= updatedAirportDTO.Longitude;

                context.SaveChanges();

                return Ok(airportToUpdate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("DeleteInternationalAirport/{airportCode}")]
        public ActionResult DeleteInternationalAirport(string airportCode)
        {
            try
            {
                var airportToDelete = context.InternationalAirports.SingleOrDefault(a => a.AirportCode == airportCode);

                if (airportToDelete == null)
                {
                    return NotFound();
                }

                context.InternationalAirports.Remove(airportToDelete);
                context.SaveChanges();

                return Ok(airportToDelete);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }




        }


    }
}
