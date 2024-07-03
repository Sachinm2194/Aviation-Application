using Aviation_Application.DTO;
using Aviation_Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Aviation_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternationalAirlinesScheduleController : ControllerBase
    {
        private readonly AviationContext context;

        public InternationalAirlinesScheduleController(AviationContext context)
        {
            this.context=context;
        }
        [HttpGet("GetAllAirlineSchedules")]
        public ActionResult GetAllAirlineSchedules()
        {
            try{
                var allAirlineSchedules = context.InternationalAirlinesSchedules.ToList();
                return Ok(allAirlineSchedules); 
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("AddAirlineSchedule")]
        public ActionResult AddAirlineSchedule(InternationalAirlinesScheduleDTO scheduleDTO)
        {
            try
            {
                var newrAirlineSchedule = new InternationalAirlinesSchedule
                {
                    FlightNumber = scheduleDTO.FlightNumber,
                    DepartureAirport = scheduleDTO.DepartureAirport,
                    DepartureDate = scheduleDTO.DepartureDate,
                    DepartureTime = scheduleDTO.DepartureTime,
                    ArrivalAirport = scheduleDTO.ArrivalAirport,
                    ArrivalDate = scheduleDTO.ArrivalDate,
                    ArrivalTime = scheduleDTO.ArrivalTime,
                    AvailableSeats= scheduleDTO.AvailableSeats,
                    PricePerKm= scheduleDTO.PricePerKm,
                };
                context.InternationalAirlinesSchedules.Add(newrAirlineSchedule);
                context.SaveChanges();
                return  Ok(newrAirlineSchedule);

            }
            catch (DbUpdateException ex)
            {
                return BadRequest(ex.InnerException?.Message ?? ex.Message);
            }
        }
        [HttpPut("UpdateAirlineSchedule/{id}")]
        public ActionResult UpdateAirlineSchedule(int id, InternationalAirlinesScheduleDTO scheduleDTO)
        {
            try
            {
                var existingSchedule = context.InternationalAirlinesSchedules.Find(id);
                if (existingSchedule == null)
                {
                    return NotFound();
                }

                existingSchedule.FlightNumber = scheduleDTO.FlightNumber;
                existingSchedule.DepartureAirport = scheduleDTO.DepartureAirport;
                existingSchedule.DepartureDate = scheduleDTO.DepartureDate;
                existingSchedule.DepartureTime = scheduleDTO.DepartureTime;
                existingSchedule.ArrivalAirport = scheduleDTO.ArrivalAirport;
                existingSchedule.ArrivalDate = scheduleDTO.ArrivalDate;
                existingSchedule.ArrivalTime = scheduleDTO.ArrivalTime;
                existingSchedule.AvailableSeats = scheduleDTO.AvailableSeats;
                existingSchedule.PricePerKm = scheduleDTO.PricePerKm;

                context.SaveChanges();
                return Ok(existingSchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteAirlineSchedule/{id}")]
        public ActionResult DeleteAirlineSchedule(int id)
        {
            try
            {
                var scheduleToDelete = context.InternationalAirlinesSchedules.Find(id);
                if (scheduleToDelete == null)
                {
                    return NotFound();
                }

                context.InternationalAirlinesSchedules.Remove(scheduleToDelete);
                context.SaveChanges();
                return Ok(scheduleToDelete);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        ////////////////////////////////////////////////////
        ///

        [HttpPut("CancelAirlineSchedule")]
        public  ActionResult SendCancellationNotifications(int flightId, InternationalAirlinesScheduleDTO internationalAirlinesScheduleDTO )
        {

            var schedule = context.InternationalAirlinesSchedules.SingleOrDefault(id => id.FlightId==flightId);

            schedule.IsCancelled = internationalAirlinesScheduleDTO.IsCancelled;
            return Ok(schedule);
        }

        

    }
}
