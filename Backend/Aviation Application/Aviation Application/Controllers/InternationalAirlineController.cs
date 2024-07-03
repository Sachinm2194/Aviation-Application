using Aviation_Application.DTO;
using Aviation_Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aviation_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternationalAirlineController : ControllerBase
    {
        private readonly AviationContext context;

        public InternationalAirlineController(AviationContext context )
        {
            this.context = context;
        }

        [HttpGet("GetAllInternationalAirlines")]
        public ActionResult GetAllInternationalAirline()
        {
            try{
            var allInternationalAirline=context.InternationalAirlines.ToList();
                return Ok(allInternationalAirline);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("AddInternationalAirline")]
        public ActionResult AddInternationalAirline(InternationalAirlineDTO internationalAirlineDTO)
        {
            try
            {
                var newAirline=new InternationalAirline
                {
                    AirlineName=internationalAirlineDTO.AirlineName,
                    FlightNumber=internationalAirlineDTO.FlightNumber,
                    Details=internationalAirlineDTO.Details,
                };
                context.InternationalAirlines.Add(newAirline);
                context.SaveChanges();
                return Ok(newAirline);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("UpdateInternationalAirline/{flightNumber}")]
        public ActionResult UpdateInternationalAirline(string flightNumber, InternationalAirlineDTO updatedAirlineDTO)
        {
            try
            {
                var existingAirline = context.InternationalAirlines.SingleOrDefault(a => a.FlightNumber == flightNumber);

                if (existingAirline == null)
                {
                    return NotFound(); 
                }

                
                existingAirline.AirlineName = updatedAirlineDTO.AirlineName;
                existingAirline.FlightNumber= updatedAirlineDTO.FlightNumber;
                existingAirline.Details = updatedAirlineDTO.Details;

                context.SaveChanges();

                return Ok(existingAirline);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteInternationalAirline/{flightNumber}")]
        public ActionResult DeleteInternationalAirline(string flightNumber)
        {
            try
            {
                var airlineToDelete = context.InternationalAirlines.SingleOrDefault(a => a.FlightNumber == flightNumber);

                if (airlineToDelete == null)
                {
                    return NotFound(); 
                }

                context.InternationalAirlines.Remove(airlineToDelete);
                context.SaveChanges();

                return Ok(airlineToDelete);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
