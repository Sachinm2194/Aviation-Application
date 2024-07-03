using System;
using System.Collections.Generic;

namespace Aviation_Application.Models;

public partial class FullAirlinesSchedule
{
    public int FlightId { get; set; }

    public string FlightNumber { get; set; } = null!;

    public string? AirlineName { get; set; }

    public string DepartureAirport { get; set; } = null!;

    public string? DepartureCountry { get; set; }

    public string? DepartureAirportName { get; set; }

    public DateTime DepartureDate { get; set; }

    public string DepartureTime { get; set; } = null!;

    public string? ArrivalAirport { get; set; }

    public string? ArrivalCountry { get; set; }

    public string? ArrivalAirportName { get; set; }

    public DateTime ArrivalDate { get; set; }

    public string ArrivalTime { get; set; } = null!;

    public int AvailableSeats { get; set; }

    public double? Distance { get; set; }

    public double? Price { get; set; }
}
