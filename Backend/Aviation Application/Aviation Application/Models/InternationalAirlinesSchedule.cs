    using System;
using System.Collections.Generic;

namespace Aviation_Application.Models;

public partial class InternationalAirlinesSchedule
{
    public int FlightId { get; set; }

    public string FlightNumber { get; set; } = null!;

    public string DepartureAirport { get; set; } = null!;

    public DateTime DepartureDate { get; set; }

    public string DepartureTime { get; set; } = null!;

    public string? ArrivalAirport { get; set; }

    public DateTime ArrivalDate { get; set; }

    public string ArrivalTime { get; set; } = null!;

    public int AvailableSeats { get; set; }

    public double PricePerKm { get; set; }

    public bool? IsCancelled { get; set; }

    public virtual ICollection<AirlineBooking> AirlineBookings { get; set; } = new List<AirlineBooking>();

    public virtual InternationalAirline FlightNumberNavigation { get; set; } = null!;
}
