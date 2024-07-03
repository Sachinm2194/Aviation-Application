namespace Aviation_Application.DTO
{
    public class InternationalAirportDTO
    {
        public string CountryCode { get; set; } = null!;

        public string Country { get; set; } = null!;

        public string AirportName { get; set; } = null!;

        public string AirportCode { get; set; } = null!;

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }

        public string? TimeZone { get; set; }

        public int? Elevation { get; set; }

        public string? Iataregion { get; set; }
    }
}
