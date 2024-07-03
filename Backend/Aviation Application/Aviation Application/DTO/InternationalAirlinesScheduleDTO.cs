namespace Aviation_Application.DTO
{
    public class InternationalAirlinesScheduleDTO
    {
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



    }
}
