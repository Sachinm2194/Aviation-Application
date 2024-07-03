using System;
using System.Collections.Generic;

namespace Aviation_Application.Models;

public partial class AirlineBooking
{
    public int BookingId { get; set; }

    public int FlightId { get; set; }

    public string FlightNumber { get; set; } = null!;

    public string DepartureAirport { get; set; } = null!;

    public string DepartureAirportName { get; set; } = null!;

    public DateTime DepartureDate { get; set; }

    public string DepartureTime { get; set; } = null!;

    public string? ArrivalAirport { get; set; }

    public string? ArrivalAirportName { get; set; }

    public DateTime ArrivalDate { get; set; }

    public string ArrivalTime { get; set; } = null!;

    public int? NumberOfTickets { get; set; }

    public decimal? TotalPrice { get; set; }

    public string? EmailId { get; set; }

    public string? BookingClass { get; set; }

    public bool? IsCancelled { get; set; }

    public virtual InternationalAirlinesSchedule Flight { get; set; } = null!;
}
