using Aviation_Application.DTO;
using Aviation_Application.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aviation_Application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirlineBookingController : ControllerBase

    {
        private readonly AviationContext context;

        public AirlineBookingController(AviationContext context)
        {
            this.context = context;
        }

        [HttpGet("GetAllBookings")]
        public ActionResult GetAllBookings()
        {
            var allBookings = context.AirlineBookings.ToList();
            return Ok(allBookings);
        }

        [HttpPost("newBookings")]

        public ActionResult newBookings( AirlineBookingDTO airlineBookingDTO)
        {
           try{
                var newBooking = new AirlineBooking
                {
                    FlightId= airlineBookingDTO.FlightId,
                    FlightNumber = airlineBookingDTO.FlightNumber,
                    DepartureAirport = airlineBookingDTO.DepartureAirport,
                    DepartureAirportName= airlineBookingDTO.DepartureAirportName,
                    DepartureDate = airlineBookingDTO.DepartureDate,
                    DepartureTime = airlineBookingDTO.DepartureTime,
                    ArrivalAirport = airlineBookingDTO.ArrivalAirport,
                    ArrivalAirportName = airlineBookingDTO.ArrivalAirportName,
                    ArrivalDate = airlineBookingDTO.ArrivalDate,
                    ArrivalTime = airlineBookingDTO.ArrivalTime,
                    NumberOfTickets = airlineBookingDTO.NumberOfTickets,
                    TotalPrice = airlineBookingDTO.TotalPrice,
                    EmailId= airlineBookingDTO.EmailId,
                    BookingClass=airlineBookingDTO.BookingClass,
                };

                var flightId=context.InternationalAirlinesSchedules.Find(newBooking.FlightId);
                var availableSeats = flightId.AvailableSeats;
                if(availableSeats-newBooking.NumberOfTickets >= 0)
                {
                    context.AirlineBookings.Add(newBooking);
                    flightId.AvailableSeats= availableSeats - (int)newBooking.NumberOfTickets;
                    context.SaveChanges();
                    return Ok(newBooking);
                }
                else
                {
                    return BadRequest("Tickek Sold Out");
                }

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("EditAirlineBookings/{id}")]

        public ActionResult EditAirlineBookings(int id, AirlineBookingDTO airlineBookingDTO)
        {
            try
            {
                var bookingId = context.AirlineBookings.Find(id);
                if(bookingId == null)
                {
                    return BadRequest("Inavalid ID");
                }
                else
                {
                    bookingId.FlightId = airlineBookingDTO.FlightId;
                    bookingId.FlightNumber = airlineBookingDTO.FlightNumber;
                    bookingId.DepartureAirport = airlineBookingDTO.DepartureAirport;
                    bookingId.DepartureAirportName = airlineBookingDTO.DepartureAirportName;
                    bookingId.DepartureDate= airlineBookingDTO.DepartureDate;
                    bookingId.DepartureTime=airlineBookingDTO.DepartureTime;
                    bookingId.ArrivalAirport=airlineBookingDTO.ArrivalAirport;
                    bookingId.ArrivalAirportName = airlineBookingDTO.ArrivalAirportName;
                    bookingId.ArrivalDate= airlineBookingDTO.ArrivalDate;
                    bookingId.ArrivalTime= airlineBookingDTO.ArrivalTime;
                    bookingId.NumberOfTickets=airlineBookingDTO.NumberOfTickets;
                    bookingId.TotalPrice=airlineBookingDTO.TotalPrice;
                    bookingId.EmailId = airlineBookingDTO.EmailId;
                    bookingId.BookingClass=airlineBookingDTO.BookingClass;

                    var flightId = context.InternationalAirlinesSchedules.Find(bookingId.FlightId);
                    var availableSeats = flightId.AvailableSeats;
                    var previousSeats = context.AirlineBookings.Find(id).NumberOfTickets;
                    if(availableSeats - bookingId.NumberOfTickets >= 0){
                        if(previousSeats >= bookingId.NumberOfTickets)
                        {
                            var newSeats=previousSeats-bookingId.NumberOfTickets;
                            flightId.AvailableSeats= (int)(flightId.AvailableSeats+ newSeats);
                            context.SaveChanges();

                        }else if( previousSeats < bookingId.NumberOfTickets)
                        {
                            var newSeats=bookingId.NumberOfTickets-previousSeats;
                            flightId.AvailableSeats = (int)(flightId.AvailableSeats - newSeats);
                            context.SaveChanges();
                        }
                        else
                        {
                            return BadRequest(" Out of Stock " + availableSeats);
                        }
                    }

                    context.SaveChanges();
                    return Ok(bookingId);
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("CancleBooking/{id}")]
        public ActionResult CancelBooking(int id)
        {
            try
            {
                var bookingId = context.AirlineBookings.Find(id);
                if (bookingId == null)
                {
                    return BadRequest("Invalid ID.");
                }
                else
                {
                    //context.AirlineBookings.Remove(bookingId);
                    bookingId.IsCancelled = true;
                    context.SaveChanges();
                    return Ok(bookingId);
                }

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

    }
}
