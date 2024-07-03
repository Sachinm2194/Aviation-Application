using System;
using System.Collections.Generic;

namespace Aviation_Application.Models;

public partial class InternationalAirline
{
    public int Id { get; set; }

    public string AirlineName { get; set; } = null!;

    public string FlightNumber { get; set; } = null!;

    public string? Details { get; set; }

    public virtual ICollection<InternationalAirlinesSchedule> InternationalAirlinesSchedules { get; set; } = new List<InternationalAirlinesSchedule>();
}
